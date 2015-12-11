var Promise = require('bluebird'),
    Puid    = require('puid'),
    moment  = require('moment');

module.exports = function(sequelize, DataTypes) {

    var tableName = "users";

    var attributes = {
        id: DataTypes.INTEGER,
        v_username: DataTypes.STRING,
        v_password: DataTypes.STRING,
        v_email: DataTypes.STRING,
        v_first_name: DataTypes.STRING,
        v_last_name: DataTypes.STRING,
        v_api_key: DataTypes.STRING,
        i_add_date: DataTypes.INTEGER
    };

    var instanceMethods = {
        fullName: function () {
            return this.v_first_name + " " + this.v_last_name;
        },
        fullNameAlphaFormat: function () {
            return this.v_last_name + ", " + this.v_first_name;
        },
        changePassword: function( password){
            this.v_password = password;
            return this.save();
        },
        saveResetPasswordEmail: function(render){
            var _this = this;
            var UserRequestSignatures = global.db.UserRequestSignatures;
            var EmailNotifications = global.db.EmailNotifications;

            return new Promise.bind(this)
                .then( function(){

                    var puid = new Puid(true);
                    var newSignature = puid.generate();

                    var newSignature = {
                            fk_user_id: _this.id,
                            v_request: "PasswordReset",
                            v_signature: newSignature,
                            i_created: moment().unix(),
                            i_expiry: moment().add(3, 'days').unix()
                        };

                    return UserRequestSignatures.findOrCreate( { where: [ " fk_user_id = ? AND v_request LIKE ? AND i_expiry > ? AND i_completed is null ", _this.id, "PasswordReset", moment().unix() ], defaults: newSignature })
                        .then( function( signatureRow, created){

                            signatureRow = Array.isArray(signatureRow) ? signatureRow[0] : signatureRow;

                            if(newSignature != signatureRow.v_signature){
                                signatureRow.i_expiry = moment().add(3, 'days').unix();
                            }

                            return signatureRow.save();

                        });
                })
                .then( function( signature){
                    return new Promise( function( resolve, reject){
                        render( "email-templates/password/forgot-password", { signature: signature.v_signature, baseUrl:global.config.baseUrl, layout:"email-templates/password/layout"}, function( err, html){
                            var newEmail = {
                                v_to: _this.v_email,
                                v_from: "farid@fb.com",
                                v_subject: "Password Reset",
                                t_body: html,
                                i_create: moment().unix()
                            };

                            resolve(  EmailNotifications.create(newEmail) );
                        });
                    });
                })
                .catch( function(err){
                    return null;
                });
        }
    };

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
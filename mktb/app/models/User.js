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
            var signature = null;
            return new Promise.bind(this)
                .then( function(){
                    UserRequestSignatures = global.db.UserRequestSignatures;
                    
                    var puid = new Puid(true);
                    signature = puid.generate();

                    var newSignature = {
                            fk_user_id: _this.id,
                            v_request: "PasswordReset",
                            v_signature: signature,
                            i_created: moment().unix(),
                            i_expiry: moment().add(3, 'days').unix()
                        };

                    return UserRequestSignatures.findOrCreate( { where: [ " fk_user_id = ? AND v_request LIKE ? AND i_expiry > ? AND i_completed is null ", _this.id, "PasswordReset", moment().unix() ], defaults: newSignature })
                        .then( function( signatureRow, created){

                            console.log("created::::", created);
                            console.log("signature:::", signature);
                            console.log("signatureRow.v_signature:::", signatureRow.v_signature );
                            //console.log("signatureRow:::", signatureRow);

                            if(signature == signatureRow.v_signature){
                                console.log("new signature");
                            }else{
                                console.log("existing signature");
                            }
                            
                            return signatureRow;
                        });
                })
                .then( function( signature){
                    console.log("signature::::",signature.v_signature);
                    return true;
                })
                .catch( function(err){
                    return null;
                });
        }
    };

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
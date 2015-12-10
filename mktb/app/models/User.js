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
                .then( function(user){
                    UserRequestSignatures = global.db.UserRequestSignatures;
                    console.log("user::::", moment().unix());
                    return UserRequestSignatures.find() //{ where: [ "fk_user_id = ? AND v_request LIKE ? AND i_expiry > ? ", user.id, "PasswordReset", moment().unix()  ] })
                            .then( function( existingSignature){
                                if(existingSignature){
                                    console.log("found signature:::");
                                    return existingSignature.v_signature;
                                }else{
                                    console.log("can not found signature:::");
                                    var puid = new Puid(true);
                                    signature = puid.generate();
                                    return ;
                                }
                            });
                })
                .then( function( signature){
                    console.log("signature::::",signature);
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
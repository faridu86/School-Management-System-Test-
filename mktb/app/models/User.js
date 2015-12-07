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
        }
    };

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
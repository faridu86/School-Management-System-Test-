module.exports = function(sequelize, DataTypes) {

    var tableName = "user_logins";

    var attributes = {
        id: DataTypes.INTEGER,
        fk_user_id: DataTypes.INTEGER,
        v_ip: DataTypes.STRING,
        i_date: DataTypes.INTEGER,
        v_device: DataTypes.STRING,
        v_api_key: DataTypes.STRING
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
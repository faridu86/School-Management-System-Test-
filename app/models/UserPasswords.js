module.exports = function(sequelize, DataTypes) {

    var tableName = "user_passwords";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_user_id: {type: DataTypes.INTEGER, allowNull: false},
        v_password: {type: DataTypes.STRING, allowNull: false},
        fk_updated_by: {type: DataTypes.INTEGER, allowNull: false},
        i_date: {type: DataTypes.INTEGER, allowNull: false},
        v_ip: {type: DataTypes.STRING, allowNull: true},
        v_device: {type: DataTypes.STRING, allowNull: true}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
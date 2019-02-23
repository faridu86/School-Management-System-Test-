module.exports = function(sequelize, DataTypes) {

    var tableName = "permissions";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        v_permission: {type: DataTypes.STRING, allowNull: false}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
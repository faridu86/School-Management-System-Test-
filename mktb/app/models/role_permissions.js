module.exports = function(sequelize, DataTypes) {

    var tableName = "role_permissions";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_role_id: {type: DataTypes.INTEGER, allowNull: false},
        fk_permission_id: {type: DataTypes.INTEGER, allowNull: false}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
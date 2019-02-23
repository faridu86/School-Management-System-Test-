module.exports = function(sequelize, DataTypes) {

    var tableName = "roles";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        v_role: {type: DataTypes.INTEGER, allowNull: false},
        b_employee: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: 0},
        created_at: {type: DataTypes.INTEGER, allowNull: false},
        updated_at: {type: DataTypes.INTEGER, allowNull: false}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
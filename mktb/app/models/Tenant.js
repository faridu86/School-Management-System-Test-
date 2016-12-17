module.exports = function(sequelize, DataTypes) {

    var tableName = "tenants";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_user_id: {type: DataTypes.INTEGER, allowNull: false},
        v_name: {type: DataTypes.STRING, allowNull: false},
        v_address: {type: DataTypes.STRING, allowNull: false},
        v_city: {type: DataTypes.STRING, allowNull: false},
        v_state: {type: DataTypes.STRING, allowNull: false},
        b_active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
        b_deleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        created_at: {type: DataTypes.INTEGER, allowNull: false},
        updated_at: {type: DataTypes.INTEGER, allowNull: false}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
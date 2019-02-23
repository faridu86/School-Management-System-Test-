module.exports = function(sequelize, DataTypes) {

    var tableName = "institutions";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_tenant_id: {type: DataTypes.INTEGER, allowNull: false},
        v_name: {type: DataTypes.STRING, allowNull: false},
        v_city: {type: DataTypes.STRING, allowNull: true},
        v_state: {type: DataTypes.STRING, allowNull: true},
        v_address: {type: DataTypes.STRING, allowNull: true},
        v_phone: {type: DataTypes.STRING, allowNull: true},
        b_active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
        b_deleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
        fk_created_by: {type: DataTypes.INTEGER, allowNull: false},
        fk_updated_by: {type: DataTypes.INTEGER, allowNull: false},
        created_at: {type: DataTypes.INTEGER, allowNull: true},
        updated_at: {type: DataTypes.INTEGER, allowNull: true}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
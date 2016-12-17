module.exports = function(sequelize, DataTypes) {

    var tableName = "institutions";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        v_name: {type: DataTypes.STRING, allowNull: false},
        v_city: {type: DataTypes.STRING, allowNull: true},
        v_state: {type: DataTypes.STRING, allowNull: true},
        v_address: {type: DataTypes.STRING, allowNull: true},
        v_phone: {type: DataTypes.STRING, allowNull: true},
        fk_tenant_id: {type: DataTypes.INTEGER, allowNull: false},
        created_at: {type: DataTypes.INTEGER, allowNull: true},
        updated_at: {type: DataTypes.INTEGER, allowNull: true}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
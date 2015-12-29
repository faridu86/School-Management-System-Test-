module.exports = function(sequelize, DataTypes) {

    var tableName = "admins";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_user_id: {type: DataTypes.INTEGER, allowNull: false},
        v_phone: {type: DataTypes.STRING, allowNull: true},
        v_mobile: {type: DataTypes.STRING, allowNull: true},
        v_address: {type: DataTypes.STRING, allowNull: true},
        v_description: {type: DataTypes.STRING, allowNull: true}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
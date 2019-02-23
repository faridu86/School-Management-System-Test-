module.exports = function(sequelize, DataTypes) {

    var tableName = "user_requests_signatures";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_user_id: DataTypes.INTEGER,
        v_request: DataTypes.STRING,
        v_signature: DataTypes.STRING,
        i_created: DataTypes.INTEGER,
        i_expiry: {type: DataTypes.INTEGER, allowNull: true},
        i_completed: {type: DataTypes.INTEGER, allowNull: true}
    };

    var instanceMethods = {};

    var classMethods = {};

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
module.exports = function(sequelize, DataTypes) {

    var tableName = "batch_semesters";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_batch_id: {type: DataTypes.INTEGER, allowNull: false},
        fk_semester_id: {type: DataTypes.INTEGER, allowNull: false},
        started_at: {type: DataTypes.INTEGER, allowNull: true},
        ended_at: {type: DataTypes.INTEGER, allowNull: true},
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
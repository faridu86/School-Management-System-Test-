module.exports = function(sequelize, DataTypes) {

    var tableName = "`semester_default_subjects";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_semester_id: {type: DataTypes.INTEGER, allowNull: false},
        fk_subject_id: {type: DataTypes.INTEGER, allowNull: false},
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
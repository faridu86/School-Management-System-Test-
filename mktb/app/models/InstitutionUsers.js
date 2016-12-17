module.exports = function(sequelize, DataTypes) {

    var tableName = "institution_users";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_user_id: {type: DataTypes.INTEGER, allowNull: false},
        fk_role_id: {type: DataTypes.INTEGER, allowNull: false},
        fk_institution_id: {type: DataTypes.INTEGER, allowNull: false},
        b_enabled: {type: DataTypes.BOOLEAN, allowNull: false},
        created_at: {type: DataTypes.INTEGER, allowNull: false},
        updated_at: {type: DataTypes.INTEGER, allowNull: false}
    };

    var instanceMethods = {};

    var classMethods = {
        getUserInstitutions: function( user){
            return this.findAll({ 
                where: { fk_user_id: user.id, b_enabled: true},
                include: [
                    { model: global.db.Institutions},
                    { model: global.db.Roles}
                ]
            });
        }
    };

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
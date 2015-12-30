module.exports = function(sequelize, DataTypes) {

    var tableName = "user_institutions";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_user_id: {type: DataTypes.INTEGER, allowNull: false},
        fk_role_id: {type: DataTypes.INTEGER, allowNull: false},
        fk_institution_id: {type: DataTypes.INTEGER, allowNull: false},
        i_enabled: {type: DataTypes.INTEGER, allowNull: false},
        i_created: {type: DataTypes.INTEGER, allowNull: false},
        i_updated: {type: DataTypes.INTEGER, allowNull: false}
    };

    var instanceMethods = {};

    var classMethods = {
        getUserInstitutions: function( user){
            return this.findAll({ 
                            where: { fk_user_id: user.id, i_enabled: 1},
                            include: [
                                { model: global.db.Institutions},
                                { model: global.db.Roles}
                            ]
                        });
        }
    };

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
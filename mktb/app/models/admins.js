module.exports = function(sequelize, DataTypes) {

    var tableName = "admins";

    var attributes = {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        fk_user_id: {type: DataTypes.INTEGER, allowNull: false},
        created_at: {type: DataTypes.INTEGER, allowNull: false},
        updated_at: {type: DataTypes.INTEGER, allowNull: false}
    };

    var instanceMethods = {};

    var classMethods = {
        isAdmin: function( user){
            return this.find({
                where: { fk_user_id: user.id}
            }).then( function(admin) {
                if(!!admin && !!admin.id) {
                    return true;
                }else {
                    throw new Error("You are not an Admin user.")
                }
            })
        }
    };

    return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
};
module.exports = function(sequelize, DataTypes) {

  var tableName = "tenants";

  var attributes = {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fk_user_id: DataTypes.INTEGER,
    v_name: {type: DataTypes.STRING, allowNull: false},
    v_address: {type: DataTypes.STRING, allowNull: false},
    v_city: {type: DataTypes.STRING, allowNull: false},
    v_state: {type: DataTypes.STRING, allowNull: false},
    b_active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
    b_deleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    fk_created_by: {type: DataTypes.INTEGER, allowNull: false},
    fk_updated_by: {type: DataTypes.INTEGER, allowNull: false},
    created_at: {type: DataTypes.INTEGER, allowNull: false},
    updated_at: {type: DataTypes.INTEGER, allowNull: false}
  };

  var instanceMethods = {};

  var classMethods = {
    getTenants: function() {
      return this.findAll({
        include: [
          { model: global.db.User }
        ]
      })
    },
    getTenant: function( user){
      return this.find({
        where: { fk_user_id: user.id}
      }).then( function(tenant) {
        if(!!tenant && !!tenant.id) {
          if( tenant.b_deleted){
            throw("Your account has been deleted, please contact site Admin.")
          }else if(!tenant.b_active){
            throw("Your account has been deactivated, please contact site Admin.")
          }else{
            return tenant;
          };
        } else {
          throw("You are not a tenant user.")
        }
      })
    }
  };

  return sequelize.define(tableName, attributes, {instanceMethods: instanceMethods, classMethods: classMethods});
}; 
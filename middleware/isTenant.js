module.exports = function( req, res, next){
  global.db.Tenant.getTenant( req.user).then( function(tenant){
    if( !!tenant && !!tenant.id) {
      req.tenant = tenant;
      next();
    }else {
      res.status(401).json({"message": "You are not a Tenant."});
    }
  }).catch( function(error){
    res.status(401).json({"message": error})
  })
};
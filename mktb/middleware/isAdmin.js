module.exports = function( req, res, next){
  global.db.Admin.isAdmin( req.user).then( function(isAdmin){
    if( isAdmin) {
      next();
    }else {
      res.status(401).send({"message": "You are not an Admin."});
    }
  })
};
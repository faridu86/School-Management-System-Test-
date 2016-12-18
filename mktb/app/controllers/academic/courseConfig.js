

exports.batches = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "batches"});
        }
    });
};

exports.addBatch = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "Batch add"});
        }
    });
};

exports.deleteBatch = function( req, res){
    res.format({
        json: function() {
            res.status(200).send({ name: "Batch delete"});
        }
    });
}


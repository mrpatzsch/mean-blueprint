var mongoose = require('mongoose');
var bpModel = mongoose.model('bpModel');

var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.getAll = function(req, res){
  bpModel.find().exec(function(err, entries){
    if(err){
      sendJsonResponse(res, 404, {'status': 'something went wrong'});
    }

    console.log('find complete');
    sendJsonResponse(res, 200, entries);
  });
};

module.exports.create = function(req, res){
  var newEntry = {
    name: req.body.name
  };

  bpModel.create(newEntry, function(err, entry){
    if(err){
      sendJsonResponse(res, 400, err);
    } else {
      sendJsonResponse(res, 201, entry);
    }
  });
};

module.exports.getSingle = function(req,res){
  var id = req.params.id;
  
  bpModel.findById(id).exec(function(err, entry){
    if(!id){
      sendJsonResponse(res, 404, {'status': 'no post id supplied'});
    } else if (err) {
      sendJsonResponse(res, 404, {'status': 'post not found'});
    } else {
      console.log('findById complete');
      sendJsonResponse(res, 200, entry);
    }
  });
};

module.exports.updateSingle = function(req, res){
  sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.deleteSingle = function(req, res){
  sendJsonResponse(res, 200, {"status": "success"});
};
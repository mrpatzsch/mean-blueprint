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
  var id = req.params.id;
  var name = req.body.name;
  
  bpModel.findById(id).exec(function(err, entry){
    if(!id){
      sendJsonResponse(res, 404, {'status': 'no post id supplied'});
    } else if (err) {
      sendJsonResponse(res, 404, {'status': 'post not found'});
    } else {
      entry.name = name;
      entry.save(function(err, entry){
        if(err){
          sendJsonResponse(res, 404, err);
        } else {
          sendJsonResponse(res, 200, entry);
        }
      });
    }
  });
};

module.exports.deleteSingle = function(req, res){
  var id = req.params.id;

  if(id){
    bpModel.findByIdAndRemove(id)
    .exec(
      function(err, entry){
        if(err){
          sendJsonResponse(res, 404, err);
          return;
        }
        sendJsonResponse(res, 204, entry);
      });
  } else {
    sendJsonResponse(res, 404, {'message': 'no id provided'});
  }
  sendJsonResponse(res, 200, {"status": "success"});
};
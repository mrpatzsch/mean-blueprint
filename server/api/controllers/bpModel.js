var sendJsonResponse = function(res, status, content){
  res.status(status);
  res.json(content);
};

module.exports.getAll = function(req, res){
  sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.create = function(req, res){
  sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.getSingle = function(req,res){
  sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.updateSingle = function(req, res){
  sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.deleteSingle = function(req, res){
  sendJsonResponse(res, 200, {"status": "success"});
};
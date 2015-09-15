module.exports.index = function(req, res, next) {
  var title = {title: 'mean-blueprint'};


  res.render('index', title);
};
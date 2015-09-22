var mongoose = require('mongoose');

var app = 'blueprint2';
var URI = 'mongodb://localhost/' + app;
console.log(app);
mongoose.connect(URI);


//Connection Events
mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to:', URI);
});
mongoose.connection.on('error', function(err){
  console.log('Mongoose connection err:', err);
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});
var mongoose = require('mongoose');

var app = 'blueprint';
var URI = 'mongodb://localhost/' + app;
mongoose.connect(URI);


//Connection Events
mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to:', dbURI);
});
mongoose.connection.on('error', function(err){
  console.log('Mongoose connection err:', err);
});
mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});
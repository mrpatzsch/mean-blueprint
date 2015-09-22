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


//Graceful Shutdown
var gracefulShutdown = function(msg, cb){
  mongoose.connection.close(function(){
    console.log('Mongoose connection closed through', msg);
    cb();
  });
};

//event listens
process.once('SIGUSR2', function(){
  gracefulShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SUGUSR2');
  });
});

process.on('SIGNIT', function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  });
});

process.on('SIGTERM', function(){
  gracefulShutdown('Heroku App Shutdown', function(){
    process.exit(0);
  });
});



//require models
require('../api/models/bpModel.js');
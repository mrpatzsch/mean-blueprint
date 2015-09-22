A Blueprint for future app layouts, featuring Express with Gulp 4.0 and Bower components and SCSS compiler. 

To start:
  1. NPM Install
  2. Bower Install
  3. Gulp build (requires Gulp 4 CLI)

<h2>Part Three: RESTful DB Calls</h2>
<p>The next thing I need to include in the blueprint is a quick layout for restful calls to the database. I'll be making use of the blueprint model I created in the last part.</p>
<h5>Creating the Routes</h5>
<p>The first thing that I'll need to do is create the routes that will be used by the API to make the requisite calls. Since this will be part of the API, I will store the files for these routes inside of the API folder at 'server/api/routes/index'. Just as with non-API routes, I will need to require these in the 'app.js' file.</p>
<pre>
  //app.js <br/>
  var routes = require('./routes/index'); <br/>
  var routesApi = require('./api/routes/index');
</pre>
<p>I also need to inform the application when to make use of these new routes:</p>
<pre>
  //app.js <br/>
  app.use('/', routes); <br/>
  app.use('/api', routesApi);
</pre>
<p>With that done, it's time to set up the actual routes. Again, for this very basic blueprint, I'll be creating the general RESTful paths.</p>
<pre>
  //server/api/routes/index.js <br/>
  var express = require('express'); <br/>
  var router = express.Router(); <br/>
  var bpModelCtrl = require('../controllers/bpModel'); <br/>
  <br/>
  router.get('/bpModels', bpModelCtrl.all); <br/>
  router.post('/bpModels', bpModelCtrl.create); <br/>
  router.put('/bpModels/:id', bpModelCtrl.updateSingle); <br/>
  router.delete('/bpModels/:id', bpModelCtrl.deleteSingle); <br/>
  <br/>
  module.exports = router; <br/>
</pre>
<p>While I haven't created the controller yet, I'll go ahead and include it in this file as if I had, since that's going to be the next step. After that is done, the routes are set up as needed and will work to create the required API calls.</p>
<h5>The API Controller</h5>
<p>As stated in the API routes file, the new controller will be found at 'server/api/controllers/bpModel.js'. I am going to start off by creating the wrappers for all of the routes stated above.</p>
<pre>
  module.exports.all = function(req, res){<br/>
  };<br/>
  module.exports.create = function(req, res){<br/>
  };<br/>
  module.exports.updateSingle = function(req, res){<br/>
  };<br/>
  module.exports.deleteSingle = function(req, res){<br/>
  };
</pre>
<h6>Returning JSON</h6>
<p>Each of these routes is going to need to return both a status code and json data in response to any call. Since both of these are common tasks, I am going to create an additional function to take care of it.</p>
<pre>
  //server/api/controllers/bpModel.js
    var sendJsonResponse = function(res, status, content){ <br/>
    res.status(status); <br/>
    res.json(content); <br/>
  };

  //example invocation:
  module.exports.getAll = function(req, res){ <br/>
    sendJsonResponse(res, 200, {"status": "success"}); <br/>
  };
</pre>
<p>While this new function doesn't compose a lot of code, it helps abstract the process of sending a response and data back, which is helpful whenever I need to change this function in the future. Rather than having to change the code in multiple places, I will only ever have to change this function.</p>
<h6>Including the Model</h6>
<p>Now it's time to include the bpModel to make actual calls to the database. On top of the file, before anything else takes place, both Mongoose and the model need to be required.</p>
<pre>
  var mongoose = require('mongoose'); <br/>
  var bpModel = mongoose.model(bpModel);
</pre>
<h6>Get Requests</h6>
<p>I am going to start off by setting up the get request calls, both for all entries of the schema in the database and for a single specific entry.</p>





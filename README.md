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
<pre>
  //find all: <br/>
module.exports.getAll = function(req, res){<br/>
  bpModel.find().exec(function(err, entries){ <br/>
    if(err){ <br/>
      sendJsonResponse(res, 404, {'status': 'something went wrong'}); <br/>
    } <br/>
    <br/>
    console.log('find complete'); <br/>
    sendJsonResponse(res, 200, entries); <br/>
  });
};
</pre>
<p>To find all entries, I simply use the Mongoose find query to return every database entry associated with the schema. I then log out a simple error if something isn't found, though I will later update these errors to be much more specific for different use cases. It's always important to make your error handling as explicit as possible; it makes developing a much easier task.</p>
<p>Finding a single entry takes a similar approach:</p>
<pre>
module.exports.getSingle = function(req,res){<br/>
  var id = req.params.id;<br/>
  <br/>
  bpModel.findById(id).exec(function(err, entry){<br/>
    if(!id){<br/>
      sendJsonResponse(res, 404, {'status': 'no post id supplied'});<br/>
    } else if (err) {<br/>
      sendJsonResponse(res, 404, {'status': 'post not found'});<br/>
    } else {<br/>
      console.log('findById complete');<br/>
      sendJsonResponse(res, 200, entry);<br/>
    }<br/>
  });<br/>
};
</pre>
<p>Here, Mongoose uses the findById method to find a single entry and returns it, unless an error occurs in which case the type of error gets returned as well.</p>
<h6>Creating New Entries</h6>
There are two main steps to creating new entries in a database using Mongoose. 
<ol>
  <li>
    Take data from a form and use it to creat a JS object with key-value pairs mirroring those of the schema
  </li>
  <li>
    Send a json callback response depending on whether the entry has been created
  </li>
</ol>
<p>I won't be building an actual form just yet, as I'll wait on that for when I add Angular to the blueprint, but for now I can set everything up on the backend so that things will work accordingly.</p>
<pre>
module.exports.create = function(req, res){<br/>
  var newEntry = {<br/>
    name: req.body.name<br/>
  };<br/>
<br/>
  bpModel.create(newEntry, function(err, entry){<br/>
    if(err){<br/>
      sendJsonResponse(res, 400, err);<br/>
    } else {<br/>
      sendJsonResponse(res, 201, entry);<br/>
    }<br/>
  });<br/>
}
</pre>
<p>newEntry is created from the post data to mirror the schema and is then inserted into the database using Mongoose's create method.</p>




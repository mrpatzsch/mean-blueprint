A Blueprint for future app layouts, featuring Express with Gulp 4.0 and Bower components and SCSS compiler. 

To start:
  1. NPM Install
  2. Bower Install
  3. Gulp build (requires Gulp 4 CLI)

<h2>Part Two: Adding MongoDB</h2>
<p>For my database for most Node/Express-based projects, I will likely use MongoDB as my database of choice. While I have experience setting up projects with Postgres as well, the ORM used to connect to a postgres database (sequelize) is...a little annoying...to work with since it is updated frequently in a way where it breaks previous code and the documentation provided isn't much help to explain what has happened.</p>
<p>Besides, the general projects I will be using this blueprint for won't be making use of any sort payment tools, which is where I think SQL databases really shine, so if I ever have to implement a payment tool, I can quickly make up a SQL database.</p>
<h5>Mongoose</h5>
<p>While it's possible to connect an application directly to MongoDB and have two interact using the native driver, MongoDB's native driver isn't very easy to work with. It also doesn't provide a way of defining or working with databases.</p>
<p>Enter Mongoose, which works like an ORM for MongoDB.</p>
<pre>npm install --save mongoose</pre>
<h5>Setting up the connection</h5>
<p>Two steps are involved to connect an application using mongoose to MongoDB.</p>
<ol>
  <li>
    Creating the connection file
  </li>
  <li>
    Requiring the file in the application
  </li>
</ol>
<h6>The Connection File</h6>
<p>I am creating a new folder in server folder, 'models'. It will host the various database structures that I want to implement in MongoDB for this application, as well as the connection file that will make it all possible.</p>
<p>This connection file will simply be called 'db.js' and, for right now, simply hold the following line of code:</p>
<pre>
  var mongoose = require('mongoose');
</pre>
<p>I will update this with more code shortly, but first I want to nake sure that the file is actually required inside the application.</p>
<pre>
server/app.js: <br/>
  var express = require('express'); <br/>
  var path = require('path'); <br/>
  ...<br/>
  ...<br/>
  <strong>require('./models/db.js');</strong><br/>
  ...<br/>
  ...
</pre>
<p>Since I am not planning on exporting any functions from the 'db.js' file, I won't have to define it into a variable in 'app.js'. I do, however, need it to be required in 'app.js', otherwise the mongoose connection won't be spooled up when the application is started.</p>
<p><strong>Creating the Mongoose Connection</strong></p>






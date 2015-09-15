A Blueprint for future app layouts, featuring Express with Gulp 4.0 and Bower components and SCSS compiler. 

To start:
  1. NPM Install
  2. Bower Install
  3. Gulp build (requires Gulp 4 CLI)



<h2>Building a MEAN App blueprint, Part 1: Express, Bower, and Gulp 4.0 Set-up</h2>

<p>I've recently come to the decision that need I a good blueprint for quickly prototyping applications. My normal set-up -- between directory structure and setting up additional stuff -- can take a little while to get going, time which I'd rather spend on coding than preparing to code.</p>
<h5>Basic Express Set-up</h5>
<p>I use the Express generator for my projects since I like the basic way the files are configured, and so will only have to make changes/additions to make everything feel more MVC-like.</p>
<code>mkdir 'mean-blueprint'</code>
code>cd mean-blueprint</code>
<code>express --git --ejs</code>
<p>I do use a couple of additional helper flags for the generator, by asking the generator to automatically create a .gitignore file for me and also asking it to change the view engine to ejs (just my preference over jade, though I do like dust.js a lot, now that I've played around with it, so maybe I'll change the blueprint to work with that instead at some pint in the future).</p>
<p>I did not, however, add a CSS pre-compiler option, as I will be doing this later with Gulp.</p>
<p>When the generator has done its business, I have a working express application to which I will do some quick house-cleaning.</p>
<h5>Express Layout Housecleaning</h5>
<p>Out of the box, express sets everything up with the following directory structure:</p>
<pre>
bin/
|   www
node_modules/
public/
|   images/
|   javascripts/
|   stylesheets/
routes/
|   index.js
|   users.js
views/
|   error.ejs
|   index.ejs
.gitignore
app.js
package.json
</pre>
<p>There's a few things I want to change:</p>
<ul>
  <li>
    <strong>Remove unnecessary route</strong>: The app comes packaged with a users route that I have no intention of using. So I'm going to get rid of it, and remove any mention to the file from app.js. This is a quick fix, so I won't mention any more about it. The two points below, however, will have a more detailed overview. 
  </li>
  <li>
    <strong>Make the routes more MVC-like</strong>: This is a change that would actually have a much larger impact where I to make this a non-angular project layout -- given that a lot of the actual computation is going to happen on the client side -- but, in any case, de-coupling the routes from their controllers is always a smart thing to do.
  </li>
  <li>
    <strong>Updating the directory structure</strong>: I am going to make a couple of changes to the layout of the directory, changing a couple of file names and moving things around. 
  </li>
</ul>
<h6>Updating the Directory Structure</h6>
<p>The first thing I want to do is add three base folders in which all the other application code will go: 'server', 'client', 'build'. The server folder will hold any code specifically associated with the node/express side of things, while the client folder will feature anything that will be needed client side. Basically, this will take the place of the 'public' folder the express generator created. For now this will remain empty as I will be using gulp to build the client side from the 'build' folder.</p>
<p>I am also creating a 'controller' folder inside of the 'server' folder to populate with the controller logic I will create later.</p>
<p>As of now, the structure of my app looks like this:</p>
<pre>
server/
|   app.js
|   bin/
|       www
|   views/
|       error.ejs
|       index.ejs
|   routes/
|       index.js
client/
|   images/
|   javascripts/
|   stylesheets/
build/
|   images/
|   javascripts/
|   stylesheets/
node_modules/
.gitignore
package.json
</pre>
<p>Now that the re-ordering is done, I need to update some files to make sure the application still knows where to find everything. The package.json file needs to be updated so that the start script knows the new location of the bin/www file:</p>
<code>"start": "node ./server/bin/www"</code>
<p>The app.js file needs to be updated so that it no longer looks for a 'public' folder from which it will server the static files available to the browser. Instead, it should now be looking for a 'client' folder:</p>
<code>app.use(express.static(path.join(__dirname, 'client')));</code>
<h6>A New Controller Folder</h6>
<p>The other thing I want to change is to separate the controller logic from the routes that the Express generator created. So I am going to create a 'controllers' folder inside of the server folder that will hold this new information, and inside of this new folder I'll create an 'indexCtrl.js' file that will hold the logic for the index routes.</p>
<p>This file is currently only going to hold the logic associated with the index route, as it is the only route I have:</p>
<code>
module.exports.index = function(req, res, next) {
  var title = {title: 'mean-blueprint'};
  res.render('index', title);
};
</code>
<p>The code is structured as a module.export method, so that I will easily be able to call it in the index.js route file to associate it accordingly. To do so, I first assign the controller file to a variable inside of the routes/index.js file...</p>
<code>
  var indexCtrl = require('../controllers/indexCtrl');
</code>
<p>...and then update the actual index route to make use of the variable.</p>
<code>
  Before: 
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
</code>
<code>
  After:
  router.get('/', indexCtrl.index);
</code>


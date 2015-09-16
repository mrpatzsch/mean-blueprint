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
<pre>
module.exports.index = function(req, res, next) {
  var title = {title: 'mean-blueprint'};
  res.render('index', title);
};
</pre>
<p>The code is structured as a module.export method, so that I will easily be able to call it in the index.js route file to associate it accordingly. To do so, I first assign the controller file to a variable inside of the routes/index.js file...</p>
<code>
  var indexCtrl = require('../controllers/indexCtrl');
</code>
<p>...and then update the actual index route to make use of the variable.</p>
<pre>
  Before: 
  router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  After:
  router.get('/', indexCtrl.index);
</pre>

<h5>Adding Bower</h5>
<code>bower init</code>
<p>Assuming bower is installed globally, this command will create the 'bower.json' file that stores information on the files associated with this project.</p>
<p>Now let's add the bower files that I know I will likely make use of, no matter the specific MEAN application: bootstrap, font-awesome, angular, ui-router.</p>
<code>
  bower install bootstrap font-awesome angular ui-router --save
</code>
<p>Once this is done, the directory will have a new folder called 'bower_components' that stores all of the files and their dependencies that we've downloaded. In this case, the additional library that got downloaded that I did not add myself is jQuery, since it is required for bootstrap.</p>
<p>That's about it for the bower part of this. I've also added the 'bower_components' folder to the '.gitignore' file so that they needlessly won't be stored on the repository.</p>

<h5>Gulp 4.0</h5>
<p>Gulp will power all sorts of fun tasks for me, such as preprocessing the SCSS I will write into CSS, minifying and concactinating my .js files, and otherwise just being bad-ass at everything.</p>
<p>Since I am using the 4.0 version, which is still in alpha at this point, the install will be slightly different.</p>
<pre>
  npm install -g "gulpjs/gulp-cli#4.0"
  npm install gulpjs/gulp.git#4.0 --save-dev
</pre>
<p>Both the CLI and gulp itself to be the 4.0 version. As a quick aside, I am using 4.0, rather than the current standard because 4.0 ushers in some really cool changes that make me not want go back to any previous version. The tasks now handle syntactically like normal JS functions, something that increases readability quite a bit. For instance, take a look how a simple uglify task handles in 4.0 and previous versions:</p>
<pre>
  Previous Versions: 

  gulp.task('scripts', function() {
    return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build/js'));
  });



  4.0:
  gulp.task('scripts', 
    gulp.series(scripts)
  ));

  function scripts() {
    return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest('build/js'));
  }
</pre>
<p>The change might look small, but makes things easier tasks much easier to edit, especially once the gulp helper methods .series and .parallel are taken into account. And again, it just is much more readable.</p>
<p>Next I need to install the various gulp libraries I plan on using. Since, as I said before, I am planning on writing .scsss files, I'll make use of 'gulp-ruby-sass'. I am also going to install the usual roster of 'gulp-uglify' and 'gulp-concat', as well as 'gulp-main-bower-files' to help easily get the bower_components files.</p>
<code>
  npm install gulp-main-bower-files gulp-concat gulp-ruby-sass gulp-uglify gulp-ruby-sass --save-dev
</code>
<h6>gulpfile.js</h6>
<code>touch gulpfile.js</code>
<p>The gulpfile is where all the tasks get defined for gulp to automate. The first thing I need to do is define the various functions I'll be using.</p>
<pre>
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var bower = require('gulp-main-bower-files');
var sass = require('gulp-ruby-sass');
var del = require('del');
</pre>
<p>The one file I haven't talked about yet is 'del', an npm module I'll be using to make sure that when gulp rebuilds files, the folders it will be rebuilding are clean of any code.</p>
<code>npm install --save-dev del</code>
<p>Next, I am going to define a paths object to hold some information that will make writing some of tasks less of a hassle.</p>
<pre>
var paths = {
  client: './client',
  server: './server',
  bower: './bower_components'
};
</pre>
<p>For the most part, I am planning on using 'gulp-main-bower-files' to handle getting my bower dist files, but there's a couple of places where dealing with it becomes more writing code than less, at which point I just manually select the correct path. The big downside of this is that should the layout of a particular bower file change due to a future update, I'll have to manually fix everything to keep it going.</p>
<h6>Defining Gulp Tasks</h6>
<p>I will define the actual gulp tasks that will run later. First I need to create the functions of which the tasks will actually make use.</p>
<p><strong>Clean</strong></p>
<p>The clean function I will be using is slightly different than the one found in Gulp's own example file for <a href="https://github.com/gulpjs/gulp/tree/4.0">a 4.0 gulpfile</a>.</p>






A Blueprint for future app layouts, featuring Express with Gulp 4.0 and Bower components and SCSS compiler. 

To start:
  1. NPM Install
  2. Bower Install
  3. Gulp build (requires Gulp 4 CLI)



<h2>Part whatever</h2>
Adding Angular 

<p>This blueprint is going to assume that the entire website is going to be run via angular. To that end, I will update the 'index.ejs' view file to make use of angular.</p>
<pre>
  //server/views/index.ejs<br/>
  <!DOCTYPE html><br/>
  <html ng-app='app'>
</pre>
<p>This index file is the first thing being served by the server upon request, and with that simple addition it now has become an angular application, and will look for an angular module called 'app' to run the whole thing, which I will create now inside of the 'build' folder.</p>
<p>I am going to be adding a few new folders to the directory structure to map out the angular project. The resulting build folder will look like this:</p>
<pre>
| build <br/>
    | stylesheets <br/>
        | main.scss <br/>
    | javascripts <br/>
        | app <br/>
            | app.js <br/>
        | controllers <br/>
            | homeCtrl.js <br/>
        | directives <br/>
        | services <br/>
        | filters <br/>
</pre>
<p>The javascripts folder holds five folders that make up the general layout for the angular app. The module itself will be found in the 'app.js' file inside the 'app' folder, while I've also created additional folders for other angular parts that I may or may not be making use of in future projects.</p>
<p>The 'app.js' file itself will look like this:</p>
<pre>
  var app = angular.module('app', ['ui.router']); <br/>

  app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) { <br/>
  <br/>
    // 'if typed in url is not used, go to homepage'<br/>
    $urlRouterProvider.otherwise('/');<br/>
  <br/>
    // use stateProvider for other routings<br/>
    $stateProvider<br/>
      .state('home', {<br/>
        url: '/',<br/>
        controller: 'baseController',<br/>
        templateUrl: 'templates/home.html'<br/>
      });<br/>
  }]);
</pre>
<h5>The Module</h5>
<p>The angular module is instantiated at the top of the page. Inside the brackets, I am injecting the ui-router service, something I installed with bower in a previous entry, and which will serve as the routing method for the application.</p>
<p>The routes themselves are put together below in the 'app.config' part. Each route will be provided via a different state that controls the url for the route, which controller the route should be using, as well as the template to show. There are other options, but for the basic blueprint I will not need to explore them. I am also currently only creating a home route. Others would go beneath it in future projects.</p>
<h5>Templates</h5>
<p>I will add the templates that ui-router will use to render the page to a new folder in the 'build' directory entitled 'templates', as per the url used above. For now, I just need a base template entitled 'home.html'. For now this template will just hold html. I will update it with a simple two-directional data display once I create a controller, to make sure everything works accordingly.</p>
<pre>
  //build/templates/home.html<br/>
  <h1>The Test Template</h1><br/>
  <p>Hi. I am a test.</p>
</pre>
<p>Angular will look for the templates in the static folder available to the client (for my projects, that will be the 'client' folder). Since this folder is created via gulp, I will need to add a new gulp task that takes the templates I create in /build/templates/ and moves them to /client/templates/.</p>
<pre>
  //gulpfile.js<br/>
  function templates(){<br/>
    return gulp.src(paths.build + '/templates/**/*')<br/>
    .pipe(gulp.dest(paths.client + '/templates'));<br/>
  }
</pre>
<p>This function has been added to the gulp build task and will simply take the templates folder in the 'build' folder and recreate it in the 'client' folder, thereby making it available to Angular.</p>
<h5>Controllers</h5>
<p>Every route will, potentially, have its own controller. For the purpose of this blueprint, I will only create a single one, found at 'build/javascripts/controllers/baseCtrl.js'.</p>
<pre>
  //build/javascripts/controllers/baseCtrl.js <br/>
  var base = app.controller('baseController', ['$scope', function($scope) {<br/>
  <br/>
  $scope.test = 'hi there, this is the scope test';<br/>
  <br/>
  }]);
</pre>
<p>For now this controller includes a single $scope variable, called 'test', that will help make sure that the two-directional databinding is set up correctly. To test this, I need to update the home template to invoke the variable:</p>
<pre>
  //build/templates/home.html<br/>
  <h1>The Test Template</h1><br/>
      <p>Hi I am a test.</p><br/>
      {{test}}<br/>
</pre>
<p>Now, after I rebuild the scope file and start the server, the home page should show the scoped variable output correctly.</p>
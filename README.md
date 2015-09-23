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
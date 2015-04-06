#Speaker_Switch_Rpi
##A little exercise in full-stack development.

A single button, and single status div for turning on and off my
home speakers ( in a specific order ) using a [Raspberry Pi] and a few [PowerSwitch Tail II]s.

##Stack
* [React] - Hip new component based front-end framework du jour
* [Node.js] and [Hapi] - NodeJS server and framework
* [Gulp] - Task automation in js
* [Browserify] - Client side CommonJS Modules and build transformations
* [Bower] - Client side package management
* [JSHint] and [JSCS] - static analysis that I've grown to love and hate
* [liveReload] - support for auto reloading via browser plugin
* [Mocha] and [Chai] - Test Framework and Assertion library

###Structure
|-- public/  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- bower_components/  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+-- js/  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|--  bundle.js  *built via gulp browserify*  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|-- index.html  
|-- src  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +-- client/  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +-- server/  
|-- spec/  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +-- client/  
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; +-- server/  
|-- tasks/



###Useage
First off, make sure to
```
npm install
```
And if they're not already globally available,
```
npm install -g gulp
```
Finish that all up with a quick
```
bower install
```

Build the source

```
gulp
```

Start the node server ( equivalent to nodemon src/server/index.js )
```
npm start
```
Navigate to localhost:8080 to see the status of the 'speakers' ( mocked for demonstration/development, 4 lines to uncomment, 3 to comment out in toggleSpeakers.js - todo: automate the code adjustments for production )

Gulp tasks include :
* 'lint'
* 'build'
and
* 'watch' ( default )

### Todo
 - Build basic REST endpoint, setup Sinon
 - Sass
 - HTML Templating
 - ES6 support

###License

MIT

**Free Software, Hell Yeah!**
[React]:https://facebook.github.io/react/
[Browserify]:http://browserify.org
[Bower]:http://bower.io
[JSHint]:http://jshint.com
[JSCS]:http://jscs.info
[liveReload]:http://livereload.com
[Hapi]:http://hapijs.com
[Node.js]:http://nodejs.org
[jQuery]:http://jquery.com
[Gulp]:http://gulpjs.com
[Mocha]:http://mochajs.org
[Chai]:/http://chaijs.com
[PowerSwitch Tail II]:/http://www.powerswitchtail.com
[Raspberry Pi]:/http://www.raspberrypi.org

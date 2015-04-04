/** 
 * toggleSpeakers.js
 * post request to /switch
 * exports toggleSpeakerPower 
 * checks status, calls either subSpeakerOn or speakerSubOff
 * and systemOn which returns falsy iff all speakers are off
*/

/* Uncomment below to use real Rpi GPIO */
var GPIO = require('onoff').Gpio;


/* Mock GPIO objects for testing/building
 on non-pi hardware */
var Output = function(){
    this.state = 0;
};

Output.prototype.readSync = function(){
    return this.state;
};

Output.prototype.writeSync = function(val){
    this.state = val;
};

var speakers = {
    // /* Uncomment below to use real Rpi GPIO */
    sub : new GPIO(23, 'out'),
    left : new GPIO(24, 'out'),
    right : new GPIO(25, 'out'),
    /* Use definitions below for testing/building
     on non-pi hardware */
    // sub : new Output(23, 'out'),
    // left : new Output(24, 'out'),
    // right : new Output(25, 'out'),
    /* only one command at a time!
       also, maybe add a 'lock' feature on the site? */
    available : true
};

var toggleSwitch = function(s, cb) {
  if(s.readSync() === 0) {
    s.writeSync(1);
    cb('on');
  } else {
    s.writeSync(0);
    cb('off');
  }
};

var toggleSpeakerPower = function(cb){
    var system = speakers;
    if (system.available) {
        system.available = false;
        if (systemOn(system)) {
            console.log('turning off');
            turnSystemOff(system, cb);
        }
        else {
            console.log('turning on');
            turnSystemOn(system, cb);
        }
    }
    else {
        console.log('toggle attempted while system unavailable - cancelled');
        cb(-1);
    }
};

var turnSystemOn = function(system, cb){
    toggleSwitch(system.sub, function(status){
        console.log('toggledSub ' + status);
    });
    setTimeout(toggleTops.bind(null, system, cb), 2000);
};

var turnSystemOff = function(system, cb){
    toggleSwitch(system.right, function(status){
        console.log('toggledRight ' + status);
    });
    toggleSwitch(system.left, function(status){
        console.log('toggledLeft ' + status); 
    });
    setTimeout(toggleSub.bind(null, system, cb), 2000);
};

var toggleSub = function(system, cb){
    toggleSwitch(system.sub, function(status){
        console.log('toggledSub ' + status);   
        if(cb){
            system.available = true;
            console.log('toggle complete, system available');
            cb(systemOn(system));
        }
    });
};

var toggleTops = function(system, cb){
    toggleSwitch(system.right, function(status){
        console.log('toggledRight ' + status);
        toggleSwitch(system.left, function(status){
            console.log('toggledLeft ' + status); 
            if(cb){
                system.available = true;
                console.log('toggle complete, system available');
                cb(systemOn(system));
            }
        });
    });
};

var systemOn = function(system){
    /* will return truthy if and only if
       all speakers are off */
    if (system.sub.readSync() === 0 &&
        system.left.readSync() === 0 &&
        system.right.readSync() === 0 ){
        console.log('System Off');
        return 0;
    }
    else {
        console.log('System On');
        return 1;
    }
};

module.exports = {
    toggleSpeakerPower : toggleSpeakerPower,
    systemOn : systemOn,
    system : speakers
};

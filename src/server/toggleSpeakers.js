// toggleSpeakers.js
// post request to /switch
// handler calls toggleSpeakerPower
// checks status, calls either subSpeakerOn or speakerSubOff

var GPIO = require('onoff').Gpio;

var Output = function(){
    this.state = 0;
}

Output.prototype.readSync = function(){
    return this.state;
}

Output.prototype.writeSync = function(val){
    this.state = val;
}

var inProgress = 0; // debounce

var speakers = {
    sub : new GPIO(23, 'out'),
    left : new GPIO(24, 'out'),
    right : new GPIO(25, 'out')
    //sub : new Output(23, 'out'),
    //left : new Output(24, 'out'),
    //right : new Output(25, 'out')
};

var toggleSpeakerPower = function(request, reply){
    console.log('got to switch')
    var system = speakers;
    if(systemOn(system)){
        console.log('turning off');
        inProgress = true;
        turnSystemOff(system);
    }
    else {
        inProgress = true;
        console.log('turning on');
        turnSystemOn(system);
    }
    reply('oh yeah - got that toggle');
};

var turnSystemOn = function(system){
    toggleSwitch(system.sub, function(status){
        console.log('toggledSub ' + status)
    });
    setTimeout(toggleTops.bind(null, system), 2000);
}

var turnSystemOff = function(system){
    toggleSwitch(system.right, function(status){
        console.log('toggledRight ' + status);
    });
    toggleSwitch(system.left, function(status){
        console.log('toggledLeft ' + status); 
    });
    setTimeout(toggleSub.bind(null, system), 2000);
}


var toggleSub = function(system){
    toggleSwitch(system.sub, function(status){
        console.log('toggledSub ' + status)
    });
}

var toggleTops = function(system){
    toggleSwitch(system.right, function(status){
        console.log('toggledRight ' + status);
    });
    toggleSwitch(system.left, function(status){
        console.log('toggledLeft ' + status); 
    });
}

var systemOn = function(system){
    // will not turn on system if any 
    // switch is on
    if (system.sub.readSync() === 0 &&
       system.left.readSync() === 0 &&
       system.right.readSync() === 0 ){
        return 0;
    }
    else {
        return 1;
    }
}

function toggleSwitch(s, cb) {
  if(s.readSync() === 0) {
    // turn LED on
    s.writeSync(1);
    cb('on');
  } else {
    // turn LED off
    s.writeSync(0);
    cb('off');
  }
}

module.exports = {
    toggleSpeakerPower : toggleSpeakerPower
};

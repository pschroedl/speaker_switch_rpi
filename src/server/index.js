
var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ host: '0.0.0.0', port : 8080 });


var speakers = require('./toggleSpeakers.js');

var preHandler = function(request,next) {
    console.log('Recieved request for : ' + JSON.stringify(request.url.path));
    return next();
};

server.route({
    method: 'GET',
    path: '/{param*}',
    config: {
        pre: [{ method : preHandler }],
        handler: {
            directory: {
                path: 'public',
                index : true
            }
        }
    }
});

server.route({
    method: 'POST',
    path: '/switch',
    config: {
        pre: [{ method : preHandler }],
        handler: function(response, reply){
            speakers.toggleSpeakerPower(function(result) {
                if (result >= 0) {
                    if ( result === 1 ) {
                        reply({ status : 'on' });
                    }
                    else {
                        reply({ status : 'off' });
                    }
                }
                else {
                    reply({ status : 'unavailable' });
                }
            });
        }
    }
});

server.route({
    method: 'GET',
    path: '/status',
    config: {
        pre: [{ method : preHandler }],
        handler: function(response, reply) {
            if (speakers.systemOn(speakers.system) === 1) {
                reply({ status : 'on' });
            }
            else {
                reply({ status : 'off' });
            }
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

// export for testing
module.exports = server;

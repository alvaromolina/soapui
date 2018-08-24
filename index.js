var http = require('http');
var soap = require('soap');
var express = require('express');
var bodyParser = require('body-parser');


var myService = {
    VivaWalletAdministrationWSService: {
        VivaWalletWSPort: {
            getCachesSize: function (args, callback) {
                // do some work
                console.log('sayHello: '+JSON.stringify(args));
                callback({'greeting': 'Hello '});
            }
        }
    }
};

var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//http server example
var server = http.createServer(function(request,response) {
    response.end('404: Not Found: ' + request.url);
});

server.listen(8000);
soap.listen(server, '/VivaWalletAdministrationWS', myService, xml);

//express server example
var app = express();
//body parser middleware are supported (optional)
app.use(bodyParser.raw({type: function(){return true;}, limit: '5mb'}));
app.listen(8001, function(){
    //Note: /wsdl route will be handled by soap module
    //and all other routes & middleware will continue to work
    console.log('Hola: ');
    soap.listen(app, '/VivaWalletAdministrationWS', myService, xml);
});
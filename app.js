var express    = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());

var notify = require('./notify')();
var garage = require('./garage.js')(notify);
var catToy = require('./cat.js')();
//var thermp = require('./thermo.js')(); // enable when you have one

app.post('/register', function(req, res) {
    var token = req.body['token'];
    notify.register(token);
    res.json({'result': 'ok'});
});

app.post('/device', function(req, res){
    var id = req.body['id'];
    if(id === '1'){
        var data = req.body['data'];
        data === '1' ? catToy.play(): catToy.stop();
        res.json({'result': 'Laser'});
    }
    else if(id === '2') {
        garage.toggleDoor();
        res.json({'result': 'Garage'});
    }else if(id === '3'){
        res.json({'result': garage.isDoorOpen()?'50':'400'});
    }else if(id === '4'){
        res.json({'result': '24'});
    }
});

app.listen(5000);


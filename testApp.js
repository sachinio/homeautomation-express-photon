/**
 * Created by sachinpatney on 4/24/16.
 */

var five = require("johnny-five");
var Particle = require("particle-io");
var MainDoorPort = "D0";

new five.Board({
    io: new Particle({
        token: process.env.TOKEN,
        deviceId: process.env.GARAGE_DEVICE_ID
    })
}).on("ready", function () {
    console.log('Connected to Garage Controller');
    this.pinMode(MainDoorPort, this.MODES.OUTPUT);
    var proximity = new five.Proximity({
        controller: "HCSR04",
        pin: "D1",
        freq: 500
    });

    proximity.on("data", function () {
        console.log(this.cm);
    });

});
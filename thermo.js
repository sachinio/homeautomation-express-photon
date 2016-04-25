/**
 * Created by sachinpatney on 4/24/16.
 */
/**
 * Created by sachinpatney on 4/24/16.
 */

module.exports = function() {
    var five = require("johnny-five");
    var Particle = require("particle-io");
    var self = this;
    var temp = 0;

    new five.Board({
        io: new Particle({
            token: process.env.TOKEN,
            deviceId: process.env.THERMO_DEVICE_ID
        })
    }).on("ready", function () {
        var temperature = new five.Thermometer({
            controller: "TMP36",
            pin: "A0"
        });

        temperature.on("data", function() {
            console.log(this.celsius + "°C", this.fahrenheit + "°F");
            temp = this.celsius;
        });

        self.temp = function(){
            return temp;
        }
    });

    return this;
};
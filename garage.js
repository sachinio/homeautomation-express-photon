module.exports = function (notify) {
    var five = require("johnny-five");
    var Particle = require("particle-io");
    var self = this;
    var MainDoorPort = "D0";
    var open = false;
    var arr = [];
    var flag = true;

    new five.Board({
        io: new Particle({
            token: process.env.TOKEN,
            deviceId: process.env.GARAGE_DEVICE_ID
        })
    }).on("ready", function () {
        console.log('Connected to Garage Controller');
        require('./guard.js')(self, notify);
        var _board = this;
        this.pinMode(MainDoorPort, this.MODES.OUTPUT);
        var proximity = new five.Proximity({
            controller: "HCSR04",
            pin: "D1",
            freq: 500
        });

        proximity.on("data", function () {
            flag = !flag;
            arr[flag ? 0 : 1] = this.cm < 200;
            if (arr[0] === arr[1])
                open = arr[0] && arr[1];
        });

        self.isDoorOpen = function () {
            console.log("Checking door status: ", open)
            return open;
        };

        self.toggleDoor = function () {
            console.log("Door button pressed");
            _board.digitalWrite(MainDoorPort, 1);
            setTimeout(function () {
                _board.digitalWrite(MainDoorPort, 0);
            }, 500);
        };
    });

    return this;
};
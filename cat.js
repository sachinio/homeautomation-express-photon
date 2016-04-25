/**
 * Created by sachinpatney on 4/24/16.
 */

module.exports = function(){
    var five = require("johnny-five");
    var Particle = require("particle-io");
    var self = this;
    var verticalServo = "D0";
    var horizontalServo = "D1";
    var laser = "D2";
    var thread = 0;

    new five.Board({
        io: new Particle({
            token: process.env.TOKEN,
            deviceId: process.env.CAT_DEVICE_ID
        })
    }).on("ready", function () {
        console.log('Connected to Cat Controller');
        var _board = this;

        this.pinMode(verticalServo, this.MODES.SERVO);
        this.pinMode(horizontalServo, this.MODES.SERVO);
        this.pinMode(laser, this.MODES.OUTPUT);

        this.servoWrite(verticalServo, 90);
        this.servoWrite(horizontalServo, 90);

        self.play = function(){
            clearInterval(thread);

            thread = setInterval(function() {
                _board.servoWrite(verticalServo, ((Math.random() * 20) | 0) + 30);
                _board.servoWrite(horizontalServo, ((Math.random() * 60) | 0) + 60);
                _board.digitalWrite(laser, 1);
            }, 1500);
        };

        self.stop = function(){
            clearInterval(thread);
            _board.servoWrite(verticalServo, 100);
            _board.servoWrite(horizontalServo, 90);
            _board.digitalWrite(laser, 0);
        }
    });

    return this;
};
/**
 * Created by sachinpatney on 4/24/16.
 */
module.exports = function (){
    var mongojs = require('mongojs');
    var db = mongojs('home', ['gcmtokens']);

    this.notify = function(subject, msg){
        console.log(subject);
        console.log(msg);


        db.gcmtokens.find(function (err, docs) {
            var tokens = [];
            docs.forEach(function(d){
                tokens.push(d['token']);
            });

            var gcm = require('node-gcm');

            var message = new gcm.Message({
                priority: 'high',
                notification: {
                    title: subject,
                    body: msg
                }
            });
            var sender = new gcm.Sender(process.env.NOTIFICATION_KEY);

            sender.send(message, { registrationTokens: tokens }, function (err, response) {
                if(err) console.error(err);
                else 	console.log(response);
            });
        });
    };

    this.register = function(token){
        console.log(token);
            db.gcmtokens.update({'token': token},{'token': token},{upsert:true}, function(err){
        });

    };
    console.log('Notification service online');
    return this;
}
module.exports = function(garage, notify){
    console.log('Guard in place');
    var openCount = 0;
    var backOff = 2;
    setInterval(function() {
        if(garage.isDoorOpen()){
            openCount++;
            if(openCount>backOff){
                notify.notify('Alert','Garage door left open!');
                openCount = 0;
                backOff*=2;
            }
        }else{
            openCount = 0;
            backOff = 2;
        }
    }, 1000 * 60 * 3);
    return this;
}
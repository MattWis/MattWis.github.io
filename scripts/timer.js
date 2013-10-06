define([], function () {
  var G = {
    start: function () {
      var _g = this;
      console.log("G:", _g);
      _g.state.started = true;
      _g.state.counters.shotsFired = 0;
      _g.state.performer.center.visible = true;
      for (var i=0; i<_g.state.performer.legs.length; i++) {
        _g.state.performer.legs[i].upperLeg.visible = true;
        _g.state.performer.legs[i].lowerLeg.visible = true;
        $('#countDiv').html(_g.state.counters.shotsFired.toString() + " shots fired");       
      }
      var count = 120;

      var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

      function timer() {
        count = count-1;
        if (count < 0) {
           clearInterval(counter);
           endGame();
        }
        var minutes = Math.floor(count/60);
        var seconds = count % 60;
        var leadingZero = (seconds.toString().length == 1);
        $("#timer").html(minutes.toString() + ":" + (leadingZero ? "0" : "") + seconds.toString());
      }
    },
    endGame: function () {

    }
  }

  return G;
});

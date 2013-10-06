define([], function () {
  var G = {
    start: function () {
      var _g = this;
      console.log("G:", _g);
      _g.state.started = true;
      _g.state.counters.shotsFired = 0;
      $('#countDiv').html(_g.state.counters.shotsFired.toString() + " shots fired");
      var count = 120;

      var counter = setInterval(timer, 1000); //1000 will  run it every 1 second

      function timer() {
        count = count-1;
        if (count < 0) {
           clearInterval(counter);
           return;
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

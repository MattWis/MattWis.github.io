define([], function () {
  var G = {
    start: function () {
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

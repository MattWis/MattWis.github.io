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

      var timer = function () {
        var _g = this;
        count = count-1;
        if (count < 0) {
           clearInterval(counter);
           console.log("Game ended");
           $('#result').html('Audience Loses!');
           $('#result').css('display', 'block');
           $("#timer").css('display', 'none');
           var nullObj = {};
           for (key in _g.state.avatars) {
             console.log("Key", key);
             if (_g.state.avatars.hasOwnProperty(key)) {
               nullObj[key] = null;
             }
           }
           _g.state.database.avatars.update(nullObj);
           _g.state.performer.center.visible = false;
           for (var i=0; i<_g.state.performer.legs.length; i++) {
             _g.state.performer.legs[i].upperLeg.visible = false;
             _g.state.performer.legs[i].lowerLeg.visible = false;      
           }
        }
        var minutes = Math.floor(count/60);
        var seconds = count % 60;
        var leadingZero = (seconds.toString().length == 1);
        $("#timer").html(minutes.toString() + ":" + (leadingZero ? "0" : "") + seconds.toString());
      }

      var counter = setInterval(timer.bind(_g), 1000); //1000 will  run it every 1 second

    },
    endGame: function (audienceWins) {
      var _g = this;
      console.log("Game ended");
      if (audienceWins) {
        $('#result').html('Audience Wins!')
      } else {
        $('#result').html('Audience Loses!')
      }
      $('#result').css('display', 'block');
      $('#timer').css('display', 'none');
      var nullObj = {};
      for (key in _g.state.avatars) {
        console.log("Key", key);
        if (_g.state.avatars.hasOwnProperty(key)) {
          nullObj[key] = null;
        }
      }
      _g.state.database.avatars.update(nullObj);
      _g.state.performer.center.visible = false;
      for (var i=0; i<_g.state.performer.legs.length; i++) {
        _g.state.performer.legs[i].upperLeg.visible = false;
        _g.state.performer.legs[i].lowerLeg.visible = false;      
      }
    }
  }

  return G;
});

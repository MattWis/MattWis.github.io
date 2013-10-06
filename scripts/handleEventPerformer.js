define(['zepto', 'pixi'], function ($, PIXI) {
  var G = {
    setupDBCallbacks: function(e) {
      var _g = this
        , database = _g.state.database;

      database.avatars.on('child_added', function(child) {
        console.log("audience added");
        _g.addAvatar(child.name(), child.val());
      });

      database.avatars.on('child_changed', function(child) {
        console.log('audience changed');
      });

      database.avatars.on('child_removed', function(child) {
        var avatars = _g.state.avatars
          , key = child.name();

        console.log('audience removed');

        _g.state.avatarCount -= 1;
        _g.state.stage.removeChild(avatars[key].go);
        delete(avatars[key]);
      });

      database.attacks.on('child_added', function(attack) {
        _g.addAttack(attack.name(), attack.val());
        _g.state.counters.shotsFired++;
        $('#countDiv').html(_g.state.counters.shotsFired.toString() + " shots fired");
      });

      database.attacks.on('child_removed', function(attack) {
        var attacks = _g.state.attacks
          , key = attack.name();

        _g.state.stage.removeChild(attacks[key].go);
        delete(attacks[key]);
      });
    }
  }

  return G;
});

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
        console.log('audience removed');
      });

      database.attacks.on('child_added', function(attack) {
        console.log('attack added');
        _g.addAttack(attack.name(), attack.val());
      });
    }
  }

  return G;
});

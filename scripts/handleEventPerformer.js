define(['zepto', 'pixi'], function ($, PIXI) {
  var G = {
		setupDBCallbacks: function(e) {
			var _g = this
				, database = _g.state.database;

			database.avatars.on('child_added', function(child) {
				console.log("added");
				console.log(child.name());
				console.log(child.val());
				_g.addAvatar(child.name(), child.val());
			});

			database.avatars.on('child_changed', function(child) {
				console.log('changed');
				console.log(child.name());
				console.log(child.val());
				_g.changeAvatar(child.name(), child.val());
			});

			database.avatars.on('child_removed', function(child) {
				console.log('removed');
			});
		}
  }

  return G;
});

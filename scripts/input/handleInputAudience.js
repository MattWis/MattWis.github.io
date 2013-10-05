define(['zepto', 'pixi'], function ($, PIXI) {
  var G = {
    clickOnStage: function (e) {
			var _g = this
				, myAvatar = _g.state.database.myAvatar;
      //_g.state.avatar.go.position = e.global.clone();
			myAvatar.push({fired: new Date()});
    }
  }

  return G;
});

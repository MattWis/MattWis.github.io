define(['zepto', 'pixi'], function ($, PIXI) {
  var G = {
    clickOnStage: function (e) {
      var _g = this
      , myAvatar = _g.state.database.myAvatar;
      //_g.state.avatar.go.position = e.global.clone();
      console.log("Heh");
      myAvatar.push({fired: (new Date()).toJSON()});
    }
  }

  return G;
});

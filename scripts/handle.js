define(['zepto', 'pixi', 'handle'], function ($, PIXI, HANDLE) {
  var G = {
    clickOnStage: function (e) {
      var _g = this;
      _g.state.avatar.go.position = e.global.clone();
      console.log('clack');
      _g.state.database.clicks.push({click: 1});
    }
  }

  return G;
});
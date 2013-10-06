define(['zepto', 'pixi'], function ($, PIXI) {
  var G = {
    clickOnStage: function (e) {
      var _g = this
      , database = _g.state.database;
      //_g.state.avatar.go.position = e.global.clone();
      console.log("Attack!");
      database.myAvatar.push({fired: (new Date()).toJSON()});
      database.attacks.push({
        attacker: database.myID
      , fired: (new Date()).toJSON()
      });
    }
  }

  return G;
});

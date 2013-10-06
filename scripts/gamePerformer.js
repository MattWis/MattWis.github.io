define(['zepto', 'pixi', 'handleEventPerformer'], function ($, PIXI, HANDLE_EVENT) {
  var G = {
    state: {
      database: {
        avatars: null
      ,	myAvatar: null
      }
    , renderer: null
    , stage: null
    , textures: {
        avatar: null
      }
    , avatarCount: 0
    , avatars: {
      //, audience_member: {
            //go: null
          //, index: 0
        //}
      }
    , attacks: {
      }
    }
  , init: function () {
        var _g = this;

        _g.setupGraphics.bind(_g)();
        _g.setupObjects.bind(_g)();
        _g.setupDBConnection.bind(_g)();
        HANDLE_EVENT.setupDBCallbacks.bind(_g)();
        _g.setupHandlers.bind(_g)();

        requestAnimationFrame(_g.render.bind(_g));
      }
    , setupDBConnection: function () {
        var _g = this
          , database = _g.state.database;
        database.avatars = new Firebase('https://olinhackmit.firebaseIO.com/avatars');
        database.avatars.remove();
      }
    , setupGraphics: function () {
        var _g = this
          , renderer = new PIXI.autoDetectRenderer(800, 600)
          , stage = new PIXI.Stage(0x66FF99, true);

        renderer.view.style.display = "block";
        document.body.appendChild(renderer.view);

        _g.state.renderer = renderer;
        _g.state.stage = stage;
      }
    , setupObjects: function () {
        var _g = this
          , textures = _g.state.textures
          , avatar = _g.state.avatar
          , stage = _g.state.stage;

        textures.avatar = PIXI.Texture.fromImage("images/avatar.png");
      }
    , setupHandlers: function () {
        var _g = this
          , stage = _g.state.stage;
      }
    , render: function () {
        var _g = this;
        _g.simulate.bind(_g)();
        _g.state.renderer.render(_g.state.stage);
        requestAnimationFrame(_g.render.bind(_g));
      }
    , simulate: function () {
        var _g = this;
      }
    , defaultAvatar: function(textures) {
        var _g = this
          , stage = _g.state.stage
          , avatar = {};

        avatar.go = new PIXI.Sprite(textures);

        avatar.go.position.x = 400;
        avatar.go.position.y = 300;

        avatar.go.scale.x = 0.5;
        avatar.go.scale.y = 0.5;

        stage.addChild(avatar.go);

        return avatar;
    }
    , addAvatar: function (id, avatarData) {
        var _g = this
          , avatars = _g.state.avatars
          , textures = _g.state.textures
          , avatar;

        avatar = _g.defaultAvatar(textures.avatar);

        avatar.index = _g.state.avatarCount;
        _g.state.avatarCount += 1;
        avatars[id] = avatar;

        _g.reorientAvatars(avatars);

        console.log(avatars);

    }
    , reorientAvatars: function (avatars) {
        var _g = this
          , count = _g.state.avatarCount
          , degreeDelta = 2 * Math.PI / count;

        for (var avatarKey in avatars) {
          if (avatars.hasOwnProperty(avatarKey)) {
            var avatar = avatars[avatarKey]
              , degrees = avatar.index * degreeDelta;

            avatar.go.position.x = 200 * Math.cos(degrees) + 300;
            avatar.go.position.y = 200 * Math.sin(degrees) + 300;
            avatar.go.rotation = degrees - Math.PI / 2;
          }
        }
      }
    , changeAvatar: function(id, avatarData) {
        var _g = this
          , avatar = _g.avatars[id];

        //avatar.go.position.x = avatarData.x;
        //avatar.go.position.y = avatarData.y;
      }
    }

  window.G = G;
  return G;
});

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
    , avatars: {
    //client: {
        //go: null
      //, pos: {x: 0, y: 0}
      //}
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

        textures.avatar = PIXI.Texture.fromImage("images/testAvatar.png")
      }
    , setupHandlers: function () {
        var _g = this
          , stage = _g.state.stage;
        //stage.mousedown = HANDLE_INPUT.clickOnStage.bind(_g);
        //stage.mousedown = HANDLE_EVENT.setupDBCallbacks.bind(_g);
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
    , addAvatar: function (id, avatarData) {
        var _g = this
          , stage = _g.state.stage
          , avatars = _g.state.avatars
          , textures = _g.state.textures
          , avatar;

        avatar = {};
        avatar.go = new PIXI.Sprite(textures.avatar);

        //avatar.go.position = avatarData;

        avatar.go.position.x = avatarData.x;
        avatar.go.position.y = avatarData.y;

        avatar.go.scale.x = 0.5;
        avatar.go.scale.y = 0.5;

        stage.addChild(avatar.go);
        avatars[id] = avatar;
      }
    , changeAvatar: function(id, avatarData) {
        var _g = this
          , avatar = _g.avatars[id];

        avatar.go.position.x = avatarData.x;
        avatar.go.position.y = avatarData.y;
      }
    }

  window.G = G;
  return G;
});

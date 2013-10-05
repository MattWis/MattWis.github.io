define(['zepto', 'pixi', 'handle'], function ($, PIXI, HANDLE) {

    var G = {
      state: {
        database: {
            clicks: null
        }
      , renderer: null
      , stage: null
      , avatar: {
          go: null
        , pos: {x: 0, y: 0}
        }
      }
    , init: function () {
          var _g = this;

          _g.setupGraphics.bind(_g)();
          _g.setupObjects.bind(_g)();
          _g.setupDBConnection.bind(_g)();
          _g.setupHandlers.bind(_g)();

          requestAnimationFrame(_g.render.bind(_g));
        }
      , setupDBConnection: function () {
          var _g = this
            , database = _g.state.database;
          database.clicks = new Firebase('https://olinhackmit.firebaseIO.com/clicks');
          database.clicks.on('child_added', function(snapshot) {
            console.log(snapshot.val());
          });
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
            , avatar = _g.state.avatar
            , avatarTexture = PIXI.Texture.fromImage("images/testAvatar.png")
            , stage = _g.state.stage;

          avatar.go = new PIXI.Sprite(avatarTexture);

          avatar.go.position.x = 400;
          avatar.go.position.y = 300;

          avatar.go.scale.x = 0.5;
          avatar.go.scale.y = 0.5;

          stage.addChild(avatar.go);
        }
      , setupHandlers: function () {
          var _g = this
            , stage = _g.state.stage;
          stage.mousedown = HANDLE.clickOnStage.bind(_g);
        }
      , render: function () {
          var _g = this;
          _g.simulate.bind(_g);
          _g.state.renderer.render(_g.state.stage);
          requestAnimationFrame(_g.render.bind(_g));
        }
      , simulate: function () {
          var _g = this;
          _g.state.avatar.go.rotation += 0.1;
        }
      };

    window.G = G;
    return G;
  });
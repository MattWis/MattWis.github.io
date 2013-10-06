define(['zepto', 'pixi', 'handleEventPerformer'], function ($, PIXI, HANDLE_EVENT) {
  var G = {
    state: {
      database: {
        avatars: null
      ,	myAvatar: null
      ,	attacks: null
      }
    , renderer: null
    , stage: null
    , textures: {
        avatar: null
      , attack: null
      }
    , avatarCount: 0
    , avatars: {
      //, audience_member: {
            //go: null
          //, index: 0
        //}
      }
    , attackCount: 0
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
        database.attacks = new Firebase('https://olinhackmit.firebaseIO.com/attacks');
        database.attacks.remove();
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

        textures.avatar = PIXI.Texture.fromImage("images/avatar2.png");
        textures.attack = PIXI.Texture.fromImage("images/attack.png");
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
    , defaultAvatar: function(texture) {
        var _g = this
          , stage = _g.state.stage
          , avatar = {};

        avatar.go = new PIXI.Sprite(texture);

        avatar.go.position.x = 400;
        avatar.go.position.y = 300;

        avatar.go.pivot.y = texture.height / 2;
        avatar.go.pivot.x = texture.width / 2;

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
    , defaultAttack: function(textures, attacker) {
        var _g = this
          , stage = _g.state.stage
          , attack = {}
          , width = textures.avatar.width
          , rotation = attacker.go.rotation;

        attack.go = new PIXI.Sprite(textures.attack);

        attack.go.position.x = attacker.go.position.x + width * Math.sin(rotation);
        attack.go.position.y = attacker.go.position.y - width * Math.cos(rotation);
        attack.go.rotation = rotation;

        attack.go.scale.x = 1;
        attack.go.scale.y = 1;

        stage.addChild(attack.go);

        return attack;
    }
    , addAttack: function(attackID, attack) {
        var _g = this
          , textures = _g.state.textures
          , attacker = _g.state.avatars[attack.attacker]
          , attacks = _g.attacks;

        attack = _g.defaultAttack(textures, attacker);

        attack.index = _g.state.attackCount;
        _g.state.attackCount += 1;
        attacks[id] = attack;

        console.log(attacks);
      }
    }

  window.G = G;
  return G;
});

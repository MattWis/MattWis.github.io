define(['zepto', 'pixi', 'vr', 'handleEventPerformer', 'timer', 'helpers'], function ($, PIXI, vr, HANDLE_EVENT, TIMER, HELPERS) {
  var G = {
    state: {
      database: {
        avatars: null
      ,	myAvatar: null
      ,	attacks: null
      }
    , renderer: null
    , stage: null
    , screensize : {
        w: document.width
      , h: document.height
    }
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
    , counters: {
      shotsFired: 0
    , vr: {
        vrState: null
    }
    , attackCount: 0
    , attacks: {
      }
    , sprites: {

    }
    , performer: {
        center: null
        , legs: []
      }
    }
  , init: function () {
        var _g = this;

        _g.state.screensize.h = HELPERS.getDimensions().height;
        _g.state.screensize.w = HELPERS.getDimensions().width;

        _g.setupGraphics.bind(_g)();
        _g.setupObjects.bind(_g)();
        _g.setupDBConnection.bind(_g)();
        HANDLE_EVENT.setupDBCallbacks.bind(_g)();
        _g.setupHandlers.bind(_g)();
        _g.state.vr.vrState = new vr.State();

        vr.load(function(error) {
          if (error) {
            window.alert('VR error:\n' + error.toString());
            }
        });

        requestAnimationFrame(_g.render.bind(_g));
        vr.requestAnimationFrame(_g.tick.bind(_g));
      }
    , setupDBConnection: function () {
        var _g = this
          , database = _g.state.database;
        database.avatars = new Firebase('https://olinhackmit.firebaseIO.com/avatars');
        database.attacks = new Firebase('https://olinhackmit.firebaseIO.com/attacks');
      }
    , setupGraphics: function () {
        var _g = this
          , height = _g.state.screensize.h
          , width = _g.state.screensize.w
          , renderer = new PIXI.autoDetectRenderer(width, height)
          , stage = new PIXI.Stage(0xFFCCCC, true);

        renderer.view.style.display = "block";
        document.body.appendChild(renderer.view);

        _g.state.renderer = renderer;
        _g.state.stage = stage;
      }
    , setupObjects: function () {
        var _g = this
          , textures = _g.state.textures
          , avatar = _g.state.avatar
          , screensize = _g.state.screensize
          , performer = _g.state.performer
          , stage = _g.state.stage
          , sprites =  _g.state.sprites
          , size = _g.state.screensize;

        textures.avatar = PIXI.Texture.fromImage("images/avatar2.png");
        textures.attack = PIXI.Texture.fromImage("images/attack.png");
        textures.center = PIXI.Texture.fromImage("images/center.png");
        textures.leg = PIXI.Texture.fromImage("images/leg.png");
        textures.start = PIXI.Texture.fromImage("images/startButton.png");

        sprites.start = new PIXI.Sprite(textures.start);
        sprites.start.setInteractive(true);
        sprites.start.position.x = size.w/2.0;
        sprites.start.position.y = size.h/2.0;
        sprites.start.initialScale = {x: .75, y: .75};
        sprites.start.hoverIncrease = .02;
        sprites.start.scale.x = .5;
        sprites.start.scale.y = .5;
        sprites.start.pivot.x = 250;
        sprites.start.pivot.y = 250;
        sprites.start.visible = true;

        sprites.start.click = function(e) {
          sprites.start.visible = false;
          TIMER.start();
        }

        stage.addChild(sprites.start);

        var center = new PIXI.Sprite(textures.center);

        center.position.x = screensize.w / 2;
        center.position.y = screensize.h / 2;

        center.pivot.x = 10;
        center.pivot.y = 10;

        center.scale.x = 1;
        center.scale.y = 1;

        stage.addChild(center);
        performer.center = center;

        function createLeg(rotation) {
          var leg = new PIXI.Sprite(textures.leg);
          leg.position.x = screensize.w / 2;
          leg.position.y = screensize.h / 2;

          leg.pivot.x = 0;
          leg.pivot.y = 0;

          leg.scale.x = 2;
          leg.scale.y = 2;

          leg.rotation = rotation;

          stage.addChild(leg);
          performer.legs.push(leg);
        }

        createLeg(Math.PI/2);
        createLeg(-Math.PI/2);
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
        requestAnimationFrame(_g.allAttacksAnimationHandler.bind(_g));
        vr.requestAnimationFrame(_g.tick.bind(_g));
      }
    , simulate: function () {
        var _g = this;
      }
    , defaultAvatar: function (texture) {
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
          , width = textures.avatar.width
          , height = textures.avatar.height
          , avatar;

        avatar = _g.defaultAvatar(textures.avatar);

        console.log(avatarData);
        avatar.index = _g.state.avatarCount;
        var angle = avatarData.angle;
        console.log(angle);
        avatar.go.rotation = 2*Math.PI - angle;
        avatar.go.position.x = _g.state.screensize.w/2 + 200 * Math.sin(angle);
        avatar.go.position.y = _g.state.screensize.h/2 + 200 * Math.cos(angle);
        console.log(avatar.go.position);
        _g.state.avatarCount += 1;
        avatars[id] = avatar;

    }
    , defaultAttack: function (textures, attacker) {
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

        attack.lastUpdated = (new Date()).getTime();
        attack.velocity = {x: 0, y: 0};
        var velScale = 1;
        attack.velocity.x = Math.sin(rotation)*velScale;
        attack.velocity.y = -Math.cos(rotation)*velScale;

        stage.addChild(attack.go);

        return attack;
    }
    , addAttack: function (attackID, attack) {
        var _g = this
          , textures = _g.state.textures
          , attacker = _g.state.avatars[attack.attacker]
          , attacks = _g.state.attacks;

        attack = _g.defaultAttack(textures, attacker);

        attack.index = _g.state.attackCount;
        _g.state.attackCount += 1;
        attacks[attackID] = attack;
      }
    , allAttacksAnimationHandler: function () {
        var _g = this
          , attacks = _g.state.attacks
          , keysToBeKilled = [];


        for (var attackKey in attacks) {
          if (attacks.hasOwnProperty(attackKey)) {
            var maybeAttack = _g.attackAnimationHandler.bind(_g)(attackKey, attacks);
            if (maybeAttack) {
              keysToBeKilled.push(maybeAttack);
            }
          }
        }

        while (keysToBeKilled.length > 0) {
          var key = keysToBeKilled.pop()
            , nullObj = {};

          nullObj[key] = null;
          _g.state.database.attacks.update(nullObj);
        }
      }
    , attackAnimationHandler: function (attackKey, attacks) {
        var _g = this
          , attack = attacks[attackKey]
          , velocity = attack.velocity
          , min_x = 0
          , max_x = _g.state.screensize.w
          , min_y = 0
          , max_y = _g.state.screensize.w
          , timeDelta = (new Date()).getTime() - attack.lastUpdated;
          //, distance = velocity * timeDelta;

        attack.go.rotation = Math.atan2(velocity.y, velocity.x) - Math.PI/2;

        //attack.go.rotation = 0;
        //attack.velocity = {x: 0, y: 0};
        attack.go.position.x += velocity.x * timeDelta;
        attack.go.position.y += velocity.y * timeDelta;
        //attack.go.position.x += distance * Math.sin(rotation);
        //attack.go.position.y -= distance * Math.cos(rotation);
        var x = attack.go.position.x
          , y = attack.go.position.y;

        attack.lastUpdated = (new Date()).getTime();
        if (x < min_x || x > max_x || y < min_y || y > max_y) {
          return attackKey
        }

      }

      , tick: function () {
          var _g = this
            , state = _g.state.vr.vrState;
          
          if (!vr.pollState(_g.state.vr.vrState)) {
          }

          if (_g.state.vr.vrState.sixense.present) {
            for (var n = 0; n < state.sixense.controllers.length; n++) {
              var controller = state.sixense.controllers[n];
              var cx = controller.position[0];

              var cy = controller.position[2];
              var angle = Math.atan2(cy, cx);
              _g.state.performer.legs[n].rotation = angle;
            }
          }


      }

    }

  window.G = G;
  return G;
});

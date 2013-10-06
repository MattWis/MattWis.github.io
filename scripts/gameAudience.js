define(['zepto', 'pixi', 'input/handleInputAudience', 'helpers'], function ($, PIXI, HANDLE_INPUT, HELPERS) {

    var G = {
      state: {
        database: {
          avatars: null
        , myAvatar: null
        , attacks: null
        , myID: null
        }
      , renderer: null
      , stage: null
      , screensize : {
          w: null
        , h: null
      }
      , textures: {
          avatar: null
        }
      , avatars: {
      //client: {
          //go: null
        //, pos: {x: 0, y: 0}
				//}
				}
      , sprites: {
          charges: []
        }
      }
    , init: function () {
          var _g = this;

          _g.state.screensize.h = HELPERS.getDimensions().height;
          _g.state.screensize.w = HELPERS.getDimensions().width;

          _g.setupGraphics.bind(_g)();
          _g.setupObjects.bind(_g)();
          _g.setupDBConnection.bind(_g)();
          _g.setupHandlers.bind(_g)();

          requestAnimationFrame(_g.render.bind(_g));
        }
      , setupDBConnection: function () {
          var _g = this
            , database = _g.state.database;
          database.avatars = new Firebase('https://olinhackmit.firebaseIO.com/avatars');
          database.myAvatar = database.avatars.push({joined: (new Date()).toJSON()});
          database.myAvatar.onDisconnect().remove();
          database.attacks = new Firebase('https://olinhackmit.firebaseIO.com/attacks');

          var pathArray = database.myAvatar.path.m;
          database.myID = pathArray[pathArray.length - 1];
        }
      , setupGraphics: function () {
          var _g = this
            , height = _g.state.screensize.h
            , width = _g.state.screensize.w
            , renderer = new PIXI.autoDetectRenderer(width, height)
            , stage = new PIXI.Stage(0xEEEEEE, true);

          renderer.view.style.display = "block";
          document.body.appendChild(renderer.view);

          _g.state.renderer = renderer;
          _g.state.stage = stage;
        }
      , setupObjects: function () {
          var _g = this
					  , textures = _g.state.textures
            , stage = _g.state.stage
            , sprites = _g.state.sprites
            , size = _g.state.screensize;

          textures.button = PIXI.Texture.fromImage("images/fireButton.png");
          textures.charge = PIXI.Texture.fromImage("images/circleFraction.png");

          sprites.button = new PIXI.Sprite(textures.button);
          sprites.button.setInteractive(true);
          sprites.button.position.x = size.w/2.0;
          sprites.button.position.y = size.h/2.0;
          sprites.button.initialScale = {x: .75, y: .75};
          sprites.button.hoverIncrease = .02;
          sprites.button.scale.x = .75;
          sprites.button.scale.y = .75;
          sprites.button.pivot.x = 250;
          sprites.button.pivot.y = 250;
          sprites.button.visible = true;
          sprites.button.clicked = false;
          sprites.button.chargeTime = 500;

          sprites.button.click = function(e) {
            if (!sprites.button.clicked && ! sprites.button.charging) {
              sprites.button.clicked = true;
              sprites.button.lastClicked = (new Date()).getTime();
              sprites.button.canFire = false;
              console.log("Fired");     
            }
          }

          sprites.button.mouseover = function(e) {
            sprites.button.hover = true;
          }

          sprites.button.mouseout = function(e) {
            sprites.button.hover = false;
          }

          sprites.button.addCharges = function() {
            for (var i=0; i<100; i++) {
              var charge = new PIXI.Sprite(textures.charge);
              charge.position.x = size.w/2.0;
              charge.position.y = size.h/2.0;
              charge.initialScale = {x: .75, y: .75};
              charge.hoverIncrease = .02;
              charge.scale.x = .75;
              charge.scale.y = .75;
              charge.pivot.x = 250;
              charge.pivot.y = 250;
              charge.rotation = i*Math.PI*2/100;
              charge.visible = true;
              sprites.charges.push(charge);
              stage.addChild(charge);
            }
          }

          sprites.button.animationHandler = function() {
            var button = sprites.button;
            var charges = sprites.charges;
            if (button.clicked) {
              var delta = (new Date()).getTime() - sprites.button.lastClicked
                , execTime = 250
                , scaleFactor = 800;

              if (delta <= execTime) {
                button.scale.x = button.initialScale.x + (execTime/2 - Math.abs(delta - execTime/2))/scaleFactor;
                button.scale.y = button.initialScale.y + (execTime/2 - Math.abs(delta - execTime/2))/scaleFactor;
                for (var i = 0; i < charges.length; i++) {
                  charge = charges[i];
                  charge.visible = false;
                  charge.scale.x = charge.initialScale.x + (execTime/2 - Math.abs(delta - execTime/2))/scaleFactor;
                  charge.scale.y = charge.initialScale.y + (execTime/2 - Math.abs(delta - execTime/2))/scaleFactor;
                }
              } else {
                button.clicked = false;
                button.charging = true;
                button.startedCharging = (new Date()).getTime();
              }
            } else if (button.charging) {
              var delta = (new Date()).getTime() - button.startedCharging;
              if (delta <= button.chargeTime) {
                var angle = delta/button.chargeTime*2*Math.PI;
                for (var i = 0; i < charges.length; i++) {
                  var charge = charges[i];
                  if (i*Math.PI*2/100 < angle) {
                    charge.visible = true;
                  } else {
                    charge.visible = false;
                  }
                }
              } else {
                button.charging = false;
                button.canFire = true;
                for (var i = 0; i<charges.length; i++) {
                  var charge = charges[i];
                  charge.visible = true;
                }
              }
            } else if (button.hover) {
              button.scale.x = button.initialScale.x + button.hoverIncrease;
              button.scale.y = button.initialScale.y + button.hoverIncrease;
              for (var i = 0; i < charges.length; i++) {
                var charge = charges[i];
                charge.scale.x = charge.initialScale.x + button.hoverIncrease;
                charge.scale.y = charge.initialScale.y + button.hoverIncrease;
              }
            } else {
              button.scale.x = button.initialScale.x;
              button.scale.y = button.initialScale.y;
              for (var i = 0; i < charges.length; i++) {
                var charge = charges[i];
                charge.scale.x = charge.initialScale.x;
                charge.scale.y = charge.initialScale.y;
              }
            }
          }

          sprites.button.addCharges();
          stage.addChild(sprites.button);
        }

      , setupHandlers: function () {
          var _g = this
            , stage = _g.state.stage;
          stage.mousedown = HANDLE_INPUT.clickOnStage.bind(_g);
        }
      , render: function () {
          var _g = this;
          _g.simulate.bind(_g)();
          _g.state.renderer.render(_g.state.stage);
          requestAnimationFrame(_g.render.bind(_g));
          requestAnimationFrame(_g.state.sprites.button.animationHandler);
        }
      , simulate: function () {
          var _g = this;
        }
      }

    window.G = G;
    return G;
  });

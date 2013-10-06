define(['zepto', 'pixi', 'input/handleInputAudience'], function ($, PIXI, HANDLE_INPUT) {

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
          w: document.width
        , h: document.height
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
          database.avatars = new Firebase('https://olinhackmit.firebaseIO.com/avatars');
          database.myAvatar = database.avatars.push({joined: (new Date()).toJSON()});
          database.attacks = new Firebase('https://olinhackmit.firebaseIO.com/attacks');

          var pathArray = database.myAvatar.path.m;
          database.myID = pathArray[pathArray.length - 1];
        }
      , setupGraphics: function () {
          var _g = this
            , renderer = new PIXI.autoDetectRenderer(document.width, document.height)
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
          sprites.button.clicked = false;
          sprites.button.click = function(e) {
            sprites.button.clicked = true;
            sprites.button.lastClicked = (new Date()).getTime();
            console.log("Fired");
          }

          sprites.button.mouseover = function(e) {
            sprites.button.hover = true;
          }

          sprites.button.mouseout = function(e) {
            sprites.button.hover = false;
          }

          sprites.button.animationHandler = function() {
            var button = sprites.button;
            var charge = sprites.charge;
            if (button.clicked) {
              var delta = (new Date()).getTime() - sprites.button.lastClicked
                , execTime = 250
                , scaleFactor = 800;
              if (delta <= execTime) {
                console.log()
                button.scale.x = button.initialScale.x + (execTime/2 - Math.abs(delta - execTime/2))/scaleFactor;
                button.scale.y = button.initialScale.y + (execTime/2 - Math.abs(delta - execTime/2))/scaleFactor;
                charge.scale.x = charge.initialScale.x + (execTime/2 - Math.abs(delta - execTime/2))/scaleFactor;
                charge.scale.y = charge.initialScale.y + (execTime/2 - Math.abs(delta - execTime/2))/scaleFactor;
              } else {
                button.clicked = false;
              }
            } else if (button.hover) {
              button.scale.x = button.initialScale.x + button.hoverIncrease;
              button.scale.y = button.initialScale.y + button.hoverIncrease;
              charge.scale.x = charge.initialScale.x + button.hoverIncrease;
              charge.scale.y = charge.initialScale.y + button.hoverIncrease;

            } else {
              button.scale.x = button.initialScale.x;
              button.scale.y = button.initialScale.y;
              charge.scale.x = charge.initialScale.x;
              charge.scale.y = charge.initialScale.y;
            }
          }

          stage.addChild(sprites.button);

          sprites.charge = new PIXI.Sprite(textures.charge);
          sprites.charge.setInteractive(true);
          sprites.charge.position.x = size.w/2.0;
          sprites.charge.position.y = size.h/2.0;
          sprites.charge.initialScale = {x: .75, y: .75};
          sprites.charge.hoverIncrease = .02;
          sprites.charge.scale.x = .75;
          sprites.charge.scale.y = .75;
          sprites.charge.pivot.x = 250;
          sprites.charge.pivot.y = 250;

          sprites.charge.animationHandler = function() {
            var charge = sprites.charge;
          }

          console.log(sprites.charge);
          stage.addChild(sprites.charge);
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

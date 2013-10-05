define(['zepto', 'pixi'], function ($, PIXI) {

    var G = {
      state: {
        renderer: null
      , stage: null
      }
    , init: function () {
					var positions = new Firebase('https://olinhackmit.firebaseIO.com/positions');
					var myPosition = positions.push();
					myPosition.set({x: 0, y: 0});

					positions.on('value', function(snapshot) {
						var data = snapshot.val();
						for (var client in data) {
          		if (data.hasOwnProperty(client)) {
								_g.avatar.position.x = data[client].x;
								_g.avatar.position.y = data[client].y;
							}
						}
					});

          var _g = this
            , renderer = new PIXI.autoDetectRenderer(800, 600)
            , stage = new PIXI.Stage(0x66FF99, true)
            , avatarTexture = PIXI.Texture.fromImage("images/testAvatar.png")
            , geo = PIXI.Graphics();

          renderer.view.style.display = "block";
          document.body.appendChild(renderer.view);

          stage.mousedown = function (e) {
            _g.avatar.position = e.global.clone();
          }

					stage.mousemove = function (e) {
						myPosition.set({ x: e.originalEvent.pageX, y: e.originalEvent.pageY });
					}

          _g.avatar = new PIXI.Sprite(avatarTexture);

          _g.avatar.position.x = 400;
          _g.avatar.position.y = 300;

          _g.avatar.scale.x = 0.5;
          _g.avatar.scale.y = 0.5;

          stage.addChild(_g.avatar);

          requestAnimationFrame(_g.animate.bind(_g));

          _g.state.renderer = renderer;
          _g.state.stage = stage;
        }
      , animate: function () {
          var _g = this;
          _g.avatar.rotation += 0.1;
          _g.state.renderer.render(_g.state.stage);
          requestAnimationFrame(_g.animate.bind(_g));
        }
      };

    window.G = G;
    return G;
  });
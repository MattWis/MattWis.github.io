"use strict";

require.config({
	paths: {
		zepto: '3rdparty/zepto.min',
		pixi: '3rdparty/pixi',
	},
	shim: {
		zepto: {
			exports: '$'
		},
		pixi: {
			exports: 'PIXI'
		}
	}
});

require(['domReady!', 'gameAudience'], function(_, G) {
  G.init();
});

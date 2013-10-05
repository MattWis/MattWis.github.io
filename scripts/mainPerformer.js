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

require(['domReady!', 'gamePerformer'], function(_, G) {
  G.init();
});

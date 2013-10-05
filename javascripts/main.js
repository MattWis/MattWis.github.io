"use strict";

require.config({
	paths: {
		zepto: 'zepto.min',
		pixi: 'pixi',
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

require(['domReady!', 'game'], function(_, G) {
  G.init();
});


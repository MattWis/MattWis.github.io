"use strict";

require.config({
	paths: {
		zepto: '3rdparty/zepto.min',
		pixi: '3rdparty/pixi',
		vr: '3rdparty/vr'
	},
	shim: {
		zepto: {
			exports: '$'
		},
		pixi: {
			exports: 'PIXI'
		},
		vr: {
			exports: 'vr'
		}
	}
});

require(['domReady!', 'gamePerformer'], function(_, G) {
  window.console = {log: function() {return true;}};
  G.init();
});

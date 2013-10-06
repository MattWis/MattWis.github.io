define([], function () {
  var G = {
    getDimensions: function () {
      //http://stackoverflow.com/questions/3437786/how-to-get-web-page-size-browser-window-size-screen-size-in-a-cross-browser-wa
      var w = window
        , d = document
        , e = d.documentElement
        , g = d.getElementsByTagName('body')[0]
        , x = w.innerWidth || e.clientWidth || g.clientWidth
        , y = w.innerHeight|| e.clientHeight|| g.clientHeight;
      return {width: x, height: y};
    }
  }

  return G;
});

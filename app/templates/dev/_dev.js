(function($) {
  "use strict";

  $(document).ready(function() {

    var script_config = document.createElement('script');
    script_config.setAttribute('type', 'text/javascript');
    script_config.setAttribute('src', '../config.js');
    script_config.onload = function() {
      requirejs.config({ baseUrl: '../' });
      require(['mockup-bundles-<%= _.slugify(packageName) %>']);
    };

    var script_require = document.createElement('script');
    script_require.setAttribute('type', 'text/javascript');
    script_require.setAttribute('src', '../node_modules/requirejs/require.js');
    script_require.onload = function() {
      document.getElementsByTagName("head")[0].appendChild(script_config);
    };
    document.getElementsByTagName("head")[0].appendChild(script_require);

    /* Uncoment the following if you need to use 'less'
    var style1 = document.createElement('style');
    style1.setAttribute('type', 'text/less');
    style1.innerHTML = '@import (less) "../less/bundle.less"; @isBrowser: true; @pathPrefix: \'../less/\';';
    document.getElementsByTagName("head")[0].appendChild(style1);

    var script_less = document.createElement('script');
    script_less.setAttribute('type', 'text/javascript');
    script_less.setAttribute('src', '../node_modules/grunt-contrib-less/node_modules/less/dist/less-1.4.1.js');
    document.getElementsByTagName("head")[0].appendChild(script_less);
    */
  });

}(jQuery));

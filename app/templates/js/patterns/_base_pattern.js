
define([
  'jquery',
  'mockup-patterns-base'
], function($, Base) {
  "use strict";

  var <%= patternName %>Pattern = Base.extend({
    // The name for this pattern
    name: "<%= _.slugify(patternName) %>",

    defaults: {
      // Default values for attributes
    },

    init: function() {
      // The init code for your pattern goes here
      
    }
  });

  return <%= patternName %>Pattern;

});

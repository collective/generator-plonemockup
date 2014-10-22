
define([
  'jquery',
  'mockup-registry',
  'mockup-patterns-base',
//   Uncomment the line below to include all patterns from plone-mockup
//   'mockup-bundles-widgets',
//   <!~~ Add patterns below this line ~~!>
  '<%= _.slugify(packageName) %>-patterns-<%= _.slugify(patternName) %>'
], function($, Registry, Base) {
  'use strict';

  var <%= packageName %>Bundle = Base.extend({
    name: 'mockup-bundles-<%= _.slugify(packageName) %>',
    init: function() {
      var self = this;
    }
  });

  // initialize only if we are in top frame
  if (window.parent === window) {
    $(document).ready(function() {
      $('body').addClass('pat-<%= _.slugify(packageName) %>-bundle');
      Registry.scan($('body'));
    });
  }

  return <%= packageName %>Bundle;
});

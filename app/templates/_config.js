(function() {

var requirejsOptions = {
  baseUrl: './',
  wrap: true,
  almond: true,
  paths: {
    'jquery': 'bower_components/jquery/jquery',
    'jquery.form': 'bower_components/jquery-form/jquery.form',
    'jquery.cookie': 'bower_components/jquery.cookie/jquery.cookie',
    'underscore': 'bower_components/underscore/underscore',
    'backbone': 'bower_components/backbone/backbone',
    'select2': 'bower_components/select2/select2',
    'tinymce': 'bower_components/plone-mockup/lib/tinymce/tinymce.min',
    'chai': 'bower_components/chai/chai',
    'sinon': 'bower_components/plone-mockup/lib/sinon',
    'picker': 'bower_components/pickadate/lib/picker',
    'picker.date': 'bower_components/pickadate/lib/picker.date',
    'picker.time': 'bower_components/pickadate/lib/picker.time',
    'jquery.event.drag': 'bower_components/plone-mockup/lib/jquery.event.drag',
    'jquery.event.drop': 'bower_components/plone-mockup/lib/jquery.event.drop',
    'dropzone': "bower_components/plone-mockup/lib/dropzone/downloads/dropzone-amd-module",
    'mockup-docsapp': 'bower_components/plone-mockup/js/docsapp',
    'mockup-fakeserver': 'bower_components/plone-mockup/tests/fakeserver',
    'mockup-registry': 'bower_components/plone-mockup/js/registry',
    'mockup-iframe': 'bower_components/plone-mockup/js/iframe',
    'mockup-iframe_init': 'bower_components/plone-mockup/js/iframe_init',
    'mockup-patterns-accessibility': 'bower_components/plone-mockup/js/patterns/accessibility',
    'mockup-patterns-autotoc': 'bower_components/plone-mockup/js/patterns/autotoc',
    'mockup-patterns-backdrop': 'bower_components/plone-mockup/js/patterns/backdrop',
    'mockup-patterns-base': 'bower_components/plone-mockup/js/patterns/base',
    'mockup-patterns-cookiedirective': 'bower_components/plone-mockup/js/patterns/cookiedirective',
    'mockup-patterns-expose': 'bower_components/plone-mockup/js/patterns/expose',
    'mockup-patterns-formautofocus': 'bower_components/plone-mockup/js/patterns/formautofocus',
    'mockup-patterns-formunloadalert': 'bower_components/plone-mockup/js/patterns/formunloadalert',
    'mockup-patterns-livesearch': 'bower_components/plone-mockup/js/patterns/livesearch',
    'mockup-patterns-modal': 'bower_components/plone-mockup/js/patterns/modal',
    'mockup-patterns-pickadate': 'bower_components/plone-mockup/js/patterns/pickadate',
    'mockup-patterns-picture': 'bower_components/plone-mockup/js/patterns/picture',
    'mockup-patterns-preventdoublesubmit': 'bower_components/plone-mockup/js/patterns/preventdoublesubmit',
    'mockup-patterns-relateditems': 'bower_components/plone-mockup/js/patterns/relateditems',
    'mockup-patterns-queryhelper': 'bower_components/plone-mockup/js/patterns/queryhelper',
    'mockup-patterns-querystring': 'bower_components/plone-mockup/js/patterns/querystring',
    'mockup-patterns-select2': 'bower_components/plone-mockup/js/patterns/select2',
    'mockup-patterns-tablesorter': 'bower_components/plone-mockup/js/patterns/tablesorter',
    'mockup-patterns-tinymce': 'bower_components/plone-mockup/js/patterns/tinymce',
    'mockup-patterns-toggle': 'bower_components/plone-mockup/js/patterns/toggle',
    'mockup-patterns-tooltip': 'bower_components/plone-mockup/js/patterns/tooltip',
    'mockup-patterns-dropzone': 'bower_components/plone-mockup/js/patterns/dropzone',
    'mockup-bundles-widgets': 'bower_components/plone-mockup/js/bundles/widgets',
    'mockup-bundles-toolbar': 'bower_components/plone-mockup/js/bundles/toolbar',
    'mockup-bundles-tiles': 'bower_components/plone-mockup/js/bundles/widgets',
    '<%= _.slugify(packageName) %>-bundles-widgets': 'js/bundles/widgets',
    '<%= _.slugify(packageName) %>-patterns-<%= _.slugify(patternName) %>': 'js/patterns/<%= _.slugify(patternName) %>'
  },
  shim: {
    'underscore': { exports: 'window._' },
    'backbone': { exports: 'window.Backbone' },
    'picker.date': { deps: [ 'picker' ] },
    'picker.time': { deps: [ 'picker' ] },
    'sinon': { exports: 'window.sinon' },
    'sinon-fakexmlhttprequest': { exports: 'window.sinon',  deps: [ 'sinon' ] },
    'sinon-fakeserver': {
      exports: 'window.sinon.fakeServer',
      deps: [ 'sinon', 'sinon-fakexmlhttprequest' ]
    },
    'sinon-faketimers': {
      exports: 'window.sinon.useFakeTimers',
      deps: [ 'sinon', 'sinon-fakexmlhttprequest' ]
    },
    'tinymce': {
      exports: 'window.tinyMCE',
      init: function () {
        this.tinyMCE.DOM.events.domLoaded = true;
        return this.tinyMCE;
      }
    }
  }
};

if (typeof exports !== "undefined" && typeof module !== "undefined") {
  module.exports = requirejsOptions;
}
if (typeof requirejs !== "undefined" && requirejs.config) {
  requirejs.config(requirejsOptions);
}

}());

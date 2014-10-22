'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var ustring = require('underscore.string');


var PlonemockupGenerator = module.exports = function PlonemockupGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PlonemockupGenerator, yeoman.generators.Base);

PlonemockupGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'packageName',
    message: 'Choose a name for your project'
  },
  {
    name: 'packageVersion',
    message: 'Enter the package version (Default: 0.0.1)',
    default: "0.0.1"
  },  
  {
    name: 'packageDescription',
    message: 'Enter here the description for your project (default: "")',
    default: ""
  },
  {
    name: 'packageHomePage',
    message: 'Enter here the homepage for your project (default: "")',
    default: ""
  },
  {
    name: 'packageRepository',
    message: 'Enter here repositry for your project (default: https://github.com/collective/{packageName})',
    default: null
  },  
  {
    name: 'authorName',
    message: 'Enter the author\'s full name'
  },
  {
    name: 'authorEmail',
    message: 'Enter the author\'s email address'
  },
  {
    name: 'authorUrl',
    message: 'Enter the author\'s web page (default: "")',
    default: ""
  },
  {
    name: 'packageLicense',
    message: 'Choose a license for your project (GPLv2/GPLv3/MIT)',
    default: "GPLv2"
  },
  {
    name: 'patternName',
    message: 'Choose a name for your pattern'
  }

  ];

  this.prompt(prompts, function (props) {
    this.packageName = props.packageName;
    var version = props.packageVersion;
    while (version.split('.').length < 3){
      version += ".0";
    }
    if (version.split('.').length > 3){
      version = version.split('.').splice(0,3).join('.');
    }
    this.packageVersion = version;
    this.packageDescription = props.packageDescription;
    this.packageHomePage = props.packageHomePage;

    if ( !props.packageRepository ){
      this.packageRepository = "https://github.com/collective/"+this.packageName;
    }
    else {
      this.packageRepository = props.packageRepository;
    }

    this.authorName = props.authorName;
    this.authorEmail = props.authorEmail;
    this.authorUrl = props.authorUrl;
    
    this.packageLicense = props.packageLicense;
    
    if (this.packageLicense == "GPLv2"){
      this.licenseURL = "http://opensource.org/licenses/GPL-2.0";
    }
    else if (this.packageLicense == "GPLv3"){
      this.licenseURL = "http://opensource.org/licenses/GPL-3.0";
    }
    else if (this.packageLicense == "MIT"){
      this.licenseURL = "http://opensource.org/licenses/MIT";
    }
    else {
      this.licenseURL = "http://opensource.org/licenses/"+this.packageLicense;
    }
    
    this.patternName = props.patternName;

    cb();
  }.bind(this));
};

PlonemockupGenerator.prototype.app = function app() {
  this.mkdir('js');
  this.mkdir('js/bundles');
  this.mkdir('js/patterns');
  this.mkdir('less');
  this.mkdir('dev');
  this.mkdir('tests');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_config.js', 'config.js');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  this.template('_README.md', 'README.md');
  this.template('_Makefile', 'Makefile');
  
  this.template('js/bundles/_bundle.js', 'js/bundles/'+ustring.slugify(this.packageName)+'.js');
  this.template('js/patterns/_base_pattern.js', 'js/patterns/'+ustring.slugify(this.patternName)+'.js');

  this.template('less/_bundle.less', 'less/'+ustring.slugify(this.packageName)+'.less');

  this.template('dev/_dev.js', 'dev/dev.js');
  this.template('dev/_dev.html', 'dev/dev.html');

  this.template('tests/_config.js', 'tests/config.js');
  this.template('tests/_base_test.js', 'tests/pattern-'+ustring.slugify(this.patternName)+'-test.js');
};

PlonemockupGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

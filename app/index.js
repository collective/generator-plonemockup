'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


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
  }
  ];

  this.prompt(prompts, function (props) {
    this.packageName = props.packageName;
    this.packageVersion = props.packageVersion;
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
    
    

    cb();
  }.bind(this));
};

PlonemockupGenerator.prototype.app = function app() {
  this.mkdir('js');
  this.mkdir('js/bundles');
  this.mkdir('js/patterns');

  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
  this.template('_config.js', 'config.js');
  this.template('_Gruntfile.js', 'Gruntfile.js');
  
  this.template('js/bundles/_widgets.js', 'js/bundles/widgets.js');
};

PlonemockupGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

/***********************************************************************************************
 * User Configuration.
 **********************************************************************************************/
/** Map relative paths to URLs. */
const map: any = {
  'firebase': 'vendor/firebase/firebase.js',
  'angularfire2': 'vendor/angularfire2',
  '@angular2-material': 'vendor/@angular2-material',
  'angular2-modal': 'vendor/angular2-modal',
  'angular2-jwt': 'vendor/angular2-jwt'
};

/** User packages configuration. */
const packages: any = {
  angularfire2: {
    defaultExtension: 'js',
    main: 'angularfire2.js'
  },
  'angular2-modal': {
    defaultExtension: 'js',
    main: 'index.js'
  },
  'angular2-jwt': {
    main: 'angular2-jwt.js'
  }
};

const materialPkgs:string[] = [
  'core',
  'toolbar',
  'button',
  'card',
  'input',
  'sidenav',
  'icon'
];
materialPkgs.forEach((pkg) => {
  packages[`@angular2-material/${pkg}`] = {main: `${pkg}.js`};
});

////////////////////////////////////////////////////////////////////////////////////////////////
/***********************************************************************************************
 * Everything underneath this line is managed by the CLI.
 **********************************************************************************************/
const barrels: string[] = [
  // Angular specific barrels.
  '@angular/core',
  '@angular/common',
  '@angular/compiler',
  '@angular/http',
  '@angular/router',
  '@angular/router-deprecated',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  // New Forms
  '@angular/forms',
  // Thirdparty barrels.
  'rxjs',
  // App specific barrels.
  'app',
  'app/shared',
  'app/fire2',
  'app/obs/obs-baisc',
  'app/obs/wiki-search',
  'app/login',
  'app/material2/gestures',
  'app/material2/grid-list',
  'app/basics/hero-form',
  'app/basics/content-projection',
  'app/basics/content-projection/fancy-button',
  'app/mglish/word-list',
  'app/mglish/get-mword',
  'app/mglish/find-mword',
  'app/fire2/offline',
  'app/mglish/disp-mword',
  'app/fire2/storage',
  'app/basics/forms/custom-form',
  'app/basics/forms/template-driven',
  'app/basics/forms/template-driven-form',
  'app/basics/forms/model-driven-form',
  'app/login/profile',
  'app/login/reset-password',
  'app/login/signup',
  'app/obs/comments/comment-box',
  'app/obs/comments/comment-form',
  'app/obs/comments/comment-list',
  'app/basics/external-lib',
  'app/login/test/custom-login',
  'app/login/jwt',
  /** @cli-barrel */
];

const cliSystemConfigPackages: any = {};
barrels.forEach((barrelName: string) => {
  cliSystemConfigPackages[barrelName] = { main: 'index' };
});

/** Type declaration for ambient System. */
declare var System: any;

// Apply the CLI SystemJS configuration.
System.config({
  map: {
    '@angular': 'vendor/@angular',
    'rxjs': 'vendor/rxjs',
    'main': 'main.js'
  },
  packages: cliSystemConfigPackages
});

// Apply the user's configuration.
System.config({ map, packages });

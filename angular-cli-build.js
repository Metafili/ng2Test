/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/**/*.+(js|js.map)',
      'reflect-metadata/**/*.+(ts|js|js.map)',
      'rxjs/**/*.+(js|js.map)',
      // https://github.com/hansl/angular-cli/commit/84490ae0351f383deb19591e2de1c329df2d0d99
      // 'es6-shim/es6-shim.js',
      'core-js/client/shim.min.+(js|js.map)',
      '@angular/**/*.+(js|js.map)',
      // Angularfire2
      'firebase/*.+(js|js.map)',
      'angularfire2/**/*.+(js|js.map)',
      // Material2
      '@angular2-material/**/*.+(js|js.map)*',
      // Gestures
      'hammerjs/*.min.+(js|js.map)',
      // Modal
      'angular2-modal/**/*.+(ts|js|js.map)',
      // JWT & Auth0
      'angular2-jwt/**/*.+(js|js.map)',
      'auth0-lock/**/*.+(js|js.map)'
    ]
  });
};

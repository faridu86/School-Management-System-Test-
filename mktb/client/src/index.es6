'use strict';

import './imports.es6';

import loadingBarConfig from './config/LoadingBar.es6';
import uiNotificationConfig from './config/UiNotification.es6';

import admin from './admin/app.es6';
import academic from './academic/app.es6';

class mktpApp {
  constructor() {
    angular
    .module('mktb', ['admin', 'academic', 'angular-loading-bar', 'ui-notification'])
    .config(loadingBarConfig)
    .config(uiNotificationConfig)
  }
}

new mktpApp
'use strict';

import { components, controllers, factories, filters, services } from './imports.es6';
import routes from './routes.es6';

class AdminApp {
  constructor() {
  	angular
    .module('admin', ['ui.router', 'ui.bootstrap'])
    .config(routes)
    .controller('AdminCtrl', controllers.AdminCtrl)
    .run(($templateCache) => {
      $templateCache.put('./routes/admin.html', require('./routes/admin.html'));
    });
  }
}

new AdminApp
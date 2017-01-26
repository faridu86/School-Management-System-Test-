'use strict';

import { components, controllers, factories, filters, services } from './imports.es6';
import routes from './routes.es6';

class AdminApp {
  constructor() {
  	angular
    .module('admin', ['ui.router', 'ui.bootstrap'])
    .config(routes)
    .controller('AdminCtrl', controllers.AdminCtrl)
    .controller('TenantCtrl', controllers.TenantCtrl)
    .controller('InstitutionCtrl', controllers.InstitutionCtrl)
    .service('TenantService', services.Tenant)
    .run(($templateCache) => {
      $templateCache.put('./routes/admin.html', require('./routes/admin.html'));
      $templateCache.put('./routes/tenants/view.html', require('./routes/tenants/view.html'));
      $templateCache.put('./routes/tenants/modal.html', require('./routes/tenants/modal.html'));
      $templateCache.put('./routes/institutions/view.html', require('./routes/institutions/view.html'));
    });
  }
}

new AdminApp
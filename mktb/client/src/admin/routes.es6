'use strict';

let config = /*@ngInject*/ ($stateProvider, $sceProvider, $urlRouterProvider) => {
  $sceProvider.enabled(false);
  
  /** Medications routes **/
  $stateProvider
  .state('admin', {
    url: '/admin',
    templateUrl: './routes/admin.html',
    controller: 'AdminCtrl',
    controllerAs: 'adminCtrl',
  })
  .state('admin.tenants', {
    url: '/tenants',
    templateUrl: './routes/tenants/view.html',
    controller: 'TenantCtrl',
    controllerAs: 'tenantCtrl',
  })
  .state('admin.institutions', {
    url: '/institutions',
    templateUrl: './routes/institutions/view.html',
    controller: 'InstitutionCtrl',
    controllerAs: 'institutionCtrl',
  });

  $urlRouterProvider.otherwise('/');
}

export default config
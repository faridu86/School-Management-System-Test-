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
  });

  $urlRouterProvider.otherwise('/');
}

export default config
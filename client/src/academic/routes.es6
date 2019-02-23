'use strict';

let config = /*@ngInject*/ ($stateProvider, $sceProvider, $urlRouterProvider) => {
  $sceProvider.enabled(false);
  
  /** Medications routes **/
  $stateProvider
  .state('institutions', {
    url: '/institutions',
    templateUrl: './routes/institutions.html',
    controller: 'InstitutionsCtrl',
    controllerAs: 'ctrl',
  })
  .state('institution', {
    url: '/institution/:institution_id',
    templateUrl: './routes/institution/institution.html',
    controller: 'InstitutionCtrl',
    controllerAs: 'ctrl',
  });

  $urlRouterProvider.otherwise('/');
}

export default config
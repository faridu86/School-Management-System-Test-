'use strict';

let config = /*@ngInject*/ ($stateProvider, $sceProvider, $urlRouterProvider) => {
  $sceProvider.enabled(false);
  
  /** Medications routes **/
  $stateProvider
  .state('academic', {
    url: '/academic',
    templateUrl: './routes/academic.html',
    controller: 'AcademicCtrl',
    controllerAs: 'academicCtrl',
  });

  $urlRouterProvider.otherwise('/');
}

export default config
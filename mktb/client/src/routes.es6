'use strict';

let config = /*@ngInject*/ ($stateProvider, $sceProvider, $urlRouterProvider) => {
  $sceProvider.enabled(false);
  
  /** Medications routes **/
  $stateProvider
  .state('academic', {
    url: '/products',
    templateUrl: './html/products-view.html',
    controller: 'ShopCtrl',
    controllerAs: 'shopCtrl',
  });

  $urlRouterProvider.otherwise('/');
}

export default config
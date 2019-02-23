'use strict';

import { components, controllers, factories, filters, services } from './imports.es6';
import routes from './routes.es6';

class AcademicApp {
  constructor() {
  	angular
    .module('academic', ['ui.router', 'ui.bootstrap'])
    .config(routes)
    .controller('InstitutionsCtrl', controllers.InstitutionsCtrl)
    .controller('InstitutionCtrl', controllers.InstitutionCtrl)
    .service('InstitutionService', services.Institution)
    .run(($templateCache) => {
      $templateCache.put('./routes/institutions.html', require('./routes/institutions.html'));
      $templateCache.put('./routes/institution/institution.html', require('./routes/institution/institution.html'));
    });
  }
}

new AcademicApp
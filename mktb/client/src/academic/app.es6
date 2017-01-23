'use strict';

import { components, controllers, factories, filters, services } from './imports.es6';
import routes from './routes.es6';

class AcademicApp {
  constructor() {
  	angular
    .module('academic', ['ui.router', 'ui.bootstrap'])
    .config(routes)
    .controller('AcademicCtrl', controllers.AcademicCtrl)
    .run(($templateCache) => {
      $templateCache.put('./routes/academic.html', require('./routes/academic.html'));
    });
  }
}

new AcademicApp
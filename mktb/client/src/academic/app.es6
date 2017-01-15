'use strict';

import 'angular-ui-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { components, controllers, factories, filters, services } from './imports.es6';

class AcademicApp {
  constructor() {
    angular
    .module('wellness', ['ui.router', 'ui.bootstrap', 'infinite-scroll', 'common'])
    .controller('WellnessCtrl', controllers.WellnessCtrl)
    .run(($templateCache) => {
      $templateCache.put('./html/view.html', require('./html/view.html'));
    });
  }
}

new AcademicApp
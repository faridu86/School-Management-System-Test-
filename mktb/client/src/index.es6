'use strict';

import 'angular';
import 'angular-ui-router';

import _ from 'lodash';

import RoutesConfig from './routes.es6';

class mktp {
  constructor() {
    angular
    .module('mktp', ['academic'])
    .config(RoutesConfig);
  }
}

new mktp
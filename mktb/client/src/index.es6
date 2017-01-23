'use strict';

import 'angular';
import 'angular-ui-router';

import _ from 'lodash';

import academic from './academic/app.es6';

class mktpApp {
  constructor() {
    angular
    .module('mktb', ['academic'])
  }
}

new mktpApp
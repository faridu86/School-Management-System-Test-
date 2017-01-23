'use strict';

import 'angular';
import 'angular-ui-router';

import _ from 'lodash';

import admin from './admin/app.es6';
import academic from './academic/app.es6';

class mktpApp {
  constructor() {
    angular
    .module('mktb', ['admin', 'academic'])
  }
}

new mktpApp
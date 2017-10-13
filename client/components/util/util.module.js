'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('jeeonApp.util', [])
  .factory('Util', UtilService)
  .name;

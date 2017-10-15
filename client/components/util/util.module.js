'use strict';

import angular from 'angular';
import {
    UtilService
} from './util.service';

export default angular.module('jeeonApp.util', [])
    .factory('Util', UtilService)
    .filter('Truncate', function () {
        return function (text, length, end) {
            if (isNaN(length))
                length = 20;

            if (end === undefined)
                end = ".....";

            if (text.length <= length || text.length - end.length <= length) {
                return text;
            }
            else {
                return String(text).substring(0, length - end.length) + end;
            }

        };
    })
    .name;

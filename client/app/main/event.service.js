'use strict';
const angular = require('angular');

/*@ngInject*/
export function eventService($resource) {
    'ngInject';

    return $resource('/api/events/:id/:controller', {
        id: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}

export default angular.module('jeeonApp.eventService', [])
    .service('eventService', eventService)
    .name;

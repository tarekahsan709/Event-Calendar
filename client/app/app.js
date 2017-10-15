'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
import mwl_calendar from '../../node_modules/angular-bootstrap-calendar';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import event from './event/event.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import eventService from './event/event.service';


import './app.css';

angular.module('jeeonApp', [ngCookies, ngResource, ngSanitize, ngAnimate, 'btford.socket-io', uiRouter, uiBootstrap, mwl_calendar, eventService,
   navbar, footer, event, constants, socket, util
])
  .config(routeConfig)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next) {
    
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['jeeonApp'], {
      strictDi: true
    });
  });

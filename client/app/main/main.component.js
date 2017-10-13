import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  $http;
  socket;
  awesomeThings = [];
  newThing = '';

  /*@ngInject*/
  constructor($http, $scope, socket) {
    this.$http = $http;
    this.socket = socket;
      this.viewDate = new Date();

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.calendarView = 'month';
      this.events = [
          {
              title: 'My event title', // The title of the event
              startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
              endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
              color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
                  primary: '#e3bc08', // the primary event color (should be darker than secondary)
                  secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
              },
              actions: [{ // an array of actions that will be displayed next to the event title
                  label: '<i class=\'glyphicon glyphicon-pencil\'></i>', // the label of the action
                  cssClass: 'edit-action', // a CSS class that will be added to the action element so you can implement custom styling
                  onClick: function(args) { // the action that occurs when it is clicked. The first argument will be an object containing the parent event
                      console.log('Edit event', args.calendarEvent);
                  }
              }],
              draggable: true, //Allow an event to be dragged and dropped
              resizable: true, //Allow an event to be resizable
              incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
              recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
              cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
              allDay: false // set to true to display the event as an all day event on the day view
          }
      ];
    this.$http.get('/api/things')
      .then(response => {
        this.awesomeThings = response.data;
        this.socket.syncUpdates('thing', this.awesomeThings);
      });
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', {
        name: this.newThing
      });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

export default angular.module('jeeonApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;

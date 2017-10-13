import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
    $http;
    socket;
    awesomeThings = [];
    newThing = '';

    /*@ngInject*/
    constructor($http, $scope, socket, moment, calendarConfig) {
        this.$http = $http;
        this.moment = moment;
        this.calendarConfig = calendarConfig;
        this.socket = socket;
        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('thing');
        });
    }

    $onInit() {
        //These variables MUST be set as a minimum for the calendar to work
        this.calendarView = 'month';
        this.viewDate = new Date();
        var actions = [{
            label: '<i class=\'glyphicon glyphicon-pencil\'>edif</i>',
            onClick: function (args) {
                alert('actions 1');
                alert.show('Edited', args.calendarEvent);
            }
        }, {
            label: '<i class=\'glyphicon glyphicon-remove\'>remove</i>',
            onClick: function (args) {
                alert('actions 2');
                alert.show('Deleted', args.calendarEvent);
            }
        }];
        this.events = [
            {
                title: 'An event',
                color: this.calendarConfig.colorTypes.warning,
                startsAt: this.moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
                endsAt: this.moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
                draggable: true,
                resizable: true,
                actions: actions
            }, {
                title: '<i class="glyphicon glyphicon-asterisk"></i> <span class="text-primary">Another event</span>, with a <i>html</i> title',
                color: this.calendarConfig.colorTypes.info,
                startsAt: this.moment().subtract(1, 'day').toDate(),
                endsAt: this.moment().add(5, 'days').toDate(),
                draggable: true,
                resizable: true,
                actions: actions
            }, {
                title: 'This is a really long event title that occurs on every year',
                color: this.calendarConfig.colorTypes.important,
                startsAt: this.moment().startOf('day').add(7, 'hours').toDate(),
                endsAt: this.moment().startOf('day').add(19, 'hours').toDate(),
                recursOn: 'year',
                draggable: true,
                resizable: true,
                actions: actions
            }
        ];
        this.cellIsOpen = true;
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

    addEvent() {
        this.events.push({
            title: 'New event',
            startsAt: this.moment().startOf('day').toDate(),
            endsAt: this.moment().endOf('day').toDate(),
            color: this.calendarConfig.colorTypes.important,
            draggable: true,
            resizable: true
        });
    };

    eventClicked(event) {
        alert('eventClicked');
        alert.show('Clicked', event);
    };

    eventEdited(event) {
        alert('eventEdited');

        alert.show('Edited', event);
    };

    eventDeleted(event) {
        alert('eventDeleted');

        alert.show('Deleted', event);
    };

    eventTimesChanged(event) {
        alert('eventTimesChanged');
        alert.show('Dropped or resized', event);
    };

    toggle($event, field, event) {
        alert('toggle');

        $event.preventDefault();
        $event.stopPropagation();
        event[field] = !event[field];
    };

    timespanClicked(date, cell) {
        alert('timespanClicked');

        if (this.calendarView === 'month') {
            if ((this.cellIsOpen && this.moment(date).startOf('day').isSame(this.moment(this.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
                this.cellIsOpen = false;
            } else {
                this.cellIsOpen = true;
                this.viewDate = date;
            }
        } else if (this.calendarView === 'year') {
            if ((this.cellIsOpen && this.moment(date).startOf('month').isSame(this.moment(this.viewDate).startOf('month'))) || cell.events.length === 0) {
                this.cellIsOpen = false;
            } else {
                this.cellIsOpen = true;
                this.viewDate = date;
            }
        }

    };

}

export default angular.module('jeeonApp.main', [uiRouter])
    .config(routing)
    .component('main', {
        template: require('./main.html'),
        controller: MainController
    })
    .name;

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
    $http;
    socket;
    moment;
    calendarConfig;
    $uibModal;

    /*@ngInject*/
    constructor($http, socket, moment, calendarConfig, $uibModal) {

        this.$http = $http;
        this.$uibModal = $uibModal;
        this.moment = moment;
        this.calendarConfig = calendarConfig;
        this.socket = socket;
    }

    $onInit() {
        this.items = ['item1', 'item2', 'item3'];
        this.animationsEnabled = true;
        //These variables MUST be set as a minimum for the calendar to work
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
        this.calendarView = 'month';
        this.viewDate = new Date();
        this.cellIsOpen = true;
    }


    addEvent() {
        this.$rootScope.events.push({
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

    addNewEvent (size) {
        var modalInstance = this.$uibModal.open({
            animation: this.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller:['$rootScope','$scope','$uibModalInstance', 'items', 'moment', function ($rootScope, $scope, $uibModalInstance, items, moment) {

                $scope.items = items;

                $scope.selected = {
                    item: $scope.items[0]
                };

                $scope.today = function() {
                    $scope.dt = new Date();
                };
                $scope.today();

                $scope.open1 = function() {
                    $scope.popup1.opened = true;
                };

                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.altInputFormats = ['M!/d!/yyyy'];

                $scope.popup1 = {
                    opened: false
                };

                $scope.ok = function () {
                    this.$rootScope.events.push({
                        title: 'New $rootScope',
                        startsAt: moment().startOf('day').toDate(),
                        endsAt: moment().endOf('day').toDate(),
                        draggable: true,
                        resizable: true
                    });

                    $uibModalInstance.close($scope.selected.item);


                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };


            }],
            size: size,
            resolve: {
                items: function () {
                    return this.items;
                }.bind(this)
            }
        });
    }

}

export default angular.module('jeeonApp.main', [uiRouter])
    .config(routing)
    .component('main', {
        template: require('./main.html'),
        controller: MainController
    })
    .name;

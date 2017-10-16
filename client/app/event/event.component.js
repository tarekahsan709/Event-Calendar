import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './event.routes';

export class EventController {
    $http;
    socket;
    moment;
    calendarConfig;
    $uibModal;
    eventService;
    events;
    actions = [{
        label: '<i class=\'glyphicon glyphicon-pencil\'>Edit</i>',
        onClick: function (event){
            this.editEvent(event.calendarEvent);
        }.bind(this)
    }, {
        label: '<i class=\'glyphicon glyphicon-remove\' style="color: #ff0024">Remove</i>',
        onClick: function (event) {
            event.calendarEvent.$remove();
            this.events.splice(this.events.indexOf(event.calendarEvent), 1);
        }.bind(this)
    }];


    /*@ngInject*/
    constructor($scope, $http, socket, moment, calendarConfig, $uibModal, eventService) {
        this.$http = $http;
        this.$uibModal = $uibModal;
        this.moment = moment;
        this.calendarConfig = calendarConfig;
        this.socket = socket;
        this.eventService = eventService;

        $scope.$on('addEvent', (event, data) => {
            this.$onInit();
        });

        $scope.$on('editEvent', (event, data) => {
            this.$onInit();

        });

    }


    $onInit() {
        this.events = this.eventService.query();
        this.events.$promise.then(events => {
            return events.map(event => {
                event.startsAt = new Date(event.startsAt);
                event.endsAt = new Date(event.endsAt);
                event.actions = this.actions;
                return event;
            });

        }).catch(err => {
            console.log(err);
        }).finally(() => {
            this.socket.syncUpdates('event', this.events);

        });

        this.animationsEnabled = true;
        this.calendarView = 'month';
        this.viewDate = new Date();
        this.cellIsOpen = false;

    }

    timespanClicked(date, cell) {
        // if (this.calendarView === 'month') {
        //     if ((this.cellIsOpen && this.moment(date).startOf('day').isSame(this.moment(this.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
        //         this.cellIsOpen = false;
        //     } else {
        //         this.cellIsOpen = true;
        //         this.viewDate = date;
        //     }
        // } else if (this.calendarView === 'year') {
        //     if ((this.cellIsOpen && this.moment(date).startOf('month').isSame(this.moment(this.viewDate).startOf('month'))) || cell.events.length === 0) {
        //         this.cellIsOpen = false;
        //     } else {
        //         this.cellIsOpen = true;
        //         this.viewDate = date;
        //     }
        // }

    };

    addNewEvent(size) {
        var modalInstance = this.$uibModal.open({
            animation: this.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: ['$rootScope', '$scope', '$uibModalInstance', 'moment', 'eventService', function ($rootScope, $scope, $uibModalInstance, moment, eventService) {

                $scope.event = new eventService();

                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.altInputFormats = ['M!/d!/yyyy'];
                $scope.dtOne = new Date();
                $scope.dtTwo = new Date();

                $scope.endDateOptions = {
                    maxDate: new Date(2025, 5, 22),
                    minDate: $scope.dtOne
                };


                $scope.$watch("dtOne", function (newValue, oldValue) {
                    $scope.endDateOptions.minDate = newValue;
                    if ($scope.dtOne > $scope.dtTwo) {
                        $scope.dtTwo = newValue;

                    }
                });

                $scope.openAddEventCalenderOne = function () {
                    $scope.popup1.opened = true;
                };

                $scope.openAddEventCalenderTwo = function () {
                    $scope.popup2.opened = true;
                };


                $scope.popup1 = {
                    opened: false
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.ok = function () {

                    var event = new eventService({
                        title: $scope.title,
                        startsAt: $scope.dtOne,
                        endsAt: $scope.dtTwo
                    });

                    event.$save()
                        .then(function (res) {
                            $rootScope.$broadcast('addEvent', res);

                        })
                        .catch(function (req) {
                            console.log("error saving obj");
                        })
                        .finally(function () {
                            console.log("always called");
                            $uibModalInstance.close();

                        });


                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };


            }],
            size: size

        });
    }

    editEvent(event) {
        var modalInstance = this.$uibModal.open({
            animation: this.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'editContent.html',
            controller: ['$rootScope', '$scope', '$uibModalInstance', 'moment', 'eventService', function ($rootScope, $scope, $uibModalInstance, moment, eventService) {

                $scope.dtOne = new Date(event.startsAt);
                $scope.dtTwo = new Date(event.endsAt);
                $scope.title = event.title;


                $scope.event = new eventService();

                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.altInputFormats = ['M!/d!/yyyy'];

                $scope.endDateOptions = {
                    maxDate: new Date(2025, 5, 22),
                    minDate: $scope.dtOne
                };

                $scope.$watch("dtOne", function (newValue, oldValue) {
                    $scope.endDateOptions.minDate = newValue;
                    if ($scope.dtOne > $scope.dtTwo) {
                        $scope.dtTwo = newValue;

                    }
                });

                $scope.openEditEventCalenderOne = function () {
                    $scope.popup1.opened = true;
                };

                $scope.openEditEventCalenderTwo = function () {
                    $scope.popup2.opened = true;
                };


                $scope.popup1 = {
                    opened: false
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.ok = function () {

                    let eventData = new eventService({
                        title: $scope.title,
                        startsAt: $scope.dtOne,
                        endsAt: $scope.dtTwo
                    });

                    eventData.$update({ id: event._id})
                        .then(function (res) {
                            $rootScope.$broadcast('editEvent', res);

                        })
                        .catch(function (req) {
                            console.log("error saving obj");
                        })
                        .finally(function () {
                            console.log("always called");
                            $uibModalInstance.close();

                        });

                };

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };


            }],
            event: event
        });
    }

}

export default angular.module('jeeonApp.event', [uiRouter])
    .config(routing)
    .component('event', {
        template: require('./event.html'),
        controller: EventController
    })
    .name;

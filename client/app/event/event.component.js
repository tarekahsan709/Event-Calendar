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

    // dealer.$remove();
    // this.dealers.splice(this.dealers.indexOf(dealer), 1);

    /*@ngInject*/
    constructor($scope, $http, socket, moment, calendarConfig, $uibModal, eventService) {
        this.$http = $http;
        this.$uibModal = $uibModal;
        this.moment = moment;
        this.calendarConfig = calendarConfig;
        this.socket = socket;
        this.events = eventService.query();

        let actions = [{
            label: '<i class=\'glyphicon glyphicon-pencil\'>Edit</i>',
            onClick: event => {
                this.editEvent(event.calendarEvent);
            }
        }, {
            label: '<i class=\'glyphicon glyphicon-remove\' style="color: #ff0024">Remove</i>',
            onClick: function (event) {
                event.calendarEvent.$remove();
                this.events.splice(this.events.indexOf(event.calendarEvent), 1);
            }.bind(this)
        }];

        this.events.$promise.then(function (events) {
            return events.map(function (event) {
                event.startsAt = new Date(event.startsAt);
                event.endsAt = new Date(event.endsAt);
                event.actions = actions;
                return event;
            });

        }).catch(function (err) {
            console.log(err);
        });

        $scope.$on('addEvent', (event, data) => {
            data.startsAt = new Date(data.startsAt);
            data.endsAt = new Date(data.endsAt);
            data.actions = actions;
            this.events.push(data);
        });

        $scope.$on('editEvent', (event, data) => {

            console.log('Updated Data');
            console.log(data);
            
            this.events = eventService.query();
            this.events.$promise.then(function (events) {
                return events.map(function (event) {
                    event.startsAt = new Date(event.startsAt);
                    event.endsAt = new Date(event.endsAt);
                    event.actions = actions;
                    return event;
                });

            }).catch(function (err) {
                console.log(err);
            });
        });

    }


    $onInit() {
        this.items = ['item1', 'item2', 'item3'];
        this.animationsEnabled = true;
        this.calendarView = 'month';
        this.viewDate = new Date();
        this.cellIsOpen = false;
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

    addNewEvent(size) {
        var modalInstance = this.$uibModal.open({
            animation: this.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: ['$rootScope', '$scope', '$uibModalInstance', 'items', 'moment', 'eventService', function ($rootScope, $scope, $uibModalInstance, items, moment, eventService) {

                $scope.event = new eventService();

                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.altInputFormats = ['M!/d!/yyyy'];
                $scope.dtOne = new Date();
                $scope.dtTwo = new Date();


                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                $scope.open2 = function () {
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
            size: size,
            resolve: {
                items: function () {
                    return this.items;
                }.bind(this)
            }
        });
    }


    editEvent(event) {

        var modalInstance = this.$uibModal.open({
            animation: this.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'editContent.html',
            controller: ['$rootScope', '$scope', '$uibModalInstance', 'moment', 'eventService', function ($rootScope, $scope, $uibModalInstance, moment, eventService) {

                console.log('Edit event inside modal');
                console.log(event._id);
                $scope.dtOne = new Date(event.startsAt);
                $scope.dtTwo = new Date(event.endsAt);
                $scope.title = event.title;


                $scope.event = new eventService();

                $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
                $scope.format = $scope.formats[0];
                $scope.altInputFormats = ['M!/d!/yyyy'];


                $scope.open1 = function () {
                    $scope.popup1.opened = true;
                };

                $scope.open2 = function () {
                    $scope.popup2.opened = true;
                };


                $scope.popup1 = {
                    opened: false
                };

                $scope.popup2 = {
                    opened: false
                };

                $scope.ok = function () {

                    var eventData = {
                        title: $scope.title,
                        startsAt: $scope.dtOne,
                        endsAt: $scope.dtTwo
                    };

                    eventService.update({
                        id: event._id
                    }, eventData, response => {
                        if (response.$resolved) {
                            console.log('update Event');
                            console.log(response);
                            $rootScope.$broadcast('editEvent', response);
                            $uibModalInstance.close();

                        }
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

'use strict';

class MktbApp {
    constructor() {
        angular.module('mktb', [])
            .controller('MyController', ['$scope', function ($scope) {
                $scope.greetMe = 'World';
            }]);
    }
}

new MktbApp

/**
 * Created by Patrik Vuorela on 2017-08-23.
 */
'use strict';

angular.
    module('logo').
    component('logo', {
        templateUrl: 'components/logo/logo.template.html',
        controller: function($scope, $http){
            $scope.logo = {
                url: 'resources/images/logo.svg'
            }
        }
    });
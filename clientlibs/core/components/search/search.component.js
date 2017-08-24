/**
 * Created by Patrik Vuorela on 2017-08-22.
 */
'use strict';

angular.
    module('search').
    component('search', {
        templateUrl: 'components/search/search.template.html',
        controller: function($scope, $http, $element, $timeout){

            $scope.results = [];
            $scope.history = [];
            $scope.searchQuery = "";

            $scope.fetch = function(){
                $http({
                    method: 'GET',
                    params: {
                        q: $scope.searchQuery
                    },
                    url: 'http://chroniclingamerica.loc.gov/suggest/titles/'
                }).
                then(function(response) {
                    $scope.status = response.status;
                    $scope.results = response.data[1];
                }, function(response) {
                    $scope.data = response.data || 'Request failed';
                    $scope.status = response.status;
                });
            }

            $scope.getKey = function(e){
                if(e.which === 13) {
                    if($scope.searchQuery != ""){
                        $scope.addItem();
                        $scope.searchQuery = "";
                        angular.element($element).find("input")[0].blur();
                    }
                    e.preventDefault();
                }
                else {
                    if($scope.searchQuery != ""){
                        $scope.fetch();
                    }
                }
            }

            $scope.onFocus = function(){
                $scope.resultList = true;
                $scope.results = [];
            }

            $scope.onBlur = function(){
                $timeout(function(){
                    $scope.resultList = false;
                }, 500);
            }

            $scope.setFieldValue = function(i){
                $scope.searchQuery = $scope.results[i];
                angular.element($element).find("input")[0].focus();
            }

            $scope.removeItem = function(i){
                $scope.history.splice(i, 1);
            }

            $scope.addItem = function(){
                $scope.history.push({
                    val: $scope.searchQuery,
                    date: new Date()});
            }
        }
    });



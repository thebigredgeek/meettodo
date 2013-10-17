/*global angular */
/*jshint unused:false */
'use strict';

/**
 * The main TodoMVC app module
 *
 * @type {angular.Module}
 */
angular.module('todomvc', [
    'ngAnimate',
    'ui.sortable',
    'ui.bootstrap'
]).run([
            '$rootScope',
    function($rootScope){

        /**
         * This function gives me a safer way to use $scope.$apply
         */
        $rootScope.$safeApply = function() {
            var $scope,
                fn,
                arg,
                force = false;
            
            if(arguments.length == 1) {
                arg = arguments[0];
                if(typeof arg == 'function') {
                    fn = arg;
                }
                else{
                    $scope = arg;
                }
            }
            else{
                $scope = arguments[0];
                fn = arguments[1];
                if(arguments.length == 3) {
                    force = !!arguments[2];
                }
            }
            $scope = $scope || this;
            fn = fn || function() {}; //default function

            if(force || !$scope.$$phase) {
                $scope.$apply ? $scope.$apply(fn) : $scope.apply(fn); //call within apply cycle
            }
            else {
                fn(); //call without apply cycle
            }
        };  
}])

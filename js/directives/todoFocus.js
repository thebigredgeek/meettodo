/*global todomvc */
'use strict';

/**
 * Directive that places focus on the element it is applied to when the expression it binds to evaluates to true
 */
angular.module('todomvc').directive('todoFocus', [
            '$timeout',
    function($timeout) {
    	return function (scope, elem, attrs) {
    		scope.$watch(attrs.todoFocus, function (newVal) {
    			if (newVal) {
    				$timeout(function () {
                        if(elem[0].hasOwnProperty('focus')){ //sanity check
                            elem[0].focus();
                        };
    				}, 0, false);
    			}
    		});
    	};
}]);

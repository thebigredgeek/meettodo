/*global todomvc */
'use strict';

/**
 * Services that persists and retrieves TODOs from localStorage
 */
angular.module('todomvc').factory('todoStorage', [

    function () {
	var STORAGE_ID = 'todos-angularjs';
	return {
		get: function(){
			return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
		},
		put: function(todos){
			localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
		}
	};
}]);
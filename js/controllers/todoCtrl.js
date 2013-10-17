/*global todomvc, angular */
'use strict';

/**
 * The main controller for the app. The controller:
 * - retrieves and persists the model via the todoStorage service
 * - exposes the model to the template and provides event handlers
 */
angular.module('todomvc').controller('TodoCtrl', [
			'$scope','$location','todoStorage','$modal','filterFilter',
	function($scope,  $location,  todoStorage,  $modal,  filterFilter) {

	var todos = $scope.todos = todoStorage.get();

	$scope.newTodo = '';
	$scope.editedTodo = null;


	/**
	 * Watch the todos member for changes, and update various model properties when there is a change
	 */
	$scope.$watch('todos', function (newValue, oldValue) {
		var i;

		for(i in todos){ //sterility
			if(typeof todos[i] != 'object'){
				delete todos[i];
			}
		}


		$scope.remainingCount = filterFilter(todos, { completed: false }).length;
		$scope.completedCount = todos.length - $scope.remainingCount;
		$scope.allChecked = !$scope.remainingCount;
		if (newValue !== oldValue) { // This prevents unneeded calls to the local storage
			todoStorage.put(todos);
		}
	}, true); //Deep watch (true)

	/**
	 * Default route enforcement (should be within config block, but I am not changing this because I want it to conform to the original code for the project)
	 */
	if ($location.path() === '') {
		$location.path('/');
	}

	/**
	 * Bind the location
	 */
	$scope.location = $location;

	/**
	 * Watch the URL route for changes
	 */
	$scope.$watch('location.path()', function (path) {
		$scope.$safeApply(function(){
			$scope.statusFilter = (path === '/active') ?
				{ completed: false } : (path === '/completed') ?
				{ completed: true } : null;
			console.log($scope.statusFilter);
		});
	});


	/**
	 * This function adds a todo row
	 */
	$scope.addTodo = function () {
		var newTodo = $scope.newTodo.trim();
		if (!newTodo.length) {
			return;
		}

		todos.push({
			title: newTodo,
			completed: false
		});

		$scope.newTodo = '';
	};

	/**
	 * This function appends a todo row
	 * @param  {Object} todo A reference to the todo that is being edited
	 */
	$scope.editTodo = function (todo) {
		$scope.editedTodo = todo;
		// Clone the original todo to restore it on demand.
		$scope.originalTodo = angular.extend({}, todo);
	};

	/**
	 * This function is triggered when the user is done editing a todo item
	 * @param  {Object} todo A reference to the todo that has finished edit state
	 */
	$scope.doneEditing = function (todo) {
		$scope.editedTodo = null;
		todo.title = todo.title.trim();

		if (!todo.title) {
			$scope.removeTodo(todo);
		}
	};

	/**
	 * This function reverts (cancels) edit changes
	 * @param  {Object} todo A reference to the todo that is being reverted
	 */
	$scope.revertEditing = function (todo) {
		todos[todos.indexOf(todo)] = $scope.originalTodo;
		$scope.doneEditing($scope.originalTodo);
	};

	/**
	 * This function removes a todo from the list
	 * @param  {Object} todo A reference to the todo that is being removed
	 */
	$scope.removeTodo = function (todo) {
		$modal.open({
	      	templateUrl: 'views/modal.html',
	      	controller: 'ConfirmModalInstanceCtrl'
      	}).result.then(function (selectedItem) {
      		$scope.$safeApply(function(){
				todos.splice(todos.indexOf(todo), 1);
				console.log(todos);
      		});
	    });
	};

	/**
	 * This function clears all completed todos from the list by filtering the todos array
	 */
	$scope.clearCompletedTodos = function () {
		$scope.todos = todos = todos.filter(function (val) {
			return !val.completed;
		});
	};

	/**
	 * This function marks all todo objects as completed, or unmarks them
	 * @param  {boolean} completed Completed state
	 */
	$scope.markAll = function (completed) {
		todos.forEach(function (todo) {
			todo.completed = completed;
		});
	};
}]);

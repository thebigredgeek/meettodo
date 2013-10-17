'use strict';

/**
 * The controller for the confirmation modal
 */
angular.module('todomvc').controller('ConfirmModalInstanceCtrl',[
            '$scope','$modalInstance',
    function($scope,  $modalInstance){

        $scope.ok = function () {
            $modalInstance.close(true);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss(false);
        };
}]);
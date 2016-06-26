angular.module("clockApp", [])
	.controller("timeController", ["$scope", function ($scope) {
		$scope.breakLength = 5;
		$scope.sessionLength = 25;

  }]);

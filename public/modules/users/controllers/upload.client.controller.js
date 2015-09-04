'use strict';

angular.module('users').directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

angular.module('users').controller('UploadController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location,  Users, Authentication) {
		$scope.user = Authentication.user;

		//Redirection if not authenticated
		if (!$scope.user) $location.path('/');

		// Submit file data
		$scope.callUploader = function() {
			$scope.success = $scope.error = null;

			console.log($scope.myFile);
			var fd = new FormData();
			fd.append('file', $scope.myFile);

			$http.post('/api/uploadfile', fd, {
				transformRequest: angular.identity,
				headers: {'Content-Type': undefined}
			})
				.success(function(response){
					return response;
				})
				.error(function(){
				});
			/*$http.post('/api/uploadfile', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});*/
		};
	}
]);

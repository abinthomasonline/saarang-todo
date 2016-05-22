app.controller("todoctrl", function($scope, $http) {	

	var editindex;
	var editstatus;
	$scope.editid = undefined;

	$http.get('/api/todos')
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {

		});

	$scope.newtodo = function () {
		if($scope.newtodotext) {
			$http.post('/api/todos', {text : $scope.newtodotext})
				.success(function(data) {
					$scope.newtodotext = "";
					$scope.todos = data;
				})
				.error(function(data) {

				});
		}

	};

	$scope.removetodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {

			});
	};



	$scope.edittodo = function(index, id) {
		editindex=index;
		$scope.editid=id;
		editstatus=true;
		$scope.temptodotext = $scope.todos[index].text;
	};

	$scope.submitedit = function(index, id) {
		if($scope.todos[index].text) {

			$http.put('/api/todos/' + id + '/' + $scope.todos[index].text)
				.success(function(data) {
					$scope.todos = data;
				})
				.error(function(data) {

				});

			$scope.editid = undefined;

		} else {

			$scope.editid = undefined;
			$scope.removetodo(id);
		}

		editstatus=false;
	};

	$scope.globalclick = function() {
		if(editstatus) {
			$scope.submitedit(editindex,$scope.editid);
		}
	};
	

});
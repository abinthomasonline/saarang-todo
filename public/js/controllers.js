//-----------controller.js---------------------------------------------

app.controller("todoctrl", function($scope, $http) {	

	var editindex;				// to store index of todo which is getting edited
	var editstatus;				// true if some todo is getting edited, false otherwise
	$scope.editid = undefined;	// id of todo getting edited





	//--------------- populate todos from db onload---------------------

	$http.get('/api/todos')		
		.success(function(data) {
			$scope.todos = data;
			console.log(data);
		})
		.error(function(data) {

		});

	//------------------------------------------------------------------





	//--- funtion to add new todo --------------------------------------

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

	//-----------------------------------------------------------------





	//-----funtion to remove todo -------------------------------------

	$scope.removetodo = function(id) {
		$http.delete('/api/todos/' + id)
			.success(function(data) {
				$scope.todos = data;
			})
			.error(function(data) {

			});
	};

	//-----------------------------------------------------------------





	//--- funtion called when edit starts------------------------------

	$scope.edittodo = function(index, id) {
		editindex=index;
		$scope.editid=id;
		editstatus=true;
		$scope.temptodotext = $scope.todos[index].text;
	};

	//-----------------------------------------------------------------





	//------function called upon edit submission-----------------------

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

			//--------delete todo if blank after edit------------------

			$scope.editid = undefined;
			$scope.removetodo(id);
		}

		editstatus=false;
	};

	//-----------------------------------------------------------------





	//-----callsubmit edit if editstatus is true-----------------------

	$scope.globalclick = function() {
		if(editstatus) {
			$scope.submitedit(editindex,$scope.editid);
		}
	};

	//-----------------------------------------------------------------
	

});
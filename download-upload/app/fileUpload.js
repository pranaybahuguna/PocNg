//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);
app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
	
	$scope.uploads = [{'data':'','active':true},{'data':'','active':false},{'data':'','active':false},{'data':'','active':false},{'data':'','active':false}];
	$scope.count = 0;
	
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.upload([$scope.file]);
        }
    });
    $scope.log = '';
    
    $scope.disableDiv = function(){
    	if($scope.count = 0){
    		return true;
    	}
    }

    $scope.upload = function (files) {
        if (files && files.length && $scope.count < 5) {
            for (var i = 0; i < files.length; i++) {
            if( i < 5){
                var file = files[i];
                $scope.uploads[$scope.count].data = file;
                if($scope.count < 4){
                	$scope.uploads[$scope.count+1].active = true;	
                }               
                $scope.count = $scope.count +1;
                Upload.upload({
                    url: '/demo/upload',
                    data: {file: file, 'username': $scope.username}
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = 'progress: ' + progressPercentage + '% ' + evt.config._file.name + '\n' + $scope.log;
                }).success(function (data, status, headers, config) {
                    $timeout(function () {
                        $scope.log = 'file: ' + config._file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                    });
                });
            }
           }
          }
    };
}]);
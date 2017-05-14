//inject angular file upload directives and services.
var app = angular.module('fileUpload', ['ngFileUpload']);
app.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
	
	$scope.uploads = [{'data':'','slot':'0','percentage':''},{'data':'','slot':'1','percentage':''},{'data':'','slot':'2','percentage':''},{'data':'','slot':'3','percentage':''},{'data':'','slot':'4','percentage':''}];
	var fileCount = 0;
	$scope.uploadComplete = false;
	$scope.filesAvailable = false;
	$scope.notification = {'head':'','message':'','result':''};
	var filePermit = 5;
	
    $scope.$watch('files', function () {
        $scope.include($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.include([$scope.file]);
        }
    });
    $scope.log = '';
   
    $scope.clearNotifications = function(){
    	$scope.notification.head='';
    	$scope.notification.message='';
    	$scope.notification.result='';
    	$scope.uploadComplete = false;    	
    };
    
    $scope.remove = function(slot){
    	$scope.uploads[slot].data = '';
    	$scope.uploads[slot].percentage = '';
    	fileCount = fileCount - 1;
    	if(fileCount == 0){ 
    		$scope.filesAvailable = false;
    	}
    };
    
    $scope.include = function (files,slot) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
            if( i < filePermit){
                var file = files[i];
                if(slot != undefined){
                  $scope.uploads[slot].data = file;
                  fileCount = fileCount + 1;
                  $scope.filesAvailable = true;
                }else{ 
                	for(var j = 0 ; j < filePermit ; j++){
                    	if($scope.uploads[j].data == '' || $scope.uploads[j].data == undefined ){
                    		$scope.uploads[j].data = file;
                    		fileCount = fileCount + 1;
                    		$scope.filesAvailable = true;
                    		break;
                    	 }
                	}
                }             
              }
           }
         }
    };
    
    $scope.ascribePercentage = function(progress,slot){
    	$scope.uploads[slot].percentage = progress;
    };
    
    $scope.upload = function(files){  	
      if (files && files.length) { 
    	var uploadSuccessFiles =[];
    	for (var i = 0; i < files.length; i++) {
    	if(files[i].data != '' && files[i].data != undefined){	
    		var file = files[i];
        Upload.upload({
            url: '/demo/upload',
            data: {file: file, 'username': $scope.username, slot: i}
        }).progress(function (evt) {
        	var progress = parseInt(100.0 * evt.loaded / evt.total);
            $scope.ascribePercentage(progress,evt.config.data.slot);
        }).success(function (data, status, headers, config) {
            $timeout(function () {
                $scope.log = 'file: ' + config._file.name + ', Response: ' + JSON.stringify(data) + '\n' + $scope.log;
                var fileName = config._file.name;
                uploadSuccessFiles.push(fileName);
                if(uploadSuccessFiles.length == fileCount){
                	$scope.notification.head='Success : ';
                	$scope.notification.message='File(s) uploaded successfully!!';
                	$scope.notification.result='success';
                	$scope.uploadComplete = true;
                }
            });
        }); 
    	}
       }
      }
    };
    
   $scope.reset = function(){
	   $scope.clearNotifications();
	   fileCount = 0;
	   for(var i = 0 ; i < $scope.uploads.length ; i++){
		   $scope.uploads[i].data = '';
	   }
   }; 
    
}]);
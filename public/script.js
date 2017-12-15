angular.module('demo', [])
.controller('Hello', function($scope, $http, $timeout) {
    const MAXVAL = 980;
    const MINVAL = 350;
    var calculateSensorPercentage = function(value){
        $scope.per = Math.round((100 - (((value - MINVAL)*100)/(MAXVAL-MINVAL))));
        console.log($scope.per);
    }
    $scope.getStatus = function(){
        console.log("clicked");
        if($scope.per > 66){
            $scope.progressBarClass = "progress-bar-safe";
            $scope.imageUrl = "happy.jpg"
        }
        else if($scope.per > 33 && $scope.per <= 66){
            $scope.progressBarClass = "progress-bar-normal";
            $scope.imageUrl = "flat.jpg"
        }
        else{
            $scope.progressBarClass = "progress-bar-warn";
            $scope.imageUrl = "sad-new.jpg"
        }
    }
//    $http.get('http://plantwateringsystem.dlinkddns.com:333').
//        then(function(response) {
//            $scope.sensor = response.data.split(',')[0].split(':')[1];
//            $scope.motor = response.data.split(',')[1].split(':')[1];
//            console.log($scope.motor)
//        });
    $scope.motor = 'MotorON';
    calculateSensorPercentage(800);
    $scope.getStatus();
    var myVar = null;
    if($scope.motor == 'MotorOFF'){
        motorcheck.checked = false;
        $scope.status = false;    
    }
    if($scope.motor == 'MotorON'){
        motorcheck.checked = true;   
        $scope.status = true; 
    }
    $scope.changestatus = function(){
        if(motorcheck.checked == false){
            //    $http.get('http://plantwateringsystem.dlinkddns.com:333').
            //        then(function(response) {
            //            $scope.sensor = response.data.split(',')[0].split(':')[1];
            //            $scope.motor = response.data.split(',')[1].split(':')[1];
            //            console.log($scope.motor)
            //        });
                $scope.motor = 'MotorOFF';
                clearInterval(myVar);
        }
        else{
           //    $http.get('http://plantwateringsystem.dlinkddns.com:333').
            //        then(function(response) {
            //            $scope.sensor = response.data.split(',')[0].split(':')[1];
            //            $scope.motor = response.data.split(',')[1].split(':')[1];
            //            console.log($scope.motor)
            //        });
                $scope.motor = 'MotorON';
                fetchContinuousData();
        }
    }
    function fetchContinuousData() {
       myVar = setInterval($scope.getStatus, 500);
    }
});

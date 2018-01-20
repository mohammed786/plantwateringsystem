angular.module('demo', [])
.controller('Hello', function($scope, $http, $timeout) {
    const MAXVAL = 980;
    const MINVAL = 350;
    const API_MAIN_URL = "http://plantwateringsystem.hopto.org:333/";
    $scope.imageUrl = "assets/flat.jpg";
    btnStatus.disabled = true;
    motorcheck.disabled = false;
    var calculateSensorPercentage = function(value){
        console.log("Calulcate Percentage called");
        if(!isNaN(value)){
        if(value >= 350 && value <= 980){
            $scope.per = Math.round((100 - (((value - MINVAL)*100)/(MAXVAL-MINVAL))));
        }
        else{
            if(value < 350)
                $scope.per = 100;
            else
                $scope.per = 0;
        }
        console.log($scope.per);
        }
    }
    $scope.getStatus = function(){
        $http.get(API_MAIN_URL).
        then(function(response) {
            sensor = response.data.split(',')[0].split(':')[1];
            $scope.motor = response.data.split(',')[1].split(':')[1];
            $scope.sensor = sensor.match(/\d/g).join("");
            calculateSensorPercentage($scope.sensor);
            console.log("Sensor value   " + $scope.sensor);
            console.log("Motor value   " + $scope.motor);
             if($scope.motor == 'MotorOFF'){
                motorcheck.checked = false;
                $scope.status = false;    
            }
            if($scope.motor == 'MotorON'){
                motorcheck.checked = true;   
                $scope.status = true; 
            }
            if($scope.per > 66){
                $scope.progressBarClass = "progress-bar-safe";
                $scope.imageUrl = "assets/happy.jpg";
            }
            else if($scope.per > 33 && $scope.per <= 66){
                $scope.progressBarClass = "progress-bar-normal";
                $scope.imageUrl = "assets/flat.jpg";
            }
            else{
                $scope.progressBarClass = "progress-bar-warn";
                $scope.imageUrl = "assets/sad-new.jpg";
            }
        }).finally(function(){
            btnStatus.disabled = false;
            motorcheck.disabled = false;
            if($scope.motor == 'MotorON')
                $scope.getStatus();
        });
    }
    $scope.getStatus();
    var myVar = null;
    $scope.changestatus = function(){
        if(motorcheck.checked == false){
                clearInterval(myVar);
                $http.get(API_MAIN_URL + 'motoroff').
                    then(function(response) {
                        $scope.sensor = response.data.split(',')[0].split(':')[1];
                        $scope.motor = response.data.split(',')[1].split(':')[1];
                        $scope.sensor = sensor.match(/\d/g).join("");
                    });
                $scope.motor = 'MotorOFF';
        }
        else{
               $http.get(API_MAIN_URL + 'motoron').
                    then(function(response) {
                        $scope.sensor = response.data.split(',')[0].split(':')[1];
                        $scope.motor = response.data.split(',')[1].split(':')[1];
                        $scope.sensor = sensor.match(/\d/g).join("");
                    });
                $scope.motor = 'MotorON';
        }
        $scope.getStatus();
    }
    function fetchContinuousData() {
       myVar = setInterval($scope.getStatus, 2000);
    }
});

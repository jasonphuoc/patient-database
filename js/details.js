function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) {
        return null;
    }
    if (!results[2]) {
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
        
var euid = "data/" + getParameterByName('euid') + ".json"; 
    
var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
    document.getElementById("details").style.display = "block";
    $http.get(euid).then(function (response) {
        $scope.record = response.data;
        
        $scope.addressAry = [];
        console.log(response)
        var addresses = response.data.SBRPerson.Person.Address;
        addresses.forEach(function(item) {
            var address = "data/" + item.toString() + ".json";
            $http.get(address).then(function (response) {
                $scope.addressAry.push(response.data);
            });              
        });
        
                             
    }, function myError(response) {
        document.getElementById("details").innerHTML = "<h3>User not found. Please search again.</h3>";
    });
});
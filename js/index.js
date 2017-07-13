var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {
    $scope.search = function() {
        //document.getElementById("search-results").style.display = "block";
        $scope.searchResults = "greenBG";
        
        console.log("hello")
        $http.get("data/searchResults.json")
        .then(function (response) {
            console.log("hello2")
            var filtered = response.data._array;
            filtered.forEach(function(item) {
                if ($("#lastName").val().length) {
                    filtered = jQuery.grep(filtered, function (item) {
                        return item.Person.LastName === $("#lastName").val().toUpperCase();
                    });
                }
                if ($("#firstName").val().length) {
                    filtered = jQuery.grep(filtered, function (item) {
                        return item.Person.FirstName === $("#firstName").val().toUpperCase();
                    });
                }
                if ($("#euid").val().length) {
                    filtered = jQuery.grep(filtered, function (item) {
                        return item.EUID === $("#euid").val();
                    });
                }
                if ($("#city").val().length) {
                    filtered = jQuery.grep(filtered, function (item) {
                        return item.Person.Address[0].City === $("#city").val().toUpperCase();
                    });
                }
                if ($("#state").val().length) {
                    filtered = jQuery.grep(filtered, function (item) {
                        return item.Person.Address[0].StateCode === $("#state").val().toUpperCase();
                    });
                }
                if ($("#zipcode").val().length) {
                    filtered = jQuery.grep(filtered, function (item) {
                        return item.Person.Address[0].PostalCode === $("#zipcode").val();
                    });
                }
            });

            $scope.records = filtered;

            $('html, body').animate({
                scrollTop: $("#search-results").offset().top
            }, 20);

            if (filtered.length == 0) {
                document.getElementById("result-details").innerHTML = "No results found";
                document.getElementById("result-details").style.height = "100px";
            } else {
                document.getElementById("result-details").innerHTML = "";
                document.getElementById("result-details").style.height = "0px";
            }
        });
        
        console.log("hello")
    }
});
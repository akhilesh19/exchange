app.controller('searchImageCtrl', function($scope, $state, userServices, toastr) {
    $scope.myForm = {};
    $scope.save = function() {
        localStorage.setItem('keyword', $scope.myForm.search);
        var data = {
            "keyword": $scope.myForm.search
        }
        console.log(data);
        userServices.scrape(data).then(function(success) {
            if (success.data.responseCode == 200) {
                var arrayRes = [];
                for (var i = 0; i < success.data.data.length; i++) {
                    arrayRes.push(success.data.data[i].thumb)
                }
                localStorage.setItem('arrayRes', JSON.stringify(arrayRes));
                toastr.success("Images shown successfully.");
                $state.go('searchResult');
            } else {
                toastr.error("Server error.");
            }
        }, function(err) {
            console.log(err);
            toastr.error('Connection error.');
        });
    }

});                                      

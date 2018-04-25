app.controller('homeCtrl', function($scope, $state, userServices, toastr,$timeout) {
        if(localStorage.getItem('_id')){
$scope.selectedCurrency ={}

    $scope.selectCurrency = ()=>{
        console.log("currency",$scope.selectedCurrency.currency)
        var data = {
            currency:$scope.selectedCurrency.currency
        }
    userServices.getUserDetails(data).then(function(success) {
      console.log("succes data======",success)
        if (success.data.responseCode == 200) {
        $scope.data = success.data.result
        console.log(" $scope.data $scope.data $scope.data==>>", $scope.data)
           
        } else {
            toastr.error("No data found");
        }
    }, function(err) {
        console.log(err);
        toastr.error('Connection error.');
    });
}
$scope.selectedCurrency.currency = "BTC"
$scope.selectCurrency();

    userServices.getCurrencyList().then(function(success) {
      console.log("getCurrencyList succes data======",success.data.result)
        if (success.data.responseCode == 200) {
           $scope.currencyList = success.data.result[0].currencyData
           console.log("  $scope.currencyList===>>",$scope.currencyList[1].currency)
        } else {
            toastr.error("No data found");
        }
    }, function(err) {
        console.log(err);
        toastr.error('Connection error.');
    });

 
// var trace1 = {
//   x: [1, 2, 3], 
//   y: [4, 3, 2], 
//   type: 'scatter'
// };

// var trace2 = {
//   x: [20, 30, 40], 
//   y: [30, 40, 50], 
//   xaxis: 'x2', 
//   yaxis: 'y2', 
//   type: 'scatter'
// };

// var data = [trace1, trace2];

// var layout = {
//   yaxis2: {
//     domain: [0.6, 0.95], 
//     anchor: 'x2'
//   }, 
//   xaxis2: {
//     domain: [0.6, 0.95], 
//     anchor: 'y2'
//   }
// };

// Plotly.newPlot('myDiv', data, layout);

$scope.logout = ()=>{
    localStorage.removeItem('_id');
    toastr.success('Logout successfully.')
    $state.go('login')
}
}else {
    $state.go('login')
}



});                   
                                      
                                      
                                      
                                      
                                      
                        
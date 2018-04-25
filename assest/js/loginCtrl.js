app.controller('loginCtrl', function($scope, $state, userServices,toastr) {
// $scope.imagesList =  function() {
//     document.getElementById("listOfImages").style.filter = "grayscale(100%)";

//     // Safari 6.0 - 9.0
//     document.getElementById("listOfImages").style.WebkitFilter = "grayscale(100%)";  
// }

$scope.login = ()=> {
  console.log("data===>>>",$scope.data)
  $scope.data.ip = "192.168.0.124"
  $scope.data.location = "sector-49, gurgaon"
    userServices.login($scope.data).then(function(success) {
        console.log("success",success.data)
      if(success.data.responseCode == 200){   
          toastr.success(success.data.responseMessage);
         localStorage.setItem('_id',success.data.data._id)
         $state.go('home');
      }else{
         toastr.error("Connection error.");
      }     
     },function(err){
        console.log(err);
         toastr.error('Connection error.');
     });
}

})
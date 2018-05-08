//var baseurl = 'http://:8000';
var baseurl = 'https://199.188.204.100:5001/exchanges/api/v1/user';
var baseurlLocal = 'http://localhost:7213'


app.service('userServices',function($http){

	return{ 
		login : function(data){
			return $http.post(baseurl+'/login', data);
		},
		getUserDetails : function(data){
			return $http.post('http://192.64.116.199:7213/getUserDetails',data);
		},
		getCurrencyList : function(){
			return $http.get('http://192.64.116.199:7213/getCurrencyList');
		},
		// scrape : function(data){
			
		// 	//var datas = JSON.stringify(data)
		// 	console.log("datafgfh======>>",baseurl+'/scrape', data)
		// 	return $http.post(baseurl+'/scrape', data);
		// 	},

		// uploadImage : function(data){
  //           return $http.post(baseurl+'/uploadimage', data);
		// },
		// searchlist: function(data){
  //           return $http.get(baseurl+'/searchlist');
		// },
		// viewImages: function(data){
  //           return $http.post(baseurl+'/showImages',data);
		// }
    }
})

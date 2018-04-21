var app = angular.module('MyApp', ['ui.router','blockUI','toastr','angularUtils.directives.dirPagination']);

app.config(function ( $stateProvider, $urlRouterProvider, $sceProvider, $httpProvider){
	// $sceProvider.enabled(false);
	

	//$httpProvider.interceptors.push('httpModifier');
	$stateProvider
		.state('login',{
			url: '/login',
			controller: 'loginCtrl',
			templateUrl: 'templates/login.html'
		})
		.state('home',{
			url: '/home',
			controller: 'homeCtrl',
			templateUrl: 'templates/home.html'
		})
		 // .state('keyWordList', {
   //          url: '/keyWordList',
   //          controller: 'keyWordListCtrl',
   //          templateUrl: 'templates/keyWordList.html'
   //      }) .state('savedImagesList', {
   //          url: '/savedImagesList',
   //          controller: 'savedImagesListCtrl',
   //          templateUrl: 'templates/savedImagesList.html'
   //      })

	 $urlRouterProvider.otherwise('/login');
})


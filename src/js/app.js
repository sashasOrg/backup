angular.module('SashasApp', ['ui.router', 'ngCookies'])

angular.module('SashasApp').config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
       url: '/',
       templateUrl: './views/home.html',
       controller: 'mainController',
       access: {restricted: false}
    })
    .state('form', {
      url: '/form',
      templateUrl: './views/form.html',
      controller: 'formController',
      access: {restricted: false}
    })
    .state('login', {
      url: '/login',
      templateUrl: './views/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .state('register', {
      url: '/register',
      templateUrl: './views/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .state('portfolio', {
      url: '/portfolio',
      templateUrl: './views/portfolio.html',
      controller: 'userController',
      access: {restricted: false}
    })
    .state('stock', {
      url: '/stock',
      templateUrl: './views/stock.html',
      controller: 'mainController',
      access: {restricted: false}
    })
    .state('admin', {
      url: '/admin',
      templateUrl: '/views/admin.html',
      controller: 'formController',
      access: {restricted: false}
    })


    $urlRouterProvider.otherwise('/')
})

angular.module('SashasApp').run(function ($state, $rootScope, $location, AuthService) {
  $rootScope.$on('$stateChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus();
      if (next.access.restricted &&
          !AuthService.isLoggedIn()) {
            event.preventDefault();
            $state.go('login')
      }
  });
});

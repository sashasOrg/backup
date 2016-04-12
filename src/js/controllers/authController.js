angular.module('SashasApp').controller('loginController', function($state, $scope, $location, $cookies, AuthService, mainService) {

    $scope.isLoggedIn = AuthService.isLoggedIn;

    $scope.login = function () {
      $scope.error = false;
      $scope.disabled = true;

      AuthService.login($scope.loginForm.username, $scope.loginForm.password)
        .then(function (response) {
          $cookies.put('currentUser', JSON.stringify(response));
          $scope.disabled = false;
          $scope.loginForm = {};
          AuthService.isLoggedIn();
          $state.go('portfolio')
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;
          $scope.loginForm = {};
        });
    };
});
angular.module('SashasApp').controller('logoutController', function ($scope, $location, AuthService, mainService) {

    $scope.userLogged = AuthService.isLoggedIn();
    $scope.$watch($scope.userLogged);

    $scope.logout = function () {
      AuthService.logout()
        .then(function () {
          mainService.currentUser = {};
          mainService.userPageUser = {};
          $location.path('login');
        });
        console.log('logout')

    };

});
angular.module('SashasApp').controller('registerController',
  ['$scope', '$location', 'AuthService',
  function ($scope, $location, AuthService) {

    $scope.register = function () {
      $scope.error = false;
      $scope.disabled = true;
      console.log($scope.registerForm)
      AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.firstName, $scope.registerForm.lastName, $scope.registerForm.email)
        .then(function () {
          $location.path('login')
          $scope.disabled = false;
          $scope.registerForm = {};
        })
        .catch(function () {
          $scope.error = true;
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;
          $scope.registerForm = {};
        });

    };

}]);

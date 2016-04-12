angular.module('SashasApp').controller('userController', function($scope, $cookies, mainService) {
  $scope.currentUserCookie = JSON.parse($cookies.get('currentUser'));
})

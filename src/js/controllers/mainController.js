angular.module('SashasApp').controller('mainController', function($scope, $state, $cookies, mainService) {
  $scope.data = mainService.data;
  $scope.specificData = mainService.specificData;
  $scope.stockQuery = '';
  $scope.mainService = {};


  // $scope.getSymbols = function() {
  //   mainService.getSymbols()
  //   console.log($scope.data)
  // }
  // $scope.getSymbols();
  $scope.searchSymbols = function() {
    mainService.searchSymbols($scope.stockQuery).then(function(response) {
      mainService.data = response.data.ResultSet.Result;
      $state.reload();
    })
  }
  $scope.getMoreInformation = function(symbol) {
    mainService.getMoreInformation(symbol).then(function(response) {
      mainService.specificData = response.data.query.results.quote;
      console.log(mainService.specificData)
      $state.reload();
    })
  }
})

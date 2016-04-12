angular.module('SashasApp').controller('formController', function($scope, formService) {

  //mutual fund info


$scope.anyfund = function(){
      console.log('test');
    $scope.error = false;
    $scope.disabled = true;

    // formService.newFund($scope.newfundForm.name, $scope.newfundForm.symbol,  $scope.newfundForm.assetClass, $scope.newfundForm.beta, $scope.newfundForm.expenseRatio, $scope.newfundForm.loadType, $scope.newfundForm.riskBracket, $scope.newfundForm.riskPotential)

    formService.newFund($scope.newfundForm)

  };

  $scope.getFund = function(){
        formService.getFund().then(function(response){
          $scope.fund = response.data;
      })
    };
    $scope.getFund();

  $scope.newFund = function(newname, newsymbol,  newassetClass, newbeta, newexpenseRatio, newloadType, newriskBracket, newriskPotential){
    formService.newFund(newname, newsymbol,  newassetClass, newbeta, newexpenseRatio, newloadType, newriskBracket, newriskPotential).then(function(response){
      $scope.getFund();
  });
  };

  $scope.toggle = function(){
    $scope.showing = !$scope.showing;
  };
    $scope.showing = false;

})

  angular.module('SashasApp').directive('hideForm', function(){
  function link ($scope, element, attributes){
      var expression = attributes.hideForm;
      if ( ! $scope.$eval( expression)){
        element.hide();
      }
    $scope.$watch(expression, function(newValue, oldValue){
      if (newValue === oldValue) {
        return;
      } if ( newValue){
        element.stop(true, true).slideDown();
      }else{
        element.stop(true, true).slideUp();
      }

    });
  };
    return ({
      link:link,
      restrict: 'A'

    });
  })

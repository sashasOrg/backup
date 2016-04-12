angular.module('SashasApp').service('mainService', function($http, $q) {
  this.data = [];
  // this.getSymbols = function() {
  //   var stockData = [];
  //   var arrayOfLetters = [];
  //   function toLetters(num) {
  //       var mod = num % 26;
  //       var pow = num / 26 | 0;
  //       var out = mod ? String.fromCharCode(64 + mod) : (pow--, 'Z');
  //       return pow ? toLetters(pow) + out : out;
  //   }
  //   for (var x = 1, y; x <= 702; x++) {
  //       arrayOfLetters.push((y = toLetters(x)));
  //   }
  //   for (var i = 0; i < arrayOfLetters.length; i++) {
  //       $http.jsonp('http://d.yimg.com/aq/autoc?query=' + arrayOfLetters[i] + '&region=US&lang=en-US&callback=JSON_CALLBACK').then(function(response) {
  //         for (var z = 0; z < response.data.ResultSet.Result.length; z++) {
  //           stockData.push(response.data.ResultSet.Result[z]);
  //           console.log(stockData)
  //       }
  //     })
  //   }
  // }
  this.searchSymbols = function(query) {
    return $http.jsonp('http://d.yimg.com/aq/autoc?query=' + query + '&region=US&lang=en-US&callback=JSON_CALLBACK')
  }
  this.getMoreInformation = function(symbol) {
    return $http.get('http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20IN%20(%22' + symbol + '%22,%22' + symbol + '%22)&format=json&env=http://datatables.org/alltables.env')
  }


});

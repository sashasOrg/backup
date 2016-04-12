angular.module('SashasApp').factory('AuthService', function ($q, $timeout, $http, $state, $cookies) {


    this.currentUser = $cookies.get('currentUser')

    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register
    });



    function isLoggedIn() {
      if(JSON.stringify($cookies.get('currentUser')) === null) {
        user = null;
      } else {
        user = true;
      }
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      $http.get('/user/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      .error(function (data) {
        user = false;
      });
    }

    function login(username, password) {
      var deferred = $q.defer();
      $http.post('/user/login',
        {username: username, password: password})
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            console.log($cookies.get('currentUser'));
            deferred.resolve(data.user);
          } else {
            user = false;
            deferred.reject();
          }
        })
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      return deferred.promise;
    }

    function logout() {
      var deferred = $q.defer();
      $http.get('/user/logout')
        .success(function (data) {
          user = false;
          $cookies.remove('currentUser')
          deferred.resolve();
        })
        .error(function (data) {
          user = false;
          deferred.reject();
        });
      return deferred.promise;
    }

    function register(username, password, firstName, lastName, email) {
      var deferred = $q.defer();
      $http.post('/user/register',
        {username: username, password: password, firstName: firstName, lastName: lastName, email: email})
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        .error(function (data) {
          deferred.reject();
        });
      return deferred.promise;
    }
});

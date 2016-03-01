var app = angular.module('starter.controllers', [])

app.controller('AppCtrl', function($scope, $ionicModal) {})


app.factory('BeerData', function(){
  return {data: {}};
})

app.factory('beerDetails', function(){
  return {data: {}};
})

app.controller('SearchCtrl', function($scope, $state, $http, BeerData) {
  $scope.form = {};
  console.log('in search control');

  $scope.settingsList = {searchInput: "", organic: "", abv: "", ibu: "", verified: ""};


  $scope.search = function() {

    if($scope.settingsList.organic === true) {
      $scope.settingsList.organic = "y";
    } else {
      $scope.settingsList.organic = "n";
    }

    if($scope.settingsList.verified === true) {
      $scope.settingsList.verified = "y";
    } else {
      $scope.settingsList.verified = "n";
    }

    console.log('made it to search');
    $http({
      method: 'GET',
      //link to the proxy given to us by Professor Matthew
      url: 'https://salty-taiga-88147.herokuapp.com/beers',
      params: {abv: $scope.settingsList.abv, ibu: $scope.settingsList.ibu, isOrganic: $scope.settingsList.organic, year: $scope.settingsList.searchInput, verified: $scope.settingsList.verified}

    }).then(function successCallback(response) {
      BeerData.data = response.data.data;

      $state.go('app.beers');
    }, function errorCallBack(response){
      console.log('fail');
    });
  }
})

//some controllers we made in class with Professer Matthew
app.controller('BeersCtrl', function($scope, $http, $state, BeerData, beerDetails) {

  console.log('Made ittobeer');
  console.log(BeerData.data);
  $scope.beerArray = BeerData.data;



  $scope.searchPage = function() {
    console.log('about to go to search');
    $state.go('app.search');
  }
  $scope.getInfo = function(item) {
    beerDetails.data = item;
    $state.go('app.details');
  }

})

app.controller('DetailsCtrl', function($scope, $http, $state, BeerData, beerDetails) {
  $scope.itemDetails = beerDetails.data;

  $scope.returnHome = function() {
    $state.go('app.search');
  };
});

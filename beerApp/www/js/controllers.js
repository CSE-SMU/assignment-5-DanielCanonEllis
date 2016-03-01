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
      $scope.settingsList.organic = "Y";
    } else {
      $scope.settingsList.organic = "N";
    }

    if($scope.settingsList.verified === true) {
      $scope.settingsList.verified = "Y";
    } else {
      $scope.settingsList.verified = "N";
    }

    console.log('made it to search');
    $http({
      method: 'GET',
      url: 'https://salty-taiga-88147.herokuapp.com/beers', // the link to proxy
      params: {abv: $scope.settingsList.abv, ibu: $scope.settingsList.ibu, isOrganic: $scope.settingsList.organic, year: $scope.settingsList.searchInput, verified: $scope.settingsList.verified}
      //If call successful, store response into BeerData
    }).then(function successCallback(response) {
      BeerData.data = response.data.data;   // save the response data in the factory
      //console.log(BeerData.data.data[0].id); //.data[0].id
      $state.go('app.beers');          // go to the beer results state
    }, function errorCallBack(response){
      console.log('fail');
    });
  }
})

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

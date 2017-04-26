$(document).ready(function(){
  //Location declared
  var locatie = '';
  //Asking geoloation to the browser
  function getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  //Get position and value of location
  function showPosition(position){
    var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';
    $.getJSON(GEOCODING).done(function(location) {
        locatie += location.results[0].address_components[3].long_name;
        ajaxRequest(locatie);
    });
  }
  //AjaxRequest
  function ajaxRequest(loc){
    $.ajax('https://api.apixu.com/v1/current.json?key=c3ea9587ecde474b88d90120172604&q=' + loc, {
        type: 'GET',
        data: 'null',
        dataType: 'json',
        success: function(data){
          $('.lead').text(data['location']['name']);
          $('.temperature').html(data['current']['temp_c'] + '°<span class="blue"> C</span>');
          $('.weather').text(data['current']['condition']['text']);
          $('img').attr('src', 'http:' + data['current']['condition']['icon']);
        },
        error: function(request, errorType, errorMessage){
          alert('Error: ' + errorType + ' with message: ' + errorMessage);
        }
      });
    $('body').animate({opacity: '1'},2000);
  }
  //Calling function
  getLocation();
});

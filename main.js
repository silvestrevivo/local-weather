
navigator.geolocation.getCurrentPosition(success, error);
var locatie = '';
function success(position) {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)

    var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';

    $.getJSON(GEOCODING).done(function(location) {
        locatie += location.results[0].address_components[3].long_name;
        console.log(location.results[0].address_components[3].long_name)
    })

}

function error(err) {
    console.log(err)
}



$(document).ready(function(){
  //Start fadeIn
  $('body').animate({opacity: '1'},2000);
  //Geolocation Country
  $.getJSON('https://geoip-db.com/json/geoip.php?jsonp=?')
   .done (function(location){
      console.log(location);
   });

  //Ajax Request
  $.ajax('https://api.apixu.com/v1/current.json?key=c3ea9587ecde474b88d90120172604&q=Amsterdam', {
      type: 'GET',
      data: 'null',
      dataType: 'json',
      success: function(data){
        $('.lead').text(data['location']['country']);
        $('.temperature').html(data['current']['temp_c'] + '°<span class="blue"> C</span>');
        $('.weather').text(data['current']['condition']['text']);
        $('img').attr('src', 'http:' + data['current']['condition']['icon']);
        console.log(data);
        console.log(data['location']['country']);
        console.log(data['current']['condition']['text']);
        console.log(data['current']['temp_c']);
      },
      error: function(request, errorType, errorMessage){
        alert('Error: ' + errorType + ' with message: ' + errorMessage);
      }
    });
});

$(document).ready(function(){
  $.ajax('https://api.apixu.com/v1/current.json?key=c3ea9587ecde474b88d90120172604&q=Amsterdam', {
      type: 'GET',
      data: 'null',
      dataType: 'json',
      success: function(data){
        $('.lead').text(data['location']['country']);
        $('.temperature').html(data['current']['temp_c'] + '<span class="blue"> C</span>');
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

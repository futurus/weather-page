var C = true, temp = 0, description = "", icon = "";

var sunny = '<div class="icon sunny">  <div class="sun">    <div class="rays"></div>  </div></div>', 
    thunder = '<div class="icon thunder-storm">  <div class="cloud"></div>  <div class="lightning">    <div class="bolt"></div>    <div class="bolt"></div>  </div></div>',
    snow = '<div class="icon flurries">  <div class="cloud"></div>  <div class="snow">    <div class="flake"></div>    <div class="flake"></div>  </div></div>',
    cloud = '<div class="icon cloudy">  <div class="cloud"></div>  <div class="cloud"></div></div>',
    drizzle = '<div class="icon sun-shower">  <div class="cloud"></div>  <div class="sun">    <div class="rays"></div>  </div>  <div class="rain"></div></div>',
    rain = '<div class="icon rainy">  <div class="cloud"></div>  <div class="rain"></div></div>';

function getWeather(lat, lon) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=ed0bcf74cbbdf8f45dd533e9b70e30eb';
  $.ajax({
    url: url,
    type: 'GET',
    data: {},
    dataType: 'json',
    success: function(data) {
      temp = parseInt(data.main.temp, 10) - 273.15;
      icon = data.weather[0].main;
      $(".location").html(data.name);
      $(".temperature").html(Math.round(temp, 1) + " &deg;C");
      $(".description").html(icon);
      
      if (icon === "Clear") {
        $(".weather-icon").html(sunny);
      } else if (icon === "Clouds") {
        $(".weather-icon").html(cloud);
      } else if (icon === "Snow") {
        $(".weather-icon").html(snow);
      } else if (icon === "Rain") {
        $(".weather-icon").html(rain);
      } else if (icon === "Drizzle") {
        $(".weather-icon").html(drizzle);
      } else if (icon === "Thunderstorm") {
        $(".weather-icon").html(thunder);
      }
    },
    error: function(err) {
      alert("API call to server was unsuccessful.");
    }
  });
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;
  
  alert(crd);

  getWeather(crd.latitude, crd.longitude);
  
  console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

$(document).ready(function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error, options);
  }
  
  $(".temperature").on("click", function(e) {
    if (C) {
      temp = temp * 1.8 + 32;
      $(".temperature").html(Math.round(temp, 1) + " &deg;F");
      C = false;
    } else {
      temp = (temp - 32) / 1.8;
      $(".temperature").html(Math.round(temp, 1) + " &deg;C");
      C = true; 
    }
  });
});


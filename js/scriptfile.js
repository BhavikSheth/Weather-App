// This is one of my earliest projects and the code here is weak.
// I choose not to come back and refactor this code because it reminds me of my journey and how far I have come. It shows that everyone was once a beginner.

$("document").ready(function() {
  $.getJSON("http://ip-api.com/json", function(locationjson) {
    longitude = locationjson.lon;
    latitude = locationjson.lat;
    getWeather(longitude, latitude);
  })
})

function getWeather(lon, lat) {
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=d44cad98190cfa5e0827ddc336f22609&units=metric", function(weatherjson) {
    $(".location").html(weatherjson.name + ", " + weatherjson.sys.country);
    $(".temperature").html("<h1>" + Math.round(weatherjson.main.temp) + "&deg;<span class=\"tempspanc\" onClick=\"getTempC(" + weatherjson.main.temp + ", " + weatherjson.main.temp_max + ", " + weatherjson.main.temp_min + ")\">C</span></h1><h2 class=\"max-min\">" + Math.round(weatherjson.main.temp_max) + "&deg;C / " + Math.round(weatherjson.main.temp_min) + "&deg;C</h2>");
    $(".weather-main").html(weatherjson.weather[0].main);
    
    var sunrise = (new Date(weatherjson.sys.sunrise * 1000)).toLocaleTimeString();
    var sunset = (new Date(weatherjson.sys.sunset * 1000)).toLocaleTimeString();
    $(".rise-set").html("<strong>Sunrise:</strong> " + sunrise + " | <strong>Sunset:</strong> " + sunset);
    $(".weathericon").html('<img src="http://openweathermap.org/img/w/' + weatherjson.weather[0].icon + '.png" />');
    $(".weathericon img").addClass("img-responsive");
    $(".humidity").html(weatherjson.main.humidity + "%");
    $(".gust").html(weatherjson.wind.gust + " m/s");
    $(".pressure").html(weatherjson.main.pressure + " hPa");

    var degToCard = function(deg) {
      if (deg > 11.25 && deg < 33.75) {
        return "NNE";
      } else if (deg > 33.75 && deg < 56.25) {
        return "ENE";
      } else if (deg > 56.25 && deg < 78.75) {
        return "E";
      } else if (deg > 78.75 && deg < 101.25) {
        return "ESE";
      } else if (deg > 101.25 && deg < 123.75) {
        return "ESE";
      } else if (deg > 123.75 && deg < 146.25) {
        return "SE";
      } else if (deg > 146.25 && deg < 168.75) {
        return "SSE";
      } else if (deg > 168.75 && deg < 191.25) {
        return "S";
      } else if (deg > 191.25 && deg < 213.75) {
        return "SSW";
      } else if (deg > 213.75 && deg < 236.25) {
        return "SW";
      } else if (deg > 236.25 && deg < 258.75) {
        return "WSW";
      } else if (deg > 258.75 && deg < 281.25) {
        return "W";
      } else if (deg > 281.25 && deg < 303.75) {
        return "WNW";
      } else if (deg > 303.75 && deg < 326.25) {
        return "NW";
      } else if (deg > 326.25 && deg < 348.75) {
        return "NNW";
      } else {
        return "N";
      }
    }

    $(".wind-speed").html(weatherjson.wind.speed + " m/s " + degToCard(weatherjson.wind.deg));

  })
  dateTime();
}

function getTempC(temp, temp_max, temp_min) {
  $(".temperature").html("<h1>" + Math.round(temp * 9 / 5 + 32) + "&deg;<span class=\"tempspanf\" onClick=\"getTempF(" + temp + ", " + temp_max + ", " + temp_min + ")\">F</span></h1><h2 class=\"max-min\">" + Math.round(temp_max * 9 / 5 + 32) + "&deg;F / " + Math.round(temp_min * 9 / 5 + 32) + "&deg;F</h2>");
}

function getTempF(temp, temp_max, temp_min) {
  $(".temperature").html("<h1>" + Math.round(temp) + "&deg;<span class=\"tempspanc\" onClick=\"getTempC(" + temp + ", " + temp_max + ", " + temp_min + ")\">C</span></h1><h2 class=\"max-min\">" + Math.round(temp_max) + "&deg;C / " + Math.round(temp_min) + "&deg;C</h2>");
}

function dateTime() {
  var x = document.lastModified;
  $(".date-time").html("Last updated: " + x);
}
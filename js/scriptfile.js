var coords = {};
var temp = {C:{},F:{}};
var presentUnit = "C";

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(locationSuccess, getGeoIP);
    } else {
        getGeoIP();
    }
}

function getGeoIP() {
    $.getJSON("http://freegeoip.net/json/", ipLocationSuccess);
}

function locationSuccess(pos) {
    coords.lat = pos.coords.latitude;
    coords.lon = pos.coords.longitude;
    getWeather(coords.lat, coords.lon);
    getLocationName(coords.lat, coords.lon);
}

function ipLocationSuccess(ipjson) {
    coords.lat = ipjson.latitude;
    coords.lon = ipjson.longitude;
    getWeather(coords.lat, coords.lon);
    getLocationName(coords.lat, coords.lon);
}

function getLocationName(lat, lon) {
    $.getJSON("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lon + "&key=AIzaSyB_6EPRMJ2oCIW3hd_8CzduQZl0wbPyiEk", function(googlejson) {
        $(".location").text(googlejson.results.filter(v=>v.types.includes("locality"))[0].formatted_address);
    });
}

function getWeather(lat, lon) {
    $.getJSON("https://api.darksky.net/forecast/e8df7b7df394e36ea8cefcecab0e8224/" + lat + ',' + lon + "?units=uk2&callback=?", weatherSuccess);
    dateTime();
}

function weatherSuccess(weatherjson) {
    temp.C.main = Math.round(weatherjson.currently.temperature);
    temp.C.max = Math.round(weatherjson.daily.data[0].temperatureMax);
    temp.C.min = Math.round(weatherjson.daily.data[0].temperatureMin);
    temp.F.main = Math.round(convertToF(weatherjson.currently.temperature));
    temp.F.max = Math.round(convertToF(weatherjson.daily.data[0].temperatureMax));
    temp.F.min = Math.round(convertToF(weatherjson.daily.data[0].temperatureMin));
    updateTemp(presentUnit);
    $(".weather-title").html(weatherjson.currently.summary);
    var sunrise = (new Date(weatherjson.daily.data[0].sunriseTime * 1000)).toLocaleTimeString();
    var sunset = (new Date(weatherjson.daily.data[0].sunsetTime * 1000)).toLocaleTimeString();
    $(".rise-set").html("<strong>Sunrise:</strong> " + sunrise + " | <strong>Sunset:</strong> " + sunset);
    renderIcons(weatherjson.currently.icon);
    $(".humidity").text(weatherjson.currently.humidity + "%");
    $(".pressure").text(weatherjson.currently.pressure + " hPa");
    $(".visibility").text(weatherjson.currently.visibility + " miles");
    $(".dew-point").html(weatherjson.currently.dewPoint + "&deg;C");
    $(".wind-speed").html(weatherjson.currently.windSpeed + " mph " + degToCard(weatherjson.currently.windBearing));
}
    
function convertToF(temp) {
    return (temp*9)/5 + 32;
}

function degToCard(deg) {
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

function renderIcons(value) {
    var skycons = new Skycons({"color": "white"});
    skycons.add("icon", value);
    skycons.play();
}

function dateTime() {
    var x = document.lastModified;
    $(".date-time").html("Last updated: " + x);
}

function updateTemp(unit) {
    presentUnit = unit;
    $(".temp-num").html(temp[presentUnit].main + "&deg;");
    $(".cel-fah").html(presentUnit);
    $(".max-min").html(temp[presentUnit].max + "&deg;" + presentUnit + " / " + temp[presentUnit].min + "&deg;" + presentUnit);
}

window.onload = function() {
    getLocation();
    dateTime();
    $(".cel-fah").click(function() {
        presentUnit == "C" ? updateTemp("F") : updateTemp("C");
    });
};





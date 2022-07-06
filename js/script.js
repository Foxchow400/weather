// script.js

//Gets the GeoData based on your position
$(function() {
    $.ajax({url:"https://ipinfo.io",dataType:'jsonp'})
    .done(function(geoData){
        // $("#weather").val(geoData.region);
            console.log(geoData);
            console.log(geoData.loc);
            geoData = geoData.loc;
            geoData = geoData.split(",");
            getWeatherData(geoData);

    });
});

// Updates page content with geo data string
function getWeatherData(geoData) {  
    // $("#weather").html(geoData); // call updateElement to update the contents of an element in the HTML document
    var lat = geoData[0];
    var long = geoData[1];
    console.log(long + ", " + lat);
    var str = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=df3b701ee19c032e7dc439028bc52c10"
    console.log(str);
    $.ajax({url:str, dataType:'jsonp'})
    .done(function(weatherData){
        console.log(weatherData);
        displayData(weatherData);
    });
}

function displayData(wd) {
    var data = "";
    var src = "";
    var loc = wd.name;
    var tempF = Math.round(1.8 * (wd.main.temp - 273) + 32);
    console.log(loc);
    switch (wd.weather[0].icon) {
        case "01d":
          src = "images/sun.png";
          break;
        default:
          src = "images/def.png";
      }
    $("#weather").html(loc + "<br>" + tempF + "° F" + "<br>" + wd.weather[0].main + "<br>" + wd.weather[0].description + "<br>" + "<img src='" + src + "' height='100px' width='100px'>")
    console.log(wd.main.temp);

}

// api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=df3b701ee19c032e7dc439028bc52c10
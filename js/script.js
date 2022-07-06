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

function displayData(wd, ct) {
    var data = "";
    var icon = wd.weather[0].icon;
    var src = "";
    var cat = "";
    var loc = wd.name;
    var country = wd.sys.country;
    var feel = Math.round(1.8 * (wd.main.feels_like - 273) + 32);
    var tempF = Math.round(1.8 * (wd.main.temp - 273) + 32);
    console.log(loc);
    src = "http://openweathermap.org/img/wn/" + wd.weather[0].icon + "@2x.png";
    cat = "images/" + icon + ".png";

    data =
        loc + ", " + country + "<br>" + //City, country
        tempF + "° F" + "<br>" + //Temperature
        "Feels like: " + feel + "° F" + "<br>" + //Feels like temperature
        wd.weather[0].main + "<br>" + //Current weather
        wd.weather[0].description + "<br>" + //More info about current weather
        "<img src='" + src + "' height='100px' width='100px'>" + "<br>" + //Icons
        "<img id='cat' src='" + cat + "' height='100px' width='100px'>"; //cat

    $("#weather").html(data);

}

// api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&appid=df3b701ee19c032e7dc439028bc52c10
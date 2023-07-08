var URL="https://api.tomtom.com/search/2/search/";
var URL2= "https://api.openweathermap.org/data/2.5/forecast?";
var URL3= "http://openweathermap.org/img/wn/";
var URL4= "http://172.17.14.153/final.php?method=setWeather";
var mapJSON = {};
var weatherJSON = {};

function returnCoords() {
	a=$.ajax({
		url: URL + encodeURIComponent(document.getElementById('location').value) + ".json?limit=1&lat=37.337&lon=-121.89&minFuzzyLevel=1&maxFuzzyLevel=2&view=Unified&key=IHhGiA9eKldkTJBGpwTAnRMA00Bgej3B",
		method: "GET"
	}).done(function(data) {
		mapJSON = JSON.stringify(data);
		callWeather(data.results[0].position.lat, data.results[0].position.lon);
		// $("#console1").append(data.results[0].position.lat);
	}).fail(function(error) {
		console.log("Error Code: " + error.responseJSON.error.code + " | " + error.responseJSON.error.message);
		console.log("error",error.statusText);
	}); 
}

function callWeather(lat, lon) {
	console.log(lat);
	console.log(lon);
	a=$.ajax({
		url: URL2 + "lat=" + lat + "&lon=" + lon + "&appid=7f7971acdf814a4cd162d6b193918414",
		method: "GET"
	}).done(function(data) { 
		weatherJSON = JSON.stringify(data);
		imgChange(data);
		dateChange(data);
		textChange(data);
		storeResults(mapJSON, weatherJSON);
	}).fail(function(error) {
		console.log("Error Code: " + error.responseJSON.error.code + " | " + error.responseJSON.error.message);
		console.log("error",error.statusText);
	}); 
}

function storeResults(mapJSON, weatherJSON) {
	a=$.ajax({
		url: URL4, // + "&location=" +  + "&MapJSON=" + mapJSON + "&WeatherJSON=" + weatherJSON,
		method: "POST",
		data: {
			location: encodeURIComponent(document.getElementById('location').value),
			MapJSON: mapJSON,
			WeatherJSON: weatherJSON
		},
		dataType: "json"
	}).done(function(data) { 
		console.log("Output correctly stored in SQL Database");
	}).fail(function(error) {
		console.log("Error Code: " + error.responseJSON.error.code + " | " + error.responseJSON.error.message);
		console.log("error",error.statusText);
	}); 
}

function imgChange(data) {
	document.getElementById("day1").src= URL3 + data.list[0].weather[0].icon + "@2x.png"; // 0, 5, 14, 23, 32
	document.getElementById("day2").src= URL3 + data.list[8].weather[0].icon + "@2x.png";
	document.getElementById("day3").src= URL3 + data.list[16].weather[0].icon + "@2x.png";
	document.getElementById("day4").src= URL3 + data.list[24].weather[0].icon + "@2x.png";
	document.getElementById("day5").src= URL3 + data.list[32].weather[0].icon + "@2x.png";
  }
  
function dateChange(data) {
	document.getElementById("date1").innerHTML = new Date(data.list[0].dt_txt).toString().substring(0, 15); 
	document.getElementById("date2").innerHTML = new Date(data.list[8].dt_txt).toString().substring(0, 15); 
	document.getElementById("date3").innerHTML = new Date(data.list[16].dt_txt).toString().substring(0, 15); 
	document.getElementById("date4").innerHTML = new Date(data.list[24].dt_txt).toString().substring(0, 15); 
	document.getElementById("date5").innerHTML = new Date(data.list[32].dt_txt).toString().substring(0, 15); 
}

function textChange(data) {
	document.getElementById("hi1").innerHTML = "High: " + temp(data.list[0].main.temp_max).toString() + "F";
	document.getElementById("low1").innerHTML = "Low: " + temp(data.list[0].main.temp_min).toString() + "F";
	document.getElementById("forecast1").innerHTML = "Forecast: " + data.list[0].weather[0].description;
	document.getElementById("vis1").innerHTML = "Visibility: " + (data.list[0].visibility/100).toString() + "%";
	document.getElementById("hum1").innerHTML = "Humidity: " + data.list[0].main.humidity + "%";
	
	document.getElementById("hi2").innerHTML = "High: " + temp(data.list[8].main.temp_max).toString() + "F";
	document.getElementById("low2").innerHTML = "Low: " + temp(data.list[8].main.temp_min).toString() + "F";
	document.getElementById("forecast2").innerHTML = "Forecast: " + data.list[8].weather[0].description;
	document.getElementById("vis2").innerHTML = "Visibility: " + (data.list[8].visibility/100).toString() + "%";
	document.getElementById("hum2").innerHTML = "Humidity: " + data.list[8].main.humidity + "%";	
	
	document.getElementById("hi3").innerHTML = "High: " + temp(data.list[16].main.temp_max).toString() + "F";
	document.getElementById("low3").innerHTML = "Low: " + temp(data.list[16].main.temp_min).toString() + "F";
	document.getElementById("forecast3").innerHTML = "Forecast: " + data.list[16].weather[0].description;
	document.getElementById("vis3").innerHTML = "Visibility: " + (data.list[16].visibility/100).toString() + "%";
	document.getElementById("hum3").innerHTML = "Humidity: " + data.list[16].main.humidity + "%";	
	
	document.getElementById("hi4").innerHTML = "High: " + temp(data.list[24].main.temp_max).toString() + "F";
	document.getElementById("low4").innerHTML = "Low: " + temp(data.list[24].main.temp_min).toString() + "F";
	document.getElementById("forecast4").innerHTML = "Forecast: " + data.list[24].weather[0].description;
	document.getElementById("vis4").innerHTML = "Visibility: " + (data.list[24].visibility/100).toString() + "%";
	document.getElementById("hum4").innerHTML = "Humidity: " + data.list[24].main.humidity + "%";
	
	document.getElementById("hi5").innerHTML = "High: " + temp(data.list[32].main.temp_max).toString() + "F";
	document.getElementById("low5").innerHTML = "Low: " + temp(data.list[32].main.temp_min).toString() + "F";
	document.getElementById("forecast5").innerHTML = "Forecast: " + data.list[32].weather[0].description;
	document.getElementById("vis5").innerHTML = "Visibility: " + (data.list[32].visibility/100).toString() + "%";
	document.getElementById("hum5").innerHTML = "Humidity: " + data.list[32].main.humidity + "%";
	
	/*for (let j = 2; j <= 5; j++) {
		for (let k = 0; k<33; k+=8) {				
			}
	} */
}

function temp(num) {
  return Math.round(((num-273.15)*1.8)+32);
}

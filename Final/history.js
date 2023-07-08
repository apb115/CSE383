var URL="http://172.17.14.153/final.php/";
var count = 1;

function history() {
	const numLines = document.querySelector('input[type="number"]');
	const dateQuery = document.querySelector('input[type="date"]');
	a=$.ajax({
		url: URL + "?method=getWeather&date=" + dateQuery.value,
		method: "GET"
	}).done(function(data) {
		for (let i = 0; i < numLines.value; i++) {
			var tab = document.getElementById("table1");
			var row = tab.insertRow(i+2);
		
			if (data.result[i] !== undefined) {
				const dateAndTime = data.result[i].DateTime.split(" ");
				const mapData = JSON.parse(data.result[i].MapJson);
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				
				
				cell1.innerHTML = dateAndTime[0];
				cell2.innerHTML = dateAndTime[1];
				
				cell3.innerHTML = mapData.summary.query;
				cell4.innerHTML = mapData.results[0].position.lat;
				cell5.innerHTML = mapData.results[0].position.lon;
				
				var dateParam = dateAndTime[0];
				cell6.innerHTML = "<input type='button' value='Submit' onclick='weather(date.value" + ", " + count + ")'>";
				count+=1;
			} else {
				break;
			/*	var cell5 = row.insertCell(0);
				var cell6 = row.insertCell(1);
				var cell7 = row.insertCell(2);
				var cell8 = row.insertCell(3);
				var cell9 = row.insertCell(4);
				cell7.innerHTML = "End of Results";
				break; */
			}
			
		}
	}).fail(function(error) {
		$("#console").append("Error Code: " + error.responseJSON.error.code + " | " + error.responseJSON.error.message);
		console.log("error",error.statusText);
	}); 
}

function weather(date, count) {
	a=$.ajax({
		url: URL + "?method=getWeather&date=" + date,
		method: "GET"
	}).done(function(data) {
		
		document.getElementById("forecast1").innerHTML = "";
		document.getElementById("forecast1").innerHTML = "<table class='table loadTable' id='table2'><tbody><tr><th>Date</th><th>High</th><th>Low</th><th>Forecast</th><th>Humidity</th><th>Visibility</th></tr><tr></tr></tbody></table>";
		var tab2 = document.getElementById("table2");

		var weatherData = {}; 
		for (let i = 2; i < count+2; i++) {
			const test2 = document.getElementById("table1").rows[i].cells[1].innerHTML;
			
			// console.log(data.result[i-2].DateTime.substring(11,19));
			// console.log(test2);
			//console.log(data.result[i].DateTime.substring(11,19));
			if (data.result[i-2].DateTime.substring(11,19) === test2) {
				// console.log("pass");
				//console.log(data.result[i]);
				weatherData = JSON.parse(data.result[i-2].WeatherJson);
			}
		}
			console.log(weatherData);
			var row = tab2.insertRow(2);
			var row2 = tab2.insertRow(3);
			var row3 = tab2.insertRow(4);
			var row4 = tab2.insertRow(5);
			var row5 = tab2.insertRow(6);
			
			var cell1 = row.insertCell(0);
			var cell2 = row.insertCell(1);
			var cell3 = row.insertCell(2);
			var cell4 = row.insertCell(3);
			var cell5 = row.insertCell(4);
			var cell6 = row.insertCell(5);
			
			var cell7 = row2.insertCell(0);
			var cell8 = row2.insertCell(1);
			var cell9 = row2.insertCell(2);
			var cell10 = row2.insertCell(3);
			var cell11 = row2.insertCell(4);
			var cell12 = row2.insertCell(5);
			
			var cell13 = row3.insertCell(0);
			var cell14 = row3.insertCell(1);
			var cell15 = row3.insertCell(2);
			var cell16 = row3.insertCell(3);
			var cell17 = row3.insertCell(4);
			var cell18 = row3.insertCell(5);
			
			var cell19 = row4.insertCell(0);
			var cell20 = row4.insertCell(1);
			var cell21 = row4.insertCell(2);
			var cell22 = row4.insertCell(3);
			var cell23 = row4.insertCell(4);
			var cell24 = row4.insertCell(5);
			
			var cell25 = row5.insertCell(0);
			var cell26 = row5.insertCell(1);
			var cell27 = row5.insertCell(2);
			var cell28 = row5.insertCell(3);
			var cell29 = row5.insertCell(4);
			var cell30 = row5.insertCell(5);
			
			cell1.innerHTML	= new Date(weatherData.list[0].dt_txt).toString().substring(0, 15);
			cell2.innerHTML	= "High: " + temp(weatherData.list[0].main.temp_max).toString() + "F";
			cell3.innerHTML	= "Low: " + temp(weatherData.list[0].main.temp_min).toString() + "F";
			cell4.innerHTML	= "Forecast: " + weatherData.list[0].weather[0].description;
			cell5.innerHTML	= "Visibility: " + (weatherData.list[0].visibility/100).toString() + "%";
			cell6.innerHTML	= "Humidity: " + weatherData.list[0].main.humidity + "%";
			
			cell7.innerHTML	= new Date(weatherData.list[8].dt_txt).toString().substring(0, 15);
			cell8.innerHTML = "High: " + temp(weatherData.list[8].main.temp_max).toString() + "F";
			cell9.innerHTML = "Low: " + temp(weatherData.list[8].main.temp_min).toString() + "F";
			cell10.innerHTML = "Forecast: " + weatherData.list[8].weather[0].description;
			cell11.innerHTML = "Visibility: " + (weatherData.list[8].visibility/100).toString() + "%";
			cell12.innerHTML = "Humidity: " + weatherData.list[8].main.humidity + "%";	

			cell13.innerHTML	= new Date(weatherData.list[16].dt_txt).toString().substring(0, 15);
			cell14.innerHTML = "High: " + temp(weatherData.list[16].main.temp_max).toString() + "F";
			cell15.innerHTML = "Low: " + temp(weatherData.list[16].main.temp_min).toString() + "F";
			cell16.innerHTML = "Forecast: " + weatherData.list[16].weather[0].description;
			cell17.innerHTML = "Visibility: " + (weatherData.list[16].visibility/100).toString() + "%";
			cell18.innerHTML = "Humidity: " + weatherData.list[16].main.humidity + "%";	
			
			cell19.innerHTML	= new Date(weatherData.list[24].dt_txt).toString().substring(0, 15);
			cell20.innerHTML = "High: " + temp(weatherData.list[24].main.temp_max).toString() + "F";
			cell21.innerHTML = "Low: " + temp(weatherData.list[24].main.temp_min).toString() + "F";
			cell22.innerHTML = "Forecast: " + weatherData.list[24].weather[0].description;
			cell23.innerHTML = "Visibility: " + (weatherData.list[24].visibility/100).toString() + "%";
			cell24.innerHTML = "Humidity: " + weatherData.list[24].main.humidity + "%";
			
			cell25.innerHTML	= new Date(weatherData.list[32].dt_txt).toString().substring(0, 15);
			cell26.innerHTML = "High: " + temp(weatherData.list[32].main.temp_max).toString() + "F";
			cell27.innerHTML = "Low: " + temp(weatherData.list[32].main.temp_min).toString() + "F";
			cell28.innerHTML = "Forecast: " + weatherData.list[32].weather[0].description;
			cell29.innerHTML = "Visibility: " + (weatherData.list[32].visibility/100).toString() + "%";
			cell30.innerHTML = "Humidity: " + weatherData.list[32].main.humidity + "%";
			
	}).fail(function(error) {
		$("#console").append("Error Code: " + error.responseJSON.error.code + " | " + error.responseJSON.error.message);
		console.log("error",error.statusText);
	});
}

function temp(num) {
  return Math.round(((num-273.15)*1.8)+32);
}
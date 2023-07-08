// var URL="https://api.clearllc.com/api/v2/math/";

function loadWeather() {
	window.location = "./weather.html";
}

function loadDirections() {
	window.location = "./directions.html";
}


/* function add(n1, n2) {
	a=$.ajax({
		url: URL + "Add?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=" + n1 + "&n2=" + n2,
		method: "GET"
	}).done(function(data) {
		// add result box info here
		$("#console").html("");
		$("#console").append(data.result); // correct?
		// setTimeout(add,5000);
	}).fail(function(error) {
		$("#console").html("");
		$("#console").append("Error Code: " + error.responseJSON.error.code + " | " + error.responseJSON.error.message);
		console.log("error",error.statusText);
		// setTimeout(add,5000);
	}); 
} */
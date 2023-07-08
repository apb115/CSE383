var URL="https://api.clearllc.com/api/v2/math/";

function displayNum(n1) {
	$("#console").append(n1);
}

function displaySign(calcSign) {
	$("#console").append(calcSign);
}

function add(n1, n2) {
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
}

function subtract(n1, n2) {
	a=$.ajax({
		url: URL + "Subtract?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=" + n1 + "&n2=" + n2,
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
}

function multiply(n1, n2) {
	a=$.ajax({
		url: URL + "Multiply?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=" + n1 + "&n2=" + n2,
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
}

function divide(n1, n2) {
	a=$.ajax({
		url: URL + "Divide?api_key=bed859b37ac6f1dd59387829a18db84c22ac99c09ee0f5fb99cb708364858818&n1=" + n1 + "&n2=" + n2,
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
}

function equals() {
	var equation = $("#console").text();
	var len = equation.length;
	for (i=0;i<len;i++) {
		if (equation.charAt(i) == "+") {
			add(equation.substring(0,i), equation.substring(i+1, len));
			break;
		} else if (equation.charAt(i) == "-") {
			subtract(equation.substring(0,i), equation.substring(i+1, len));
			break;
		} else if (equation.charAt(i) == "*") {
			console.log("test");
			multiply(equation.substring(0,i), equation.substring(i+1, len));
			break;
		} else if (equation.charAt(i) == "/") {
			divide(equation.substring(0,i), equation.substring(i+1, len));
			break;
		}
	}
}
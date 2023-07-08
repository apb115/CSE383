var URL="https://ceclnx01.cec.miamioh.edu/~johnsok9/cse383/ajax/index.php";
var dfCounter=0;
var rootCounter=0;
var loadCounter=0;
var errorCounter=0;
var networkCounter=0;
var globalRX=0;
var globalTX=0;
getRoot();
getLoad();
getNetwork();



function getDisk() {

	a=$.ajax({
		url: URL + '/api/v1/df',
		method: "GET"
	}).done(function(data) {
		dfCounter++;
		//clear out old data
		$("#dfRun").html(dfCounter);
		$("#disk").html("");
		$("#disk").append("<tr><th>Mount Point</th><th>Size</th><th>Used</th></tr>");
		len = data.df.length;
		for (i=0;i<len;i++) {
			$("#disk").append("<tr><td>" + data.df[i].Mount+"</td><td>" + data.df[i].Size + "</td><td>" + data.df[i].Used + "</td></tr>");
		}
		// setTimeout(getDisk,1000);
	}).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		console.log("error",error.statusText);
		$("#log").prepend("df error "+new Date()+"<br>");
		
		// setTimeout(getDisk,1000);
	});
}

function getRoot() {

	a=$.ajax({
		url: URL + '/api/v1/ps',
		method: "GET"
	}).done(function(data) {
		rootCounter++;
		//clear out old data
		$("#processRun").html(rootCounter);
		$("#processes").html("");
		len = data.ps.length;
		for (i=0;i<len;i++) {
			$("#processes").append("<tr><td>" + data.ps[i].user+"</td><td>" + data.ps[i].pid + "</td><td>" + data.ps[i].runTime + "</td><td>" + data.ps[i].cmd + "</td></tr>");
		}
		setTimeout(getRoot,5000);
	}).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		console.log("error",error.statusText);
		$("#log").prepend("ps error "+new Date()+"<br>");
		
		setTimeout(getRoot,5000);
	});
}

function getLoad() {
	//console.log("getLoad();");
	a=$.ajax({
		url: URL + '/api/v1/loadavg',
		method: "GET"
	}).done(function(data) {
		loadCounter++;
		//clear out old data
		$("#loadRun").html(loadCounter);
		$("#onemin").html("");
		$("#fivemin").html("");
		$("#fifteenmin").html("");
		$("#numRunning").html("");
		$("#ttlProc").html("");
		$("#onemin").append(data.loadavg.OneMinAvg);
		$("#fivemin").append(data.loadavg.FiveMinAvg);
		$("#fifteenmin").append(data.loadavg.FifteenMinAvg);
		$("#numRunning").append(data.loadavg.NumRunning);
		$("#ttlProc").append(data.loadavg.TtlProcesses);
		setTimeout(getLoad,5000);
	}).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		console.log("error",error.statusText);
		$("#log").prepend("loadavg error "+new Date()+"<br>");
		setTimeout(getLoad,5000);
	});
}

function getNetwork() {

	a=$.ajax({
		url: URL + '/api/v1/network',
		method: "GET"
	}).done(function(data) {
		networkCounter++;
		//clear out old data
		$("#networkRun").html(networkCounter);
		$("#txbytes").html("");
		$("#rxbytes").html("");
		$("#txavg").html("");
		$("#rxavg").html("");
		$("#txbytes").append(data.network.txbytes);
		$("#txavg").append((data.network.txbytes-globalTX) / 5);
		$("#rxbytes").append(data.network.rxbytes);
		$("#rxavg").append((data.network.rxbytes-globalRX) / 5);
		globalTX = data.network.txbytes;
		globalRX = data.network.rxbytes;
		setTimeout(getNetwork,5000);
	}).fail(function(error) {
		errorCounter++;
		$("#logRun").html(errorCounter);
		console.log("error",error.statusText);
		$("#log").prepend("network error "+new Date()+"<br>");
		setTimeout(getNetwork, 5000);
	});
}


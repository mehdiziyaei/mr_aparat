console.log("Mr Aparat Create By Mr Point");

var sendMessageMrAparat = "";

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "StartMrAparat" ) 
	{	
		let status = localStorage.getItem("MrAparatStatus"); 
		//sendResponse({result: "Start Mr Aparat"});
		//console.log(status);
		if(status==="OFF" || status==null){
		let configValue = request.config;
		console.log("Start Mr Aparat");
		StartMrAparat(JSON.parse(configValue));
		}
    }
	if( request.message === "StopMrAparat" ) 
	{
		let status = localStorage.getItem("MrAparatStatus"); 
		if(status=="ON"){
		 console.log("Stop Mr Aparat");
		 StopMrAparat();
		}
	}

  }
);


function StartMrAparat(con)
{	
	localStorage.setItem("MrAparatStatus", "ON");
	let allSettingValue = con;
	let valuesList = allSettingValue.messageList;

	var conter =0;
	var maxConter = valuesList.length ;
	
	 sendMessageMrAparat = setInterval(function(){
		if(conter < maxConter)
		{
			$("#chat_input").val(valuesList[conter].text);
			conter ++;
		$(".send-button").click();	
		// console.log("send",conter);
		}
		else
		{
			console.log("RESTART TIME");
			RestartMrAparat(allSettingValue); 
	    }
		}, allSettingValue.timeBetweenMessage);
}


function RestartMrAparat(SettingValue)
{
	//let settingResult = localStorage.getItem("MrAparat"); 
	let config = SettingValue;
	console.log("RESTART");
	clearInterval(sendMessageMrAparat);
     setTimeout(StartMrAparat(config), config.timeBetweenRun);
}

function StopMrAparat()
{
	localStorage.setItem("MrAparatStatus", "OFF");
	clearInterval(sendMessageMrAparat);
}


// function CheckLS()
// {
	// let MrAparatSetting = {};
   // if(!localStorage.MrAparat)
    // {
	// let	MrAparatSetting = {
			// status :'enable',
			// timeBetweenMessage:60000,
			// timeBetweenRun :300000,
			// messageList:[
			// {text:'Create By Mr Point',value:0},
			// {text:'mehdi_ziyaei@yahoo.com',value:1}
			// ]
		// };
		// SaveMrAparatConfig(MrAparatSetting);
		// //localStorage.setItem("MrAparat", JSON.stringify(MrAparatSetting));
	// }
// }

// function SaveMrAparatConfig(con)
// {
	// localStorage.setItem("MrAparat", JSON.stringify(con));
// }

// function getMrAparatConfig()
// {
	// let config = localStorage.getItem("MrAparat"); 
	// let result = JSON.parse(config);
	// return result;
// }
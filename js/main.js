

//var MessageList=[];
var editSelectValue = 0;
var greenResult=0;
var redResult=0;

$( document ).ready(function() {
	let MrAparatSetting = {};
   if(localStorage.MrAparat)
    {
	    let result = localStorage.getItem("MrAparat"); 
		MrAparatSetting = JSON.parse(result);
		MessageList = MrAparatSetting.messageList;
	}
	else
	{
		MrAparatSetting = {
			status :'enable',
			timeBetweenMessage:60000,
			timeBetweenRun :300000,
			messageList:[
			{text:'Create By Mr Point',value:0},
			{text:'mehdi_ziyaei@yahoo.com',value:1}
			]
		};
		localStorage.setItem("MrAparat", JSON.stringify(MrAparatSetting));
	}
	

			
		setStatus(MrAparatSetting.status);
});

 function prbar(color) {
     let elem = document.getElementById("progress");
     let width = 0;
	 greenResult=0;
     redResult=0;
	 elem.style.width = width + '%';
	 let st = setTimeout(function(){
		 let id = setInterval(frame, 5);
		function frame() {
			 if(color =="green"){
				 elem.style.backgroundColor ="#49cc0e";
				 if (width >= 100) {
					 clearInterval(id);
					greenResult =1;
				} else {
					 width++;
					 elem.style.width = width + '%';
				 }
			}
			if(color =="red"){
				 elem.style.backgroundColor ="red";
				 if (width >= 100) {
					 clearInterval(id);
					 redResult = 1;
				 } else {
					 width++;
					 elem.style.width = width + '%';
				 }
			 }
		}
     },2000);
 }

// function SendMessage()
// {	
	// console.log("Mr Point");
	// console.log(document.location);
	// var siteName =  document.location.origin ;
	// var checkLivePage = document.location.pathname.split("/").pop();
	// if(siteName != "https://www.aparat.com")
	// {
		// return;
	// }
	// else
	// {
		// if(checkLivePage!="live"){return;}
	// }
	// let settingResult = localStorage.getItem("MrAparat"); 
	// let allSettingValue = JSON.parse(settingResult);
	// let valuesList = allSettingValue.messageList;

	// var conter =0;
	// var maxConter = valuesList.length +1;
	
	// var sendMessageMrAparat = setInterval(function(){
		// if(conter < maxConter){
			// $("#chat_input").val(valuesList[conter].text);
			// conter ++;
		// $(".send-button").click();	}
		// }, allSettingValue.timeBetweenMessage);
// }


 function setStatus(param){
	if( param =="enable"){
		 $("#toggleBtn").text("Disable");
		 $("#toggleBtn").removeClass("btn-success");
		 $("#toggleBtn").addClass("btn-danger");
		 
		
		// let checkBoxes = $("#toggleBtn");
	    // checkBoxes.prop("checked",true);
		// $("#toggelLable").html("Mr Aparat is on");
		 prbar('green');
	    // if(greenResult ==1){
		let settingResult = localStorage.getItem("MrAparat"); 
		let allSettingValue = JSON.parse(settingResult);
		allSettingValue.status = "enable";
		localStorage.setItem("MrAparat", JSON.stringify(allSettingValue));
		console.log("RUN");
		//StartMrAparat();
		 //var runMrAparat = setInterval(SendMessage, allSettingValue.timeBetweenRun);
			//chrome.runtime.sendMessage({message: "StartMA"});
			let settingJS = JSON.stringify(allSettingValue);
			 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: "StartMrAparat" , config : settingJS},
				// function(response) 
				// {console.log(response.result)}
				);
			});
		}
		 // }
		
	if( param =="disable"){
		 $("#toggleBtn").text("Enable");
		 $("#toggleBtn").removeClass("btn-danger");
		$("#toggleBtn").addClass("btn-success");
		//document.getElementById("status").style.color = "Red";
			 prbar('red');
		//clearInterval(sendMessageMrAparat);
		
		
		// let checkBoxes = $("#toggleBtn");
     	// checkBoxes.prop("checked",false);
		// $("#toggelLable").html("Mr Aparat is off");
	    // if(redResult ==1){
		let settingResult = localStorage.getItem("MrAparat"); 
		let allSettingValue = JSON.parse(settingResult);
		allSettingValue.status = "disable";
		localStorage.setItem("MrAparat", JSON.stringify(allSettingValue));
		
			//chrome.runtime.sendMessage({message: "StopMA"});
			 chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				chrome.tabs.sendMessage(tabs[0].id, {message: "StopMrAparat"});

			});
		}
	// }
 };
 
 
 
$("#toggleBtn").click(function(){
	if($("#toggleBtn").text() =="Enable")
	{
		$("#manageForm").hide(500);
		setStatus('enable');
	}
	else
	{
		setStatus('disable');
	}
 });

$("#manageBtn").click(function(){
	if($("#manageForm").css('display')!= 'none'){$("#manageForm").hide(500);}else{$("#manageForm").show(500);setStatus('disable');loadItems()}
});

$("#addMessageBtn").click(function(){
	let selectValue  = 0;
	let selectText = $('#messageInput').val();
	addItemToSelectList(selectText,selectValue);
});

function addItemToSelectList(selectText,selectValue)
{
	if(selectText =="" || selectText ==null || selectText == undefined || selectText.trim() ==""){return;}
	
	let settingResult = localStorage.getItem("MrAparat"); 
	let allSettingValue = JSON.parse(settingResult);
	let valuesList = allSettingValue.messageList;

	let addValue = document.getElementById("messageSelectList");
	let newOption = document.createElement("option");


	if(editSelectValue == 0)
	{
		newOption.text = selectText;
		let newSelectValue = Math.floor(Math.random() * 100000) + 1;
		newOption.value = newSelectValue
		addValue.add(newOption);
		valuesList.push({text:selectText ,value:newSelectValue});
	}else
	{		
	    valuesList = valuesList.filter(function(ele){ return ele.value != editSelectValue; });
		valuesList.push({text:selectText ,value:editSelectValue});
		
		 $("#messageSelectList option[value='" + editSelectValue + "']").remove();

		newOption.text = selectText;
		newOption.value = editSelectValue
		addValue.add(newOption);
		editSelectValue =0;

	}
	$('#messageInput').val("");
	// $('#messageSelectList').empty();
	allSettingValue.messageList = valuesList;
	localStorage.setItem("MrAparat", JSON.stringify(allSettingValue));
    //loadItems();
}

$("#editMessageBtn").click(function(){
	let editValue = document.getElementById('messageSelectList');
	let selectEditValue = editValue.options[editValue.selectedIndex].value;
	let selectEditText = editValue.options[editValue.selectedIndex].text;
	$('#messageInput').val(selectEditText);
	
	editSelectValue = selectEditValue;
	
});

$("#deleteMessageBtn").click(function(){
	
	let result = localStorage.getItem("MrAparat"); 
	let allSettingValue = JSON.parse(result);
	let valuesList = allSettingValue.messageList;
	
	let deleteValue = document.getElementById('messageSelectList');
	let selectValue = deleteValue.options[deleteValue.selectedIndex].value;
	deleteValue.remove(deleteValue.selectedIndex);	
	valuesList = valuesList.filter(function(ele){ return ele.value != selectValue; });
	allSettingValue.messageList = valuesList;
	localStorage.setItem("MrAparat", JSON.stringify(allSettingValue));
});

function loadItems()
{
	let loadResult = localStorage.getItem("MrAparat"); 
	let allSetting = JSON.parse(loadResult);
	let msList = allSetting.messageList;
	
	
	let inputTimeBetweenRun = ((allSetting.timeBetweenRun)/1000)/60;
	let inputTimeBetweenMessage = (allSetting.timeBetweenMessage)/1000;
	$('#inputTimeBetweenRun').val(inputTimeBetweenRun)//min  
	$('#inputTimeBetweenMessage').val(inputTimeBetweenMessage)//sec  
	
	let addValue = document.getElementById("messageSelectList");

	if(msList.length >0){
		for(let i = 0 ; i<msList.length;i++)
		{
			let newOption = document.createElement("option");
			newOption.text = msList[i].text;
			newOption.value = msList[i].value;
			addValue.add(newOption);
		}
	}
}

$("#saveBtn").click(function(){

	let inputTimeBetweenRunValue = $('#inputTimeBetweenRun').val();//min  
	let inputTimeBetweenMessageValue = $('#inputTimeBetweenMessage').val();//sec  
	let runtime = "" ;
	let messagetime = "";

	 if(inputTimeBetweenRunValue != null && inputTimeBetweenRunValue != undefined && inputTimeBetweenRunValue.trim() != "")
	{   let chkI_T_B_R = (inputTimeBetweenRunValue*60)*1000;
		 if(chkI_T_B_R > 59999 && chkI_T_B_R < 600001 )
		 {
			 runtime = chkI_T_B_R;
		 }else
		 {
			 runtime = 300000 ;
		 }
	}

	if(inputTimeBetweenMessageValue != null && inputTimeBetweenMessageValue != undefined && inputTimeBetweenMessageValue.trim() != "")
	{   let chkI_T_B_M = inputTimeBetweenMessageValue*1000;
		 if(chkI_T_B_M >24999 && chkI_T_B_M < 300001 )
		 {
			 messagetime = chkI_T_B_M;
		 }else
		 {
			  messagetime = 60000;
		 }
	}
	
	let settingResult = localStorage.getItem("MrAparat"); 
	let allSettingValue = JSON.parse(settingResult);
	
	allSettingValue.timeBetweenMessage = messagetime;
	allSettingValue.timeBetweenRun = runtime;
	
	localStorage.setItem("MrAparat", JSON.stringify(allSettingValue));
});
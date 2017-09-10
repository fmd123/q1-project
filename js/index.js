(function(){

//Materialize button collapse
//from init.js file that came with template

(function($){
  $(function(){

    $('.button-collapse').sideNav();

  }); // end of document ready
})(jQuery); // end of jQuery name space



// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(document).ready(function(){
var searchWord = "";
var articles = [];
var results = [];

// GUARDIAN::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	$("#go").click((event)=>{

		event.preventDefault();

		searchWord = $("#wordInput").val().trim();
		if(searchWord.length === 0){
			alert("Please Enter A Word");
			return;
		}else{
			getResultsG(searchWord);
			$("#wordInput").text("");
		}
	});

function getResultsG(searchWord) {
	//console.log("inside getResults: " + searchWord);
     $.ajax({
        url: 'https://content.guardianapis.com/search?api-key=f9588bdb-e1b7-424b-974d-7aabd978c542&q='+searchWord,
        method: "GET",
        dataType: "json",
				     // data:{
				     //    q: searchWord
				    	// }
				        // // 	api-key: ""if I did it this way just the key with no "api-key =" part
				        // }

      }).done((response) => {
		parseResultG(response);
      }).fail((err) =>{
      	console.log("Unable to find word", err)
      	alert("Unable to Find Word");
  	})
}


    function parseResultG(response){

    	var articleArr = response.response.results;

    	console.log (articleArr);

    	articles = [];
    	for(let i=0; i<articleArr.length; i++){
    		var obj = {
    			title: articleArr[i].webTitle,
    			url : articleArr[i].webUrl,
    			date : articleArr[i].webPublicationDate
    			}

    		articles.push(obj);
    	}
    	console.log(articles);
    	renderResultG(articles);
    }



   function renderResultG(array){
   	//empty #renderedResults
	   	$("#renderedResults").empty();
	   	//append
	   	for(let i= 0; i<articles.length; i++){
	   		var articleDate = "";
	   		var d = new Date(articles[i].date);
	   		var articleDate = d.toDateString();
	   		//I can slice off the time later. OK for now.

		   	$("#renderedResults").append(`<div class = 'itemHere'><p>${articles[i].title}</p><a target = "_blank" rel = "noopener" href = "${articles[i].url}">${articles[i].url}</a><p>${articleDate}</p></div><br>`)
		   	//add date in when I have time to format it <p>${articleDate}</p>
		}
	}

//:::WORDNIK SYNONYM:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$("#synonym").click((event)=>{

	event.preventDefault();

	searchWord = $("#wordInput").val().trim();
	if(searchWord.length === 0){
			alert("Please Enter A Word");
			return;
	}else{
		console.log("inside click event: " + searchWord);
		getResultsS(searchWord);
		$("#wordInput").text("");
	}

});


function getResultsS(searchWord) {

     $.ajax({
        url: 'http://api.wordnik.com:80/v4/word.json/'+searchWord +'/relatedWords?useCanonical=false&relationshipTypes=synonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5',
        method: "GET",
        dataType: "json",


      }).done((response) => {
		parseResultS(response);
      }).fail((err) =>{
      	console.log("Unable to find word", err)
      	alert("Unable to Find Word");
  	})
}




function parseResultS(response){
		console.log(response);

		if (response.length === 0){
     		alert("No Synonyms Found")
     		return;
     	}else{
    	var synonymArr = response[0].words;

    	console.log("synonymArr inside parseResults: ", synonymArr)
    	renderResultsS(synonymArr);
    }
    }



   function renderResultsS(synonymArr){
   		console.log("render");
   		console.log(synonymArr)
   	//empty #renderedResults
	   	$("#renderedResults").empty();
	   	//append
	 for(let i= 0; i<synonymArr.length; i++){
		$("#renderedResults").append(`<div class = 'itemHere'><p>${synonymArr[i]}</p></div><br>`)
		 }
	}

// ::::NYT::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	$("#nyt").click((event)=>{

		event.preventDefault();

		searchWord = $("#wordInput").val().trim();
		if(searchWord.length === 0){
			alert("Please Enter A Word");
			return;
		}else{
			console.log("inside click event: " + searchWord);
			getResultsN(searchWord);
			$("#wordInput").text("");
		}
	});

	function getResultsN(searchWord) {
		console.log("inside getResults: " + searchWord);
			var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
			url += '?' + $.param({
			  'api-key': "f81673fdb9a54c93a6d79b0825eb212b",
			  'fq': searchWord,
			  'sort': "oldest"
			});
			$.ajax({
			  url: url,
			  method: 'GET',
			}).done(function(result) {
			  parseResultN(result);
			}).fail(function(err) {
			  throw err;
			});

	}




function parseResultN(result){
		console.log("inside parseResults: ", result);
    	var resource = result.response.docs;
    	console.log("resource inside parse: ", resource);

    	console.log(resource[1].pub_date);
    	console.log(resource[1].snippet);
    	console.log(resource[1].headline.main);
    	console.log(resource[1].web_url);

    	renderResultN(resource);
    }

function renderResultN(resource){

   	//empty #renderedResults
	   	$("#renderedResults").empty();
	   	//append
	   	for(let i= 0; i<resource.length; i++){
	   		var d = new Date(resource[i].pub_date);
	   		var articleDate = d.toDateString();
	   		var headline = resource[i].headline.main;
	   		console.log(headline);

		   	$("#renderedResults").append(`<div class = 'itemHere'><p class ="here">${resource[i].headline.main}</p><a target = "_blank" rel = "noopener" href = "${resource[i].web_url}">${resource[i].web_url}</a><p>${resource[i].snippet}</p><p>${articleDate}</p></div><br>`)
		   	//FOR LATER: ADD A MODAL FOR DISPLAYING SNIPPET
		   	//p>${resource[i].snippet}</p>
		 	//	let myBtn = $("#myBtn")
			// let closeBtn = $(".close")

			// myBtn.click((event)=>{
			// 	event.preventDefault();
			// 	let modalContent = $(".modal-content")
			// 	modalContent.style.display = "block";
			// })

			// closeBtn.click((event)=>{
			// 	$(".modal-content").style.display = "none";
			// })
		}
	}




// :::OTHER POSSIBLE APIs:::::::::::::::::::::::::
// https://www.programmableweb.com/api/neutrino-bad-word-filter
//https://www.programmableweb.com/api/pressmoncom
//https://www.programmableweb.com/api/notable-and-quotable-random-quote




// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
}); //end of document.ready
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
})(); //END OF iife that puts in strict mode

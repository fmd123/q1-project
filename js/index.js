(function(){

//Materialize button collapse
//from init.js file that came with template
//INIT.JS is CURRENTLY COMMENTED OUT IN HTML

// (function($){
//   $(function(){

//     $('.button-collapse').sideNav();

//   }); // end of document ready
// })(jQuery); // end of jQuery name space
// Is this going to conflict with my other JS?

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

$(document).ready(function(){
var searchWord = "";
var articles = [];


//Click Handler:::::::::::::::::::::::::::::::::::::::::::
var results = [];
$("#go").click((event)=>{
	
	event.preventDefault();
	
	searchWord = $("#wordInput").val().trim();
	//add some additional validation to prevent entering numbers?
	//or do I want capable of searching string numbers?
	
	console.log("inside click event: " + searchWord);

	getResults(searchWord);
	$("#wordInput").text("");
	// results = [];

});
//GUARDIAN:

function getResults(searchWord) {
		// debugger;
		console.log("inside getResults: " + searchWord);
      $.ajax({
        url: 'https://content.guardianapis.com/search?api-key=f9588bdb-e1b7-424b-974d-7aabd978c542&q='+searchWord,
        method: "GET",
        dataType: "json",
     //    data:{
     //    q: searchWord
    	// }
        // // 	api-key: ""if I did it this way just the key with no "api-key =" part
        // } 
     
      }).done((response) => {
		parseResult(response);
      }).fail((err) =>{
      	console.log("Unable to find word", err)
      	alert("Unable to Find Word");
  })
    }


    function parseResult(response){

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
    	renderResult(articles);
    }



   function renderResult(array){
   	//empty #renderedResults
	   	$("#renderedResults").empty();
	   	//append
	   	for(let i= 0; i<articles.length; i++){
		   	$("#renderedResults").append(`<div class = 'itemHere'><p>${articles[i].title}</p><a target = "_blank" href = "${articles[i].url}">${articles[i].url}</a><p>${articles[i].date}</p></div><br>`)
		}
	}
   //structure of where I want to append to:
   // </div>
   //  <div class = "row center" id = "renderedResults">
   //  </div>
//GET abstract and search the string for word
//return array of articles with the word inside #input
//How far back do I want to go?

//WORDNIK
//GET the definition
//return and put into #input

//NYT 






// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
}); //end of document.ready
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
})(); //END OF iife that puts in strict mode
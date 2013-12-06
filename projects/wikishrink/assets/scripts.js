$(document).ready(function() {
	$("#go").click(function(e) {
			onLoadJson($('#title').val(), $('#limit').val());
	});
	
		$("#loading-small").ajaxStart(function(){
		$(this).show();
	});
	
	$("#loading-small").ajaxStop(function(){
	   $(this).hide();
	});
	

});

function gen() {
	$('#results li span.title, div.right a').click(function(e) {
		if($(this).attr('href')) {
			e.preventDefault();
			var text = $(this).attr('href');
			text = text.substr(29,text.length);
			onLoadJson(text, $('#limit').val());
			console.log(text);
		}
		else {
			e.preventDefault();
			onLoadJson($(this).text(), $('#limit').val());
		}
	});
}

function showText() {
	var text = $('div.right').children().next('p').first().text().replace(/\[[^\]]*?\]/g, '').replace(/ *\([^)]*\) */g, " ");
	var view_more = $("a.view-more").attr("href");
	if(text.length > 10) {
		$("#results").html("<p>" + text + " <a href='" + view_more + "'>...</a></p>");
	} else {
		$('#go').attr("value","Try again?");
		$("#results").text("Sorry, didn't find anything.");
	}
	//$('div.right').children().next('p').first().css('display','block');
	//$('div.right').children().next('p').first().next().css('display','block');
}

function onLoadJson(query, limit) {
	
	// config parameters
	var options = {
		type: "GET",
		url: 'curl.php?' + 'title=' + query + '&limit=1' ,
		timeout: 180000, // 6 seconds
		success: function(data, textStatus) {
			//console.log(data);
		},
		error: function(xhr, textStatus, errorThrown) {
			//console.log(' returned error: ' +errorThrown + '\n and status:' + xhr.status + ' ' + xhr.responseText);
		},
		complete: function(xhr, textStatus) {
			 //console.log('\n complete - returned status: '+' ' +xhr.status);
			 
			$('#results').html(xhr.responseText);
			 gen();
			 showText();
		},
	};
	

	// fetch json
	jQuery.ajax(options);
	
	  
}



jQuery(document).ready(function() {
	$(function() {
		var cache = {},
			lastXhr;
		$( "#title" ).autocomplete({
			minLength: 3,
			delay: 1000,
			source: function( request, response ) {
				var term = request.term;
				if ( term in cache ) {
					response( cache[ term ] );
					return;
				}
				
				$('#loading').ajaxStart(function() {
				  $(this).show();
				});
				
				$('#loading').ajaxStop(function() {
				  $(this).hide();
				});

				lastXhr = $.getJSON( "autocomplete.php", request, function( data, status, xhr ) {
					cache[ term ] = data;
					if ( xhr === lastXhr ) {
						response( data );
						console.log(data);
					}
				});
			},
			 select: function(event, ui) { 
			 
				onLoadJson(ui.item.label, $('#limit').val());
				//console.log(ui.item);
				/* retrieve additional info for selected item  
				$.get("fetch.php", { "item-name": name},
				   function(data){
					 console.log("Data Loaded: " + data);
				}); */
				
			 }
		});
	});
	
});
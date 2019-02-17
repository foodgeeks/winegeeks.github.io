// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-94393-2', 'winegeeks.com');
ga('require', 'displayfeatures');
ga('send', 'pageview');

$(window).load(function() {
  // auto focus on food journal entry area
  $('#q').focus(); 
    
  // Send user to google.com to perform site search
  $('#search-form').submit(function() {
    var search_string = $('#q').val();
	var search_query = encodeURI('q=site:winegeeks.com ' + search_string);
	var redirect_url = "https://www.google.com/search?" + search_query;
    window.location.href = redirect_url;
	return false;
  });
  
  // Send user to google.com to perform site search
  $('#search-form-bottom').submit(function() {
    var search_string = $('#q2').val();
	var search_query = encodeURI('q=site:winegeeks.com ' + search_string);
	var redirect_url = "https://www.google.com/search?" + search_query;
    window.location.href = redirect_url;
	return false;
  });
  
  // Print current year in copyright
  $("#copyright-to-date").html(new Date().getFullYear());
});

// Show or hide the bottom navigation bars 
function showHideBars() {
  var bars = document.getElementById('bars');
  if (!bars.style.display || bars.style.display == "none") {
	  $("#bars-search").hide("fast");
	  $("#bars").show("fast");
  } else {
	  $("#bars-search").hide("fast");	
	  $("#bars").hide("fast");		
  }
}

// Show or hide the bottom search bars 
function showSearchBar() {
  var bars = document.getElementById('bars-search');
  if (!bars.style.display || bars.style.display == "none") {
	  $("#bars").hide("fast");	
	  $("#bars-search").show("fast");		  
  } else {
	  $("#bars").hide("fast");		
	  $("#bars-search").hide("fast");	
  }
}

// Grab the browser height
function getBrowserHeight() {
  var height = window.innerHeight ||
               document.documentElement.clientHeight ||
               document.body.clientHeight;
  return height;
}

// Grab the browser height / width
function getBrowserWidth() {
  var width = window.innerWidth ||
              document.documentElement.clientWidth ||
              document.body.clientWidth;
  return width;
}

// Determine whether or not to display the leaderboard advertisement
function removeLeaderboardAd(desktopLeaderboard, tabletLeaderboard) {
  var desktopLeaderboard = parseInt(desktopLeaderboard);
  var tabletLeaderboard = parseInt(tabletLeaderboard);
  var width = getBrowserWidth();
  if (width >= 992 && desktopLeaderboard == 728) {
    return true;
  }
  else if (width >= 768 && width < 992 && tabletLeaderboard == 728) {
    return true;		
  } 
  else {
    $("#ad-top-container").remove();		
	$("#ad-top-leaderboard").remove();	
  }
}

// Determine whether or not to display the mobile leaderboard advertisement (display when browser width < 768px)
function removeMobileLeaderboardAd() {
  var width = getBrowserWidth();
  if (width < 768) {
	return true;
  } else {
    $("#ad-top-container").remove();	
    $("#ad-top-mobile-leaderboard").remove();	
  }
}

// Determine whether or not to display the right advertisement (display when browser width >= 992px)
function removeRightAd() {
  var width = getBrowserWidth();
  if (width >= 992) {
	return true;
  } else {
    $("#ad-right").remove();
    $("#ad-right-2").remove();	
  }
}

// Handles the clicking of the stars in recipe review area
function recipeReviewRating(num) {
  // clean out the stars
  for (i = 1; i <= 5; i++) {
  	var elementId = 'star_' + i;
      $('#' + elementId).addClass('fa-star-o');
      $('#' + elementId).removeClass('fa-star');		
  }
  // add the stars back in
  for (i = 1; i <= num; i++) {
  	var elementId = 'star_' + i;
      $('#' + elementId).addClass('fa-star');
      $('#' + elementId).removeClass('fa-star-o');
  }
  $("#rating").val(num);	 
}

// Determine whether or not a username is available
function usernameAvailable(){
	var username = document.getElementById('username').value;
	$.ajax({
   		type: "POST",
   		url: "auth/register_username_available",
   		data: "username="+username+"&ajax=1",
		dataType: "json",
   		success: function(msg){
			$("#username-group").removeClass("has-error");
			$("#username-group").removeClass("has-success");
			$("#usernameStatus").removeClass("glyphicon-ok");
			$("#usernameStatus").removeClass("glyphicon-remove");
		    if (msg.status == 'error') {
				$("#username-group").addClass('has-error');			
				$("#username-group").addClass('has-feedback');	
				$("#usernameStatus").addClass("glyphicon-remove");
		    }
			if (msg.status == 'success') {
				$("#username-group").addClass('has-success');			
				$("#username-group").addClass('has-feedback');	
				$("#usernameStatus").addClass("glyphicon-ok");				
			}
			$("#usernameAvailable").show('fast');
			$("#usernameAvailable").addClass(msg.status);
			$("#usernameAvailable").html(msg.message);
 		}
 	});
}

// alter images on recipe page
function alterImage() {
  var elementId = 'primary-image';
  if (img = document.getElementById(elementId)) {
    var width = img.naturalWidth;
    var height = img.naturalHeight;
    var browserWidth = getBrowserWidth();
    if (height >= width && browserWidth > 767) {
      $( "#recipe-photo" ).addClass( "recipe-photo-portrait" );
      $( "#recipe-photo" ).removeClass( "recipe-photo-landscape" );  
    
      $( "#table-recipe-title" ).addClass( "recipe-title-time-photo-portrait" );
      $( "#table-recipe-title" ).removeClass( "recipe-title-time-photo-landscape" );  
    }
  }
}

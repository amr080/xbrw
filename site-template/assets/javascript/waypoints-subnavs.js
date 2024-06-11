// set variables
var isMobile = window.matchMedia("only screen and (max-width: 1200px)");
var mastheadHeroHeight = $('.hero-short').height();
var windowHeight = $( window ).height();
var fundNavBorder=2;
var contentPadding = 44;
var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

var initializeWayNav = function(){
	
	 //waypoint fund nav trigger loop
	
	$.each($('.waypoint__subnav'), function(i, el){
	
		 var self = $(this);
		 window["initway"+i];
		
		window["initway"+i] = new Waypoint({
			element: el,
			 handler: function(){

				 var waypointID = $(el).attr('id');
				 setActiveSelection(waypointID);
			 },
			offset: mastheadHeroHeight
		});
				
	});
		
}

$(".subnav__link").click(function(e) {
	e.preventDefault();
	Waypoint.disableAll();
	
	
	var scrollToID = $(this).attr('href');
	
	var scrollToPadding = 150; // collaped hero height
	
	
	// add active class to sidebar for consistent offset detection.
	$('.hero-short').addClass('hero-short--collapsed');
	$(".subnav__wrapper").addClass("subnav__wrapper--fixed");

	$('html, body').animate({
		scrollTop: $(scrollToID).offset().top - scrollToPadding
	}, 200).promise().done(function () {
		Waypoint.enableAll();
	});

	$('.subnav__item').removeClass('active');
	$(this).parent().addClass('active');
		

});

$(document).ready(function(){
	initializeWayNav();	
	
}); // close doc ready



$(window).scroll(function () {
	//initializeWayNav();	
	checkOffset(); 
	
});

$(window).resize(function () {
	//initializeWayNav();	
	checkOffset(); 
});

var checkOffset = function() {
	
	if (!isMobile.matches) {
		$('.subnav, .subnav.active').width($('.subnav, .subnav.active').parent().outerWidth()-fundNavBorder);
		$('.sidebar, .sidebar.active').width($('.sidebar, .sidebar.active').parent().outerWidth()-fundNavBorder);
	} else {
		// set widths to parent
		$('.subnav-mobile, .subnav-mobile.active').width($('.subnav-mobile, .subnav-mobile.active').parent().innerWidth()-contentPadding);
		$('.sidebar, .sidebar.active').width($('.sidebar, .sidebar.active').parent().innerWidth()-fundNavBorder);
	}
	
} // closes checkOffset

// mobile select dropdown change function
$( ".subnav-mobile" ).change(function() {
	Waypoint.disableAll();
	var scrollToPadding = 100;
	var anchor = $(this).val();

	$('html, body').animate({
		scrollTop: $(anchor).offset().top - scrollToPadding
	}, 200).promise().done(function () {
		Waypoint.enableAll();
	});	
});


// takes id from clicked link
var setActiveSelection = function(str){
		var currentSelectionText = $('.subnav__'+str).text();
		
		$('.subnav__item').removeClass('active');
		$('.subnav__'+str).addClass('active');
		$('.styledSelectMobile').html(currentSelectionText);	
 		
}// JavaScript Document
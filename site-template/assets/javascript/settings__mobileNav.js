// DRAW mobilenav FUNDS from Fund MAP
var fundDropdownLinks = "";
var resourceDropdownLinks = "";
var contactDropdownLinks = "";
var iconBlockWidth = $( 'collapseMenuButton' ).width();
var mobileMenuState = 0;

for(var i=0;i<fund_map.length;i++){
	fundDropdownLinks += '<a href="../'+fund_map[i].pageName+'" class="mainNavMobile__sublink" tabindex="0">'+fund_map[i].title+'</a>'; 
	resourceDropdownLinks += '<a href="../resources/'+fund_map[i].pageName+'" class="mainNavMobile__sublink" tabindex="0">'+fund_map[i].title+'</a>';
	contactDropdownLinks += '<a class="modal-contact-link mainNavMobile__sublink" tabindex="0" data-ticker='+fund_map[i].tickerArray[0]+'>'+
		fund_map[i].title +'</a></li>';
}

$('#mobileProductList').append(fundDropdownLinks);
$('#mobileResourceList').append(resourceDropdownLinks);
$('#mobileContactList').append(contactDropdownLinks);

$('body').prepend($('#mobilemenu'));


$( 'document' ).ready(function() {
	$( "mobileNavButton, .logoBarMobile__x" ).click( function () {
		mobileNavClickToggle();
	});
});

var mobileNavClickToggle = function() {

	if (window.mobileMenuState) {

		$('body').removeClass('mobilenav-open');
		window.mobileMenuState = 0;
		$( '#mobilemenu' ).animate( {
			left: '-100%'
		}, {
			duration: 100,
			easing: 'easeInQuad'
		});

		$('#mobilemenu').hide();
		$('#navamongus').slideDown('fast');

	} else {

		$('body').addClass('mobilenav-open');
		window.mobileMenuState = 1;
		$('#mobilemenu').animate( {
			left: '0'
		}, {
			duration: 100,
			easing: 'easeInQuad'
		});
		$('#mobilemenu').css( 'display', 'block' );
		$('#navamongus').slideUp('fast');
		$('.mobileLogo__link').focus();

	}
}

$('mmh1').on('focus', function() {
	if ($('body').hasClass('user-is-tabbing') == true) {
		$(this).next().addClass( 'active' );
		$(this).addClass('active');
	}
});


$('.mainNavMobile__sublink:last-child').on('blur', function() {
	$(this).parent().prev().removeClass( 'active' );
	$(this).parent().removeClass('active');
});

$('.icon').click( function() {
	if ($(this).next().hasClass('active')) {
		$(this).next().removeClass('active');
		$(this).removeClass('active');
	} else {
		$(this).next().addClass('active');
		$(this).addClass('active');
	}
});

$('.backArrow').click(function() {
	if ($(this).parent().hasClass('active')) {
		$(this).parent().removeClass('active');
	} else {
		$(this).parent().addClass('active');
	}
});

$('.footerNavMobile .social__li:last-child a').on('blur', function() {
	$('.logoBarMobile a:first-child').focus();
});

$( '.icon' ).append( '<div></div>' );
$( '.backArrow' ).append( '<div></div>' );
// hidden modal in markup


function openModalContact (ticker){
	Waypoint.disableAll();

	let contactInfo = '';

	if (ticker === 'BRW') {
		contactInfo = '+1 844.460.9411<br><a href="mailto:BRWSabaCapital@dstsystems.com">BRWSabaCapital@dstsystems.com</a>'
	} else if (ticker === 'SABA') {
		contactInfo = '+1 800.468.9716<br>Visit <a href="https://www.shareowneronline.com/" target="_blank">shareowneronline.com</a>'
	}

	$('#contactinfo-wrapper').empty();
	$('#contactinfo-wrapper').append(
		`<h3>FOR ADMINISTRATIVE REQUESTS RELATED TO ${ticker}:</h3>
		<p>${contactInfo}</p>

		<h3>FOR ANY OTHER QUESTIONS PLEASE EMAIL:</h3>
		<p><a href="mailto:${ticker}@SABACAPITAL.COM">${ticker}@SABACAPITAL.COM</a></p>
		
		<h3>SABA CAPITAL MANAGEMENT, L.P.</h3>
		<p>405 LEXINGTON AVENUE<br />
				58TH FLOOR<br />
				NEW YORK, NY 10174<br />
				+1 888.615.4310<br>
		</p>`
	);

	$('#contact-form').attr('data-ticker', ticker);

	$('#contact-form')[0].reset();
	$('#successMessage').addClass('display-none');
	$('#successMessage').removeClass('formSub');
	$('#contact-form').removeClass('display-none');
	
	$('modalcontactwrapper').show();
	$('modal--contact').show();
	
	positionModalBoxContact();
	
	$('modal--contact').animate({
		'opacity':1
	},200,'easeOutQuad');
	if( $('modal--contact').is(':animated') ) {
		
		$('body').addClass('modal-open');
	}
	
	if ( window.mobileMenuState == 1) { 
		mobileNavClickToggle();
	}
	
	$('#first_name').focus();
	$("input[type='submit']").on('blur', function(){
		$('modal--close').focus();
	})
}


function closeModalContact (){
	$('modalcontactwrapper').fadeOut(200);
	
	$('body').removeClass('modal-open');
	
	Waypoint.enableAll();
}

function positionModalBoxContact(){
	var windowWidth = window.innerWidth * .7;
	var windowHeight = window.innerHeight * .7;
	if (window.innerWidth < 500) {
		windowWidth = window.innerWidth;
	}
	if (windowHeight > 520) {
		windowHeight = 520;
	}
	$('modal--contact, modal--overflow-scroll').css('width', windowWidth);
	$('modal--contact, modal--overflow-scroll').css('height', windowHeight);
}


function contact_INIT() {
	$('modal--close').click(function() {
		closeModalContact();
	});

	$('modalcontactwrapper > div').click(function() {
		closeModalContact();
	});

	$('modal--contact').click(function (evt) {
		evt.stopPropagation();
	});
}


// waits until doc ready to bind the click, because this modal lives in the footer.
$(document).ready(function() {
    contact_INIT();
});


$(window).resize(function(){
	positionModalBoxContact();
});


// Contact Form
$(document).ready(function() {

	$('#contact-form input').on('input change blur', function(event) {

		this.setCustomValidity('');
		if (this.validity.valueMissing) {
			this.setCustomValidity('Please fill out this field.');
		}
		else if (this.validity.patternMismatch){
			this.setCustomValidity('This field has an invalid entry.');
		}

	});

	$('#contact-form').on('submit', function(event) {
		event.preventDefault();
		$('#messageError, #headerError').empty();

		if ($('#contact-form').get(0).checkValidity()) {
			var formData = {
				form_name: $('#form_name').val().trim(),
				first_name: $('#first_name').val().trim(),
				last_name: $('#last_name').val().trim(),
				email: $('#email').val().trim(),
				comments: $('#comments').val().trim()
			}	

			let ticker = $(this).attr('data-ticker');

			// AJAX stuff here to POST
			$.ajax(
				{
					type: 'POST',
					data: formData,
					dataType: "json",
					url: 'processform-' + ticker + '.php',
					success: function(result) {
						if (result.mailsuccess == true) {
							// Show success message
							$('#successMessage').removeClass('display-none');
							$('#successMessage').addClass('formSub');
							$('#contact-form').addClass('display-none');
						} else {
							if (result.errorMessage.length !== 0){
								$('#headerError').html("Please correct the following error(s):");
								$('#messageError').append(result.errorMessage);
							} else {
								$('#headerError').text("There was an issue sending the email.");
							}
						}
					}.bind(this),
					error: function(result) {	
						$('#headerError').text("There was an issue sending the email.");
					}.bind(this)
				}
			);

		}
	});
});


$('#tinyNav').show();

$('#tinyNav li').mouseover(function(){
	//console.log('top '+$(this).offset().top +' asd '+ $(this).height() +' dfg '+ $('#tinyNav').height());
	$('#tinyTitle').html($(this).attr('cont'));
	$('#tinyTitle').dequeue().css('top',$('#tinyNav').position().top + $(this).position().top );
	$('#tinyTitle').dequeue().stop().clearQueue().fadeIn();
});

$('#tinyNav li').mouseout(function(){
	$('#tinyTitle').dequeue().delay(100).stop().clearQueue().delay(100).fadeOut();
	
});
	
// anchor scroll 
$('#tinyNav_backtotop').click(function(){
	doScrollTo('mainContent');
	$(".first-content").removeClass("inner-content");
	$(".subnav__wrapper").removeClass("subnav__wrapper--fixed");
	$(".hero-short").removeClass("hero-short--collapsed");
	$('.meta-nav__item:first-child a').focus();
});
	
	
// modal contact trigger
$('#tinyNav_contact').click(function(){
	openModalContact();
	
});
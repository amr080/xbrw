// DRAW DROPDOWN FUNDS from Fund MAP
for (var i = 0; i < fund_map.length; i++) {
	var fundDropdownLinks = "";
	var resourceDropdownLinks = "";
	var contactDropdownLinks = "";

	fundDropdownLinks +=
		'<li><a href="../' +
		fund_map[i].pageName +
		'">' +
		fund_map[i].title +
		"</a></li>";

	resourceDropdownLinks +=
		'<li><a href="../resources/' +
		fund_map[i].pageName +
		'">' +
		fund_map[i].title +
		"</a></li>";

	contactDropdownLinks +=
		'<li><a class="modal-contact-link" data-ticker=' + 
		fund_map[i].tickerArray[0] + 
		'>' +
		fund_map[i].title +
		'</a></li>';

	$("#product-list").append(fundDropdownLinks);

	$("#resource-list").append(resourceDropdownLinks);
	
	$("#contact-list").append(contactDropdownLinks);
}

$("html").mouseup(function () {
	$(".main-nav-item").find("a").removeClass("activeHover");
	$(".main-nav-dropdown").dequeue().fadeOut(200);
});

$(".main-nav-item").mouseleave(function () {
	$(this).find("a").removeClass("activeHover");
	$(this).find(".main-nav-dropdown").stop().dequeue().fadeOut(50);
});

$(".main-nav-item").on("blur", function () {
	$(this).find("a").removeClass("activeHover");
	$(this).find(".main-nav-dropdown").stop().dequeue().fadeOut(50);
});

$(".main-nav-item").mouseover(function () {
	
	var dropdownWidth = $(this).find(".main-nav-dropdown ul").width();
	var mouse_x = $(this).offset().left;
	var window_width = $(window).width();

	$(".main-nav-item").find("a").removeClass("activeHover");
	$(".main-nav-dropdown").dequeue().fadeOut(10);
	$(this).find("a").addClass("activeHover");
	$(this).find(".main-nav-dropdown").stop().dequeue().hide().fadeIn(50);

	if ((window_width - mouse_x) < dropdownWidth) {
		var padding = 15;
		var nav_item_width = $(this).width();
		var left_offset = dropdownWidth - nav_item_width - padding;
		$(this).find(".main-nav-dropdown ul").css("left", -left_offset);
	}
});

$(".main-nav-item").on("focusin", function () {
	$(".main-nav-item").find("a").removeClass("activeHover");
	$(".main-nav-dropdown").dequeue().fadeOut(10);
	$(this).find("a").addClass("activeHover");
	$(this).find(".main-nav-dropdown").stop().dequeue().hide().fadeIn(50);
});

var paddingCompensation = 4;
// position main_content and dropdown divs according to the height of the header
$(document).ready(function () {
	$(".main-nav-dropdown").css("margin-top", $("#main-nav li").height());
	$("site-logo").focus();
});

$(window).resize(function () {
	$(".main-nav-dropdown").css("margin-top", $("#main-nav li").height());
});

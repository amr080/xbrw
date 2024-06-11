$('.dropdown--mobile').hide();
// draw desktop fund product dropdown
for(var i=0;i<fund_map.length;i++){
	// build table based off fund_map
	var tempHTML = "<option value=" + fund_map[i].pageName+ ">" + fund_map[i].title + "</option>";
	$('#dropdownFund').append(tempHTML);
}

// styled select option click handler in utilties.
	
$(window).resize(function() {  
	toggleMobileDropdown();
});
	
$(document).ready(function() {  
	toggleMobileDropdown();
});
	
function toggleMobileDropdown(){
	// toggle mobile dropdown
	if ($(window).width() <= 1200) {
		//$('.dropdown--fund').hide();
		$('.dropdown--mobile').show();
	} else {
		//$('.dropdown--fund').show();
		$('.dropdown--mobile').hide();
	}
}
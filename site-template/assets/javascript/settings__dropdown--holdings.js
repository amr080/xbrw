// styled select option click handler in utilties.
for(var i=0;i<fund_map.length;i++){
	
	// build table based off fund_map
	var tempHTML = "<option value=" + "holdings/" + fund_map[i].pageName+ ">" + fund_map[i].title + "</option>";
	$('#dropdownHoldings').append(tempHTML);
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
		$('.dropdown--holdings').hide();
		$('.dropdown--mobile').show();
	} else {
		$('.dropdown--holdings').show();
		$('.dropdown--mobile').hide();
	}
}
	
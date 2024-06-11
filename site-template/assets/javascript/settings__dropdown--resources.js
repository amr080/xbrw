// styled select option click handler in utilties.
for(var i=0;i<fund_map.length;i++){
	
	// build table based off fund_map
	var tempHTML = "<option value=" + "resources/" + fund_map[i].pageName+ ">" + fund_map[i].title + "</option>";
	$('#dropdownResources').append(tempHTML);

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
		$('.dropdown--resources').hide();
		$('.dropdown--mobile').show();
	} else {
		$('.dropdown--resources').show();
		$('.dropdown--mobile').hide();
	}
}
	
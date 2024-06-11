// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// pass in OBJ ID : return T/F
function checkDivForHorizontalOverflow(objID) {
	
	var temp = 0;
	var myElement = document.getElementById(objID);
	
	
	if (myElement.offsetWidth < myElement.scrollWidth-1) {  // element.offsetHeight < element.scrollHeight || 
		// your element have overflow
		temp = true;
	} else {
		// your element doesn't have overflow
		temp = false;
	}
	
	return temp;
}



// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// table overflow indicator 
// pass it a table indicator DIV ID to be aniamated

function wackyDisplayHorScroll(str){
	
	$('#'+str).clearQueue().stop();
	$('#'+str).fadeIn(function(){
		$('#'+str).animate({opacity: .01}, 500,function(){
			$(this).css('color','#990000').animate({opacity: 1}, 500,function(){
				$(this).animate({opacity: .01}, 500,function(){
					$(this).css('color','#0000ff').animate({opacity: 1}, 500,function(){
						
					});
				});
			});
		});
	});
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 


// detect overflow and activate indicator
// pass in table ID and coresponding table indicator ID

function detectAndIndicateTableOverflow( tableObjId, indicatorDivId ){
	if(checkDivForHorizontalOverflow(tableObjId)){
		
		wackyDisplayHorScroll(indicatorDivId);
		$('#'+tableObjId).css('overflow-x','scroll');
	} else {
		//console.log('NOT overflow');
		$('#'+indicatorDivId).fadeOut();
		
		$('#'+tableObjId).css('overflow-x','hidden');
	}
}

// makes table overflow calls dynamic

$( document ).ready(function() {
	checkAllTableOverflows();
});
$( window ).resize(function() {
	checkAllTableOverflows();
});
$( window ).click(function() {
	checkAllTableOverflows();
});

function checkAllTableOverflows(){
	$('.tableHorizontalScroll').each(function(){
		var tableWrapperID = $(this).attr('id');
		var tableIndictorID = $(this).next('.tableOverflowIndicator').attr('id');
		if(tableWrapperID != null && tableIndictorID != null){
			detectAndIndicateTableOverflow(tableWrapperID, tableIndictorID);
		} else {
			console.log('Error: Check your table wrapper/indicator classes and IDs.')
		}
		
	});	
}

// example wrapper/indicator
/* - - - - - - - - - - - - -

<div id="uniqueTableWrapperID" class="tableHorizontalScroll">
	table code here...
</div>
<div id="uniqueTableIndicatorID" class="tableOverflowIndicator" ><strong>&lt;</strong> Swipe table for more info <strong>&gt;</strong></div>

- - - - - - - - - - - - - */ 
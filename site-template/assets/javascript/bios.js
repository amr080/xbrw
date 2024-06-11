// DOC-TYPE:   Bio Information

function getBio_content(){

	var tempDocPath = api_url_v2 + 'document/' + api_domain + '/bio'; 

	api.getData( tempDocPath, tempDocPath, function(data){

		if ( verifyData(data) ) {
			
			for(var i=0;i<data.length;i++){

				// split title from body data
				var search = '--- SPLIT ---';
				var index = data[i].body.indexOf(search);

				var tempTitle = data[i].body.slice(0, index).trim();
				var tempBody = data[i].body.slice(index + search.length).trim();
				
				var tempHTML = '<div class="col span_1_of_6">';
				tempHTML += '<img id="modal'+i+'" data-bioindex="'+i+'" src="'+myBase+data[i].imagename+'" alt="'+data[i].title+'" tabindex="-1" />';
				tempHTML += '</div>';
				tempHTML += '<div class="col span_5_of_6">';
				tempHTML += '<h4>'+data[i].title+'</h4>';
				tempHTML += '<h5>'+tempTitle+'</h5>';
				tempHTML += '<p>'+tempBody+'</p>';
				tempHTML += '</div>';

				var tempHTMLRow = '<div class="bioSection">';
				tempHTMLRow += '<div class="col"></div>';
				tempHTMLRow += '</div>';
				
				$('#bioTarget').append(tempHTMLRow);
				$('#bioTarget > div:last-child > div:first-child').append(tempHTML);
				
			}
		} else {
			// nothing
			$('#bioTarget').html('<div class="container"><p style="color:red;">( There is no active bio data at this time. )</p></div>');
		}
	});
}
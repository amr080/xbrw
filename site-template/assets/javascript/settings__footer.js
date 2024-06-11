// Draw footer links from fund map
for (var i = fund_map.length; i > 0; i--) {
	var fundFooterLinks = "";

	fundFooterLinks +=
		'<li><a href="../' +
		fund_map[i - 1].pageName +
		'">' +
		fund_map[i - 1].title +
		"</a></li>";

	$("#footer-links").prepend(fundFooterLinks);
}

$(document).on('click','.modal-contact-link',function(e) {
	e.preventDefault();
	let ticker = $(this).attr('data-ticker');
	openModalContact(ticker);
});
if (typeof thisFundArray !== 'undefined') {
	for (fundIndex in fund_map) {
		if (fund_map[fundIndex].tickerArray[0] == thisFundArray[0]) {
			$(".hero-short__title[data-populate]").text(fund_map[fundIndex].title);
			$('.hero-short__ticker[data-populate]').text(thisFundArray.join());
		}
	}
}

// hide unnecessary fund disclosures on single-fund pages
if (thisFundArray.length === 1) {
	if (thisFundArray[0] === "BRW") {
		$('#disclosures-saba').hide();
		$('#disclosures-combined').hide();
	} else if (thisFundArray[0] === "SABA") {
		$('#disclosures-brw').hide();
		$('#disclosures-combined').hide();
	}

	if (bodyWsdAppendedInfo.indexOf('resources') === -1) {
		$(".disclosures-resources").hide();
	}
	
} else {
	$('#disclosures-brw').hide();
	$('#disclosures-saba').hide();
}
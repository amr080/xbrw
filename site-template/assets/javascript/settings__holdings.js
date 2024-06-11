if (thisFundArray[0] === "BRW") {
  $('#portfolioDisclosure-saba').hide();
}

$(document).ready(function () {
  
  // Subnav script for holdings page
  $(".subnav__overview a").attr("href", "../" + thisFundMapPosition.pageName + "/#overview");
  $(".subnav__performance a").attr("href", "../" + thisFundMapPosition.pageName + "/#performance");
  $(".subnav__portfolio a").attr("href", "../" + thisFundMapPosition.pageName + "/#portfolio");
  $(".subnav__distributions a").attr("href", "../" + thisFundMapPosition.pageName + "/#distributions");
});

callForFullHoldingsTable(thisFundArray[0]);
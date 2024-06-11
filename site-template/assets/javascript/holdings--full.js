function callForFullHoldingsTable(tickerFundStr) {

  var tempDocPath = api_url_v2 + "holding/" + tickerFundStr + "/full";

  api.getData(tempDocPath, "holding-" + tickerFundStr, function (data) {
    if (verifyData(data)) {
      var tempArrangedAsofdate = dateFormatter_v2(data[0].asofdate);

      $("#fullHoldingsAsOfDate").append(
        "As of " + tempArrangedAsofdate + ", subject to change"
      );

      $.each(data, function (i, val) {

        let tempMaturity, tempCoupon, tempSettlement;
        if (val.rate) {
          tempCoupon = val.rate.toFixed(2);
        } else {
          tempCoupon = "&ndash;";
        }
        if (val.futuredate) {
          tempMaturity = dateFormatter_v2(val.futuredate);
        } else {
          tempMaturity = "&ndash;";
        }
        if (val.settlementprice) {
          tempSettlement = val.settlementprice.toFixed(2);
        } else {
          tempSettlement = "&ndash;"
        }

        $("#fullHoldingsTableID").append(
          "<tr><td>" + val.name + "</td><td>" + val.holdingtype + "</td><td>" + addCommas(val.shares.toFixed()) + "</td><td>$</td><td>" + tempSettlement + "</td><td>$</td><td>" + addCommas(val.marketvalue.toFixed()) + "</td><td>" + tempCoupon + "</td><td>" + (val.clientsector || "&ndash;") + "</td><td>" + (val.clientcountry || "&ndash;") + "</td><td>" + val.name + "</td><td>" 
          + (val.moodysRating || "&ndash;") + "</td><td>" 
          + (val.sandPRating || "&ndash;") + "</td><td>" + tempMaturity + "</td></tr>"
        );
      });
    } else {
      $("#fullHoldingsTableID").before("<div>Holdings are not available at this time.</div>");
      $("#fullHoldingsTableID").hide();
    }
  });
}
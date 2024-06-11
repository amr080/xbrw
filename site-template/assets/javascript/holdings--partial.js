function callForPartialHoldingsTable(tickerFundStr) {
  var tempDocPath = api_url_v2 + "holding/" + tickerFundStr + "/partial";

  api.getData(tempDocPath, "holding-" + tickerFundStr, function (data) {
    if (verifyData(data)) {
      var topTenCount = 1;
      var tempArrangedAsofdate = dateFormatter_v2(data[0].asofdate);

      $("#partialHoldingsAsOfDate").append(
        "As of " + tempArrangedAsofdate
      );

      $.each(data, function (i, val) {
        var tempVal = precisionRound(parseFloat(val.weight * 100), 2);
        $("#partial-holdings-table").append(
          "<tr><td>" + val.name + "</td><td>" + tempVal + "</td></tr>"
        );

        topTenCount++;
        if (topTenCount > 10) {
          return false;
        }
      });
    } else {
      $("#partialHoldingsAsOfDate").append("As of &ndash;");
      $("#partial-holdings-table").before("<div>Holdings are not available at this time.</div>");
    }
  });
}
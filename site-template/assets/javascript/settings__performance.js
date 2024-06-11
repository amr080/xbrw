function performanceDataComplete(thisFundArray) {
  
  $.each(thisFundArray, function (i, value) {
    $('[data-symbol="' + value + '"] [data-ticker]').html(value);
  });

  var rowSymbols = $("tr[data-symbol]");

  // update expense row symbols
  $.each(rowSymbols, function (i, row) {
    $(row).append(
      '<td rowspan="2" data-action="expense" data-keyholder="gross" class=""></td>'
    );
    $(row).append(
      '<td rowspan="2" data-action="expense" data-keyholder="net" class=""></td>'
    );
  });

  // update expense row symbols
  $.each(rowSymbols, function (j, row) {
    var symbol = $(row).data("symbol");
    $(row).find("[data-action='expense']").attr("data-location", symbol);
  });

  // update expense cell keys due to performance overwriting them
  var expenseCells = $('[data-symbol] [data-action="expense"]');

  $.each(expenseCells, function (j, cell) {
    var key = $(cell).data("keyholder");
    $(cell).attr("rowspan", "2");
    $(cell).attr("data-key", key);
  });

  if (thisFundArray[0] == 'SABA') {
    $('[data-period-target="siadvisorann"]').hide();
  } else {
    $('[data-period-target="siadvisorcum"]').hide();
  }

  // call expense
  expense.run();
}

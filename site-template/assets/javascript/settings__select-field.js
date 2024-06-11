$('#yieldFootnote-SABA').hide();

function docDataComplete(dataElement, sortedData) {
  if (dataElement.type == 'pr') {
    drawNewsDropdown(sortedData)
  }
  if (dataElement.type == '8937,s19') {
    drawS19Dropdown(sortedData)
  }
  if (dataElement.type == 'fs' || dataElement.type == 'comm') {
    
    $('#noedu').stop().dequeue().css('display', 'none')
  }
  if (
    dataElement.type == 'pro' ||
    dataElement.type == 'ar' ||
    dataElement.type == 'sar' ||
    dataElement.type == 'sai'
  ) {
    $('#noreg').stop().dequeue().css('display', 'none')
  }
}

function drawNewsDropdown(data) {
  let yearArray = []
  for (var i = 0; i < data.length; i++) {
    let year = moment(data[i].startdate).format('YYYY')
    if (!yearArray.includes(year)) {
      yearArray.push(year)
    }
  }
  for (var i = 0; i < 2; i++) {
    $('#newsYear').append("<option value='" + yearArray[i] + "'>" + yearArray[i] + '</option>')
  }
  $('#newsYear').append("<option value='archived'>Archived</option>")

  filterFundNews(yearArray[0])
}

function filterFundNews(yearStr) {
  var currentYears = []
  var archiveDate = new Date().getFullYear() - 2

  $('#newsYear option').each(function () {
    currentYears.push(this.value)
  })

  if (yearStr == 'archived') {
    $('.fund-news-heading').text('Archived Fund News')
    $('[data-type="pr"] [data-startdate]').stop().dequeue().show(800)
    $('[data-type="pr"] [data-startdate*="' + currentYears[1] + '"]')
      .stop()
      .dequeue()
      .hide()
    $('[data-type="pr"] [data-startdate*="' + currentYears[2] + '"]')
      .stop()
      .dequeue()
      .hide()

    if ($('[data-type="pr"] [data-startdate]:visible').length > 0) {
      $('.nofundnews').stop().dequeue().css('display', 'none')
    } else {
      $('.nofundnews').text(
        'No archived press releases available at this time.'
      )
      $('.nofundnews').stop().dequeue().css('display', 'block')
    }
  } else {
    $('.fund-news-heading').text('Fund News')
    $('.nofundnews').hide()
    $('[data-type="pr"] [data-startdate]').stop().dequeue().hide()
    $('[data-type="pr"] [data-startdate*="' + yearStr + '"]')
      .stop()
      .dequeue()
      .show(800)

    // checks startdate in descendants for yearStr
    if (
      $('[data-type="pr"] [data-startdate*="' + yearStr + '"]:visible').length >
      0
    ) {
      $('.nofundnews').stop().dequeue().css('display', 'none')
      // checks for startdate on the same level in case there's only one document
    } else if (
      $('[data-type="pr"][data-startdate*="' + yearStr + '"]:visible').length >
      0
    ) {
      $('.nofundnews').stop().dequeue().css('display', 'none')
    } else {
      $('.nofundnews').html('No press releases available at this time.')
      $('.nofundnews').stop().dequeue().css('display', 'block')
    }
  }
}

function drawS19Dropdown(data) {
  let yearArray = []
  for (var i = 0; i < data.length; i++) {
    let year = moment(data[i].startdate).format('YYYY')
    if (!yearArray.includes(year)) {
      yearArray.push(year)
    }
  }
  let yearArraySorted = yearArray.sort(function(a, b){return b-a});
  $.each(yearArraySorted, function (i, year) {
    $('#s19Year').append("<option value='" + year + "'>" + year + '</option>')
  })

  filterS19s(yearArraySorted[0])
}

function filterS19s(yearStr) {
  $('[data-type="8937,s19"] [data-startdate]').stop().dequeue().hide()
  $('[data-type="8937,s19"] [data-startdate*="' + yearStr + '"]')
    .stop()
    .dequeue()
    .show(800)

  // checks startdate in descendants for yearStr
  if (
    $('[data-type="8937,s19"] [data-startdate*="' + yearStr + '"]:visible').length >
    0
  ) {
    $('.noS19s').stop().dequeue().css('display', 'none')

    // checks for startdate on the same level in case there's only one document
  } else if (
    $('[data-type="8937,s19"][data-startdate*="' + yearStr + '"]:visible').length > 0
  ) {
    $('.noS19s').stop().dequeue().css('display', 'none')
  } else {
    $('.noS19s').html('No Section 19a Notices available at this time.')
    $('.noS19s').stop().dequeue().css('display', 'block')
  }
}

// changes to dropdown selection are handled by styledSelect() in utilities.js

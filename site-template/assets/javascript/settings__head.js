// Initialize thisFundArray
var thisFundArray = [];

var bodyWsdAppendedInfo = $('head').data().currentpage;

// Add funds to thisFundArray with the current page listed in pagePaths array
for (i = 0; i <= fund_map.length - 1; i++) {
  if (
    bodyWsdAppendedInfo != undefined &&
    fund_map[i].pagePaths.indexOf(bodyWsdAppendedInfo) != -1
  ) {
    thisFundArray.push(fund_map[i].tickerArray);
    thisFundArray = [].concat.apply([], thisFundArray);
  }
}

// Default to first fund in fund_map.js if no pages match the pagePaths arrays.
if (!verifyData(thisFundArray)) {
  thisFundArray = getAllPrimaryTickers();
}

var thisFundMapPosition = fund_map[getMapInfo('fund_map', thisFundArray[0])];

var myBase = api_url_v2 + 'Content/sabacef/';

// Build daily data tables
function buildDailyData() {
  let dailyData = '';
  let distributionAmount;

  for (i = 0; i < thisFundArray.length; i++) {
    if (thisFundArray[i] == 'BRW') {
      distributionAmount = '$0.085';
    }
    if (thisFundArray[i] == 'SABA') {
      distributionAmount = '$0.029';
    }

    $(`.distributionFootnote-${thisFundArray[i]}`).text(distributionAmount);

    let fundTitle = getMapInfo('fund_map', thisFundArray[i], 'title');
    let fundPage = getMapInfo('fund_map', thisFundArray[i], 'pageName');
    dailyData += `
      <dailyPriceTable ${
        thisFundArray.length > 1 ? '' : 'class="grid-col-right"'
      } data-action="dailyprice" data-location="thisFundArray[${i}]">
        <span class="hero-short__title">${fundTitle}</span>
        <div class="dailyPrice-content__container">
          <div class="tickerBox">
            <div class="ticker">${thisFundArray[i]}
      `;
    if (thisFundArray.length > 1 && thisFundArray[i] === 'BRW') {
      dailyData += `
              <sup>1</sup>
        `;
    } else if (thisFundArray.length > 1 && thisFundArray[i] === 'SABA') {
      dailyData += `
              <sup>5</sup>
        `;
    }
    dailyData += `
            </div>
            <div class="span">DAILY DATA</div>
            <div class="asOfDaily">As of <span data-key="asofdate"></span></div>
          </div>

          <div class="dataBox">
            <div class="item">Net Asset Value (NAV)
      `;
    if (thisFundArray.length > 1) {
      dailyData += `
              <sup>2</sup>
        `;
    } else {
      dailyData += `
              <sup>1</sup>
        `;
    }
    dailyData += `
            <span data-key="nav"></span></div>
            <div class="item">Closing Price<span data-key="marketvalue"></span></div>
            <div class="item">Price Change<span data-key="navchange"></span></div>
            <div class="item">Premium / Discount (%) <span data-key="premiumpercent"></span></div>
            <div class="item">Current Distribution <br class="responsive-break"/>Amount
      `;
    if (thisFundArray.length > 1) {
      if (thisFundArray[i] === 'BRW') {
        dailyData += `<sup>3</sup>`;
      } else {
        dailyData += `<sup>6</sup>`;
      }
    } else {
      dailyData += `<sup>2</sup>`;
    }
    dailyData += `<span>${distributionAmount} / share</span></div>`;
    dailyData += `<div class="item-flex"><div>Current Annualized Distribution Rate *`;
    if (thisFundArray.length > 1) {
      if (thisFundArray[i] === 'BRW') {
        dailyData += `<sup>4</sup></div>`;
      } else {
        dailyData += `<sup>7</sup></div>`;
      }
    } else {
      dailyData += `<sup>10</sup></div>`;
    }
    dailyData +=`
            <div><span data-action='yield' data-location="thisFundArray[${i}]" data-yieldperiod="monthcontrol-ASNNAV" data-key="value"></span></div></div>
          </div>
          <div class="dailyPrice-footer">
            <p>* Includes the special dividend paid during the current fiscal period and is calculated as a percentage of the NAV as of <span class="asofdateASNNAV--${thisFundArray[i]}"></span>.</p>
            <a href="../${fundPage}" class="dailyPrice-fundButton button--reverse">${thisFundArray[i]} FUND PAGE</a>
          </div>
        </div>
      </dailyPriceTable>
    `;
  }
  $('#dailyprice-table__container').append(dailyData);
}

buildDailyData();

/* Global ADA Key Commands */

// listen for first tab press to enable focus ring for accessibility
function handleFirstTab(e) {
  if (e.keyCode === 9) {
    // the "I am a keyboard user" key
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}

window.addEventListener('keydown', handleFirstTab);

// key commands
document.onkeydown = function (evt) {
  switch (evt.keyCode) {
    case 9:
      //tab
      if ($("[role='option']").is(':focus')) {
        evt.preventDefault();
      }
      break;
    case 27:
      //escape
      if (typeof closeModal === 'function') {
        closeModal();
      }
      if (typeof closeModalContact == 'function') {
        closeModalContact();
      }

      if (
        typeof mobileNavClickToggle == 'function' &&
        window.mobileMenuState == 1
      ) {
        mobileNavClickToggle();
      }

      // closes any open styled select boxes
      $('div.styledSelect.active, div.styledSelectMobile.active').each(
        function () {
          $(this).removeClass('active').focus().next('ul.options').hide();
        }
      );
      break;
    case 37:
      //left
      break;
    case 38:
      //up
      if ($('[aria-haspopup]').is(':focus')) {
        evt.preventDefault();
        $('.styledSelect:focus, .styledSelectMobile:focus')
          .addClass('active')
          .next('ul.options')
          .show();
        $('*:focus')
          .next('ul.options')
          .find('li')
          .not('[tabindex="-1"]')
          .last()
          .focus();
      } else if ($("[role='option']")) {
        evt.preventDefault();
        $('*:focus').prev().focus();
      }
      break;
    case 39:
      //right
      break;
    case 40:
      //down
      if ($('[aria-haspopup]').is(':focus')) {
        evt.preventDefault();
        $('.styledSelect:focus, .styledSelectMobile:focus')
          .addClass('active')
          .next('ul.options')
          .show();
        $('*:focus')
          .next('ul.options')
          .find('li')
          .not('[tabindex="-1"]')
          .first()
          .focus();
      } else if (
        $('*:focus').is('[role="option"]') &&
        !$('*:focus').is('[role="option"]:last-child')
      ) {
        evt.preventDefault();
        $('*:focus').next().focus();
      }
      break;
    case 13:
      // return or enter
      $(':focus').click();
      break;
    case 32:
      // spacebar
      if (!$('*:focus').is('textarea, input')) {
        evt.preventDefault();
        $(':focus').click();
      }
      break;
  }
};

$(document).ready(function () {
  // dailyprice
  dailyprice.run();

  //yield
  distributionyield.run();
});

function yieldComplete(data, settings) {
  // Append ASNNAV date to disclosures
  let tempTicker = settings.location;

  if (data[0]) {
    let asofdateASNNAV = dateFormatter_v2(data[0].monthcontrol.asofdate, 'full');
    $(`.asofdateASNNAV--${tempTicker}`).text(asofdateASNNAV);
  } else {
    $(`.asofdateASNNAV--${tempTicker}`).text('N/A');
  }
}
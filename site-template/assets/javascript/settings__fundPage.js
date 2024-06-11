// set date of AUM footnote 4 on BRW and SABA fund pages
let aumDate = 'May 1, 2024';
$('#aumFootnote').html(`<sup>4</sup>Assets under management as of ${aumDate}.`);

// add investor login link to masthead and footer
if (thisFundArray.length === 1 && thisFundArray[0] === "BRW") {
  let url = 'https://www.secureaccountview.com/BFWeb/clients/sabacapital/index';
  $('#main-nav').append(`
    <li>
      <a href="${url}" target="_blank">Investor Login</a>
    </li>
  `);
  $('#footer-links').append(`
    <li><a href="${url}" target="_blank">Investor Login</a></li>
  `);
  $('.mainNavMobile').append(`
    <a href="${url}" target="_blank" class="mainNavMobile__link uppercase">Investor Login</a>
  `);
}

// add contact info to footer
let contactInfo = '';

if (thisFundArray[0] === 'BRW') {
  contactInfo = '+1 844.460.9411<br><a href="mailto:BRWSabaCapital@dstsystems.com">BRWSabaCapital@dstsystems.com</a>'
} else if (thisFundArray[0] === 'SABA') {
  contactInfo = '+1 800.468.9716<br>Visit <a href="https://www.shareowneronline.com/" target="_blank">shareowneronline.com</a>'
}

$('.social__wrapper').append(
  `<p><span class="footer-white__text">FOR ADMINISTRATIVE REQUESTS RELATED TO ${thisFundArray[0]}:</span> 
    <br>${contactInfo}
  </p>

  <p><span class="footer-white__text">FOR ANY OTHER QUESTIONS PLEASE EMAIL:</span>
    <br><a href="mailto:${thisFundArray[0]}@SABACAPITAL.COM">${thisFundArray[0]}@SABACAPITAL.COM</a>
  </p>

  <p><span class="footer-white__text">SABA CAPITAL MANAGEMENT, L.P.</span><br>
      405 LEXINGTON AVENUE<br>
      58TH FLOOR<br>
      NEW YORK, NY 10174<br>
      +1 888.615.4310</p>

  <div class="footer-white__text">
      SEND US A MESSAGE
      <a class="modal-contact-link" data-ticker="${thisFundArray[0]}" tabindex="0">
          <img src="assets/images/icon-email.svg" class="social__icon" alt="Contact Us" />
      </a>
  </div>`
);

// performance
$(document).ready(function () {
  getAllPerformance(thisFundArray);
});

// partial holdings

callForPartialHoldingsTable(thisFundArray[0]);

// bios

getBio_content();

// distributions

callFor_Distributions(thisFundArray);

function distributionsDataComplete(data) {
  if(thisFundArray[0] === "BRW") {
    var table = document.getElementById('table__distributions');
    var numRows = table.rows.length;

    var stockSplitDate = new Date('05/20/2022');

    for(var r = 1; r < numRows; r++) {
      let paydateCell = table.rows[r].cells.item(1).innerHTML;
      let paydate = new Date(paydateCell);
      let target = r + 1;

      // if dividend was paid prior to stock split, add footnote symbol

      if (paydate < stockSplitDate) {
        $('#table__distributions tr:nth-child(' + target +') td:last-child').append('<sup>**</sup>');
      }
    }
  }
}
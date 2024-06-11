// portfolio statistics

fetch(`assets/charts/portfolio-statistics-${thisFundArray[0].toLowerCase()}.json`)
  .then((response) => response.json())
  .then((data) => {
    let table = document.getElementById("portfolio-statistics-table");
    let asofdate = dateFormatter_v2(data[0].asofdate.date);
    $('#statisticsAsOfDate[data-key="asofdate"]').text("As of " + asofdate);
  	for (let key in data[0].data) {
      let row;
      row = "<tr><td>"+key+"</td><td>"+data[0].data[key]+"</td></tr>";
      table.innerHTML += row;
		}
	});


  // portfolio composition

fetch(`assets/charts/portfolio-composition-${thisFundArray[0].toLowerCase()}.json`)
.then((response) => response.json())
.then((data) => {
  let table = document.getElementById("portfolio-composition-table");
  let asofdate = dateFormatter_v2(data[0].asofdate.date);
  $('#compositionAsOfDate[data-key="asofdate"]').text("% of Net Assets as of " + asofdate);
  for (let key in data[0].data) {
    let row;
    row = "<tr><td>"+key+"</td><td>"+data[0].data[key]+"</td></tr>";
    table.innerHTML += row;
  }
});
  

  // sector weightings

  fetch(`assets/charts/sector-weightings-${thisFundArray[0].toLowerCase()}.json`)
  .then((response) => response.json())
  .then((data) => {
    let table = document.getElementById("portfolio-sectors-table");
    let asofdate = dateFormatter_v2(data[0].asofdate.date);
    $('#sectorsAsOfDate[data-key="asofdate"]').text("% of Total Investments as of " + asofdate);
    for (let key in data[0].data) {
      let row;
      row = "<tr><td>"+key+"</td><td>"+data[0].data[key]+"</td></tr>";
      table.innerHTML += row;
    }
  });


  // top countries

  fetch(`assets/charts/top-countries-${thisFundArray[0].toLowerCase()}.json`)
  .then((response) => response.json())
  .then((data) => {
    let table = document.getElementById("portfolio-country-table");
    let asofdate = dateFormatter_v2(data[0].asofdate.date);
    $('#countryAsOfDate[data-key="asofdate"]').text("% of Total Investments as of " + asofdate);
    for (let key in data[0].data) {
      let row;
      row = "<tr><td>"+key+"</td><td>"+data[0].data[key]+"</td></tr>";
      table.innerHTML += row;
    }
  });
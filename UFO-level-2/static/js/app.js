// from data.js
var tableData = data;

// unique country data
let countryArr=tableData.map(ufodata => ufodata.country);
let uniqueCountry = countryArr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(uniqueCountry);
// append the country into the dropdown
uniqueCountry.forEach(country => d3.select("#countrySelect").append("option").text(country));

// unique state data
let stateArr=tableData.map(ufodata => ufodata.state);
let uniqueState = stateArr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(uniqueState);
// append the state into the dropdown
uniqueState.forEach(state => d3.select("#stateSelect").append("option").text(state));

// unique city data
let cityArr=tableData.map(ufodata => ufodata.city);
let uniqueCity = cityArr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(uniqueCity);
// append the city into the dropdown
uniqueCity.forEach(city => d3.select("#citySelect").append("option").text(city));

// unique shape data
let shapeArr=tableData.map(ufodata => ufodata.shape);
let uniqueShape = shapeArr.filter((item, i, ar) => ar.indexOf(item) === i);
console.log(uniqueShape);
// append the shape into the dropdown
uniqueShape.forEach(shape => d3.select("#shapeSelect").append("option").text(shape));

// select the button
let btn=d3.select("#filter-btn");

// select the form
let frm=d3.select("form");

// create event handlers for clicking the button or pressing the enter key
btn.on("click", runEnter);
frm.on("submit",runEnter);

// create function to convert the input date format
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    return [month, day,year].join('/');
}

// Get a reference to the table body
var tbody = d3.select("tbody");

// Create the function to run for both events
function runEnter () {

    // prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input elment and get the value property of the input element
    let enterDate=d3.select("#datetime").property("value");
    // print the value to the console
    enterDate=formatDate(enterDate);
    console.log(enterDate);

    // select location and shape value from dropdown selection
    let chooseCountry = d3.select("#countrySelect").node().value;
    let chooseState = d3.select("#stateSelect").node().value;
    let chooseCity = d3.select("#citySelect").node().value;
    let chooseShape = d3.select("#shapeSelect").node().value;

    console.log(chooseCountry, chooseState, chooseCity, chooseShape);

    // filter by selected conditions
    let filteredDate=tableData
        .filter(ufoInfo => ufoInfo.datetime==enterDate)
        .filter(ufoInfo => ufoInfo.country==chooseCountry || chooseCountry=='all')
        .filter(ufoInfo => ufoInfo.state==chooseState|| chooseState=='all')
        .filter(ufoInfo => ufoInfo.city==chooseCity|| chooseCity=='all')
        .filter(ufoInfo => ufoInfo.shape==chooseShape|| chooseShape=='all');
    console.log(filteredDate);
    
    // clear the previous <tr> in tbody
    d3.selectAll('#ufo-table>tbody>tr').remove();

    // append the table content
    filteredDate.forEach((ufoDate)=> {
        let row =tbody.append("tr");
        Object.entries(ufoDate).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });
};


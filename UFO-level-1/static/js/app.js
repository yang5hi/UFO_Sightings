// from data.js
var tableData = data;
// datetime: "1/1/2010",
//     city: "benton",
//     state: "ar",
//     country: "us",
//     shape: "circle",
//     durationMinutes: "5 mins.",
//     comments: "4 bright green circles high in the sky going in circles then one bright green light at my front door."

// select the button
let btn=d3.select("#filter-btn");

// select the form
let frm=d3.select("#filters");

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
    //d3.event.preventDefault();

    // Select the input elment and get the value property of the input element
    let enterDate=d3.select("#datetime").property("value");
    // print the value to the console
    enterDate=formatDate(enterDate);
    console.log(enterDate);

    // filter by selected date
    let filteredDate=tableData.filter(ufoDate => ufoDate.datetime==enterDate);
    console.log(filteredDate);

    filteredDate.forEach((ufoDate)=> {
        let row =tbody.append("tr");
        Object.entries(ufoDate).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    });


};


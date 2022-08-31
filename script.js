const properties = {
    start: Date.parse("2020-01-01"),
    pto: 20,
    sick: 10,
    other: 3
}

let currentDate = Date.now();
let timeIntoCurrentQuarter = 0;

let rawData = {};
let chartDataSick = [];
let chartDataPTO = [];
let labels = [];
let slopes = {}; //average sick days per quarter;

var red = "#ff8c8c";
var green = "#a4e88e";
var yellow = "#e6d97e";

const randomColor = () => `rbg(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

const generateColor = (target, current) => {
    let color;
    if (target * 1.2 / 4 <= current)
        color = red;
    else if (target * 0.9 / 4 >= current)
        color = green;
    else
        color = yellow;
    return color;
}

let chartPTO;
let chartSick;

let msPerYear = 31556952000;
let msPerQuarter = msPerYear / 4;

function createLabels() {
    var list = [];
    var startYear = new Date(properties.start).getFullYear();
    var startQuarter = parseInt(new Date(properties.start).getMonth() / 3) + 1;

    // var percentIntoCurrent = (timeIntoCurrentQuarter / msPerQuarter * 100).toFixed(2);
    // document.getElementById("current-time").innerHTML = "% into current quarter: " + percentIntoCurrent + "%";

    if (properties.start >= currentDate) {
        return [new Date(currentDate).getFullYear() + "Q" + (parseInt(new Date(currentDate).getMonth() / 3) + 1)];
    }

    if (new Date(properties.start).getFullYear() === new Date(currentDate).getFullYear()) {
        for (var i = startQuarter; i <= (parseInt(new Date(currentDate).getMonth() / 3) + 1); i++) {
            list.push(new Date(currentDate).getFullYear() + "Q" + i)
        }
        return list;
    }


    for (var i = startQuarter; i <= 4; i++) {
        list.push(startYear + "Q" + i);
    }

    for (var i = startYear + 1; i < new Date(currentDate).getFullYear(); i++) {
        for (var j = 1; j <= 4; j++) {
            list.push(i + "Q" + j);
        }
    }

    for (var i = 1; i <= (parseInt(new Date(currentDate).getMonth() / 3) + 1); i++) {
        list.push(new Date(currentDate).getFullYear() + "Q" + i);
    }

    list.shift();
    return list;
}

function populateData(input) {
    rawData = {};
    slopes = {};
    timeIntoCurrentQuarter = (currentDate - properties.start) % msPerQuarter;
    var percentIntoCurrent = (timeIntoCurrentQuarter / msPerQuarter * 100).toFixed(2);
    document.getElementById("current-time").innerHTML = "% into current quarter: " + percentIntoCurrent + "%";
    let numQuarters = Math.floor((currentDate - properties.start) / msPerQuarter + (timeIntoCurrentQuarter > 0 ? 1 : 0));
    console.log(properties.start)

    var splitInput = input.split(/r?\n/);
    splitInput.shift();
    for (const line of splitInput) {
        let split = line.split(",");
        // try {
        var name = split[0].trim();
        split[1] = split[1].trim();
        split[2] = split[2].trim();
        let dayType = split[2].toLowerCase() === "pto" ? "pto" : (split[2].toLowerCase() === "sick" ? "sick" : "other");
        dateSplit = split[1].split("/");

        let date = Date.parse(dateSplit[2] + "-" + dateSplit[0] + "-" + dateSplit[1]);

        if (date < properties.start || date > currentDate) {
            continue;
        }
        
        console.log(name);

        if (!rawData[name]) {
            console.log(name);
            rawData[name] = {};
            rawData[name].pto = new Array(numQuarters).fill(0);
            rawData[name].sick = new Array(numQuarters).fill(0);
            rawData[name].other = new Array(numQuarters).fill(0);

            for (var i = 0; i < numQuarters; i++) {
                rawData[name].pto[i] = 0;
                rawData[name].sick[i] = 0;
                rawData[name].other[i] = 0;
            }
        }

        let index = parseInt((date - properties.start) / msPerQuarter);

        if (!rawData[name][dayType][index]) {
            rawData[name][dayType][index] = 0;
        }
        (rawData[name][dayType][index])++;
        // } catch (e) {
        // continue;
        // }
    }

    chartDataSick = [];
    chartDataPTO = [];

    console.log(rawData);

    renderCharts();
    renderTable();
}

function onFileInput(file) {
    let reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = (targetEvent) => {
        let content = targetEvent.target.result;
        populateData(content);
    }
}

function renderCharts() {
    if (chartPTO)
        chartPTO.destroy();
    if (chartSick)
        chartSick.destroy();

    let ctx;

    chartDataPTO = [];
    chartDataSick = [];
    slopes = {};


    for (const [key, value] of Object.entries(rawData)) {
        slopes[key] = {};
        slopes[key].pto = value.pto.reduce((partialSum, a) => partialSum + a, 0) / value.pto.length;
        slopes[key].sick = value.sick.reduce((partialSum, a) => partialSum + a, 0) / value.sick.length;
        slopes[key].other = value.other.reduce((partialSum, a) => partialSum + a, 0) / value.other.length;

        chartDataSick.push({
            label: key,
            data: value["sick"],
            borderColor: generateColor(properties.sick, slopes[key].sick)
        })
        chartDataPTO.push({
            label: key,
            data: value["pto"],
            borderColor: generateColor(properties.pto, slopes[key].pto)
        })
    }
    // pto graph
    ctx = document.getElementById('graph-canvas-pto');
    chartPTO = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: chartDataPTO
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'PTO By Person'
                }
            }
        }
    });

    // sick graph
    ctx = document.getElementById('graph-canvas-sick');
    chartSick = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: chartDataSick
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Sick Time Off By Person'
                }
            }
        }
    });

}


function renderTable() {
    var table = document.getElementById("people-table");
    var inside = "";
    inside += "<tr>"
    inside += "<th>" + "Name" + "</th>"
    inside += "<th>" + "PTO (used per quarter)" + "</th>"
    inside += "<th>" + "Sick (used per quarter)" + "</th>"
    inside += "<th>" + "Miscellaneous (used per quarter)" + "</th>"
    inside += "</tr>"
    for (const [key, value] of Object.entries(slopes)) {
        var colorPTO = (value.pto > properties.pto * 1.2 / 4) ? red : (value.pto < 0.9 * properties.pto / 4 ? green : yellow);
        var colorSick = (value.sick > properties.sick * 1.2 / 4) ? red : (value.sick < 0.9 * properties.sick / 4 ? green : yellow);
        var colorMisc = (value.other > properties.other * 1.2 / 4) ? red : (value.other < 0.9 * properties.other / 4 ? green : yellow);
        inside += "<tr>"
        inside += "<td>" + key + "</td>"
        inside += "<td style=\"background-color:" + colorPTO + "\">" + value.pto.toFixed(2) + "</td>"
        inside += "<td style=\"background-color:" + colorSick + "\">" + value.sick.toFixed(2) + "</td>"
        inside += "<td style=\"background-color:" + colorMisc + "\">" + value.other.toFixed(2) + "</td>"
        inside += "</tr>"
    }

    table.innerHTML = inside;

}

function setup() {

    let filePicker = document.getElementById("fileChooser");


    let startPicker = document.getElementById("start");
    startPicker.value = new Date(properties.start).toISOString().split('T')[0];


    labels = createLabels();

    let ptoPicker = document.getElementById("pto");
    ptoPicker.value = properties.pto;


    let sickPicker = document.getElementById("sick");
    sickPicker.value = properties.sick;

    let miscPicker = document.getElementById("misc");
    miscPicker.value = properties.other;


    renderCharts();
    renderTable();

    filePicker.onchange = (e) => {
        let file = e.target.files[0];
        if (!file) return;
        onFileInput(file);
        renderCharts();
        renderTable();
    }
    sickPicker.onchange = (e) => {
        properties.sick = e.target.value;
        renderCharts();
        renderTable();
    }
    ptoPicker.onchange = (e) => {
        properties.pto = e.target.value;
        renderCharts();
        renderTable();
    }
    miscPicker.onchange = (e) => {
        properties.other = e.target.value;
        renderCharts();
        renderTable();
    }
    startPicker.onchange = (e) => {
        properties.start = new Date(e.target.value).valueOf();
        labels = createLabels();
        onFileInput(filePicker.files[0]);
        renderCharts();
        renderTable();
    }
}

window.onload = () => {
    setup();
}
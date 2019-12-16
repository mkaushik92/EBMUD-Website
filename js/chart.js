
//charts
const controller = d3.select("#gallon-input").attr("class", "conversion-chart")
const galToCupChart = d3.select("#gallon-to-cups").attr("class", "conversion-chart")
const foodChart = d3.select("#food").attr("class", "conversion-chart")
const drinkingChart = d3.select("#drinking-water").attr("class", "conversion-chart")
const showerChart = d3.select("#shower").attr("class", "conversion-chart")
const toiletChart = d3.select("#toilet").attr("class", "conversion-chart")
const hygieneChart = d3.select("#hygiene").attr("class", "conversion-chart")

foodChart.attr("data-used", 0)
drinkingChart.attr("data-used", 0)
showerChart.attr("data-used", 0)
toiletChart.attr("data-used", 0)
hygieneChart.attr("data-used", 0)



let gallons = 2
let cups = 0
let cupsUsed = 0

// full icons
let gallon = null
let cup = null
let oneCup = null
let twoCup = null
let threeCup = null
let sixCup = null
let manyCup = null

// empty icons
let emptyCup = null
let selectOne = null
let selectTwo = null
let selectThree = null
let selectSix = null
let selectMany = null


// All svgs are loaded using D3s implementation of Promises. They are saved to a promise list.
// When each SVG is loaded (i.e. when each promise is completed) updateCharts() is run to initialize
// all charts
let promiseList = []

promiseList.push(d3.xml("./svg/gallon.svg")
.then(data => {
    gallon = data.documentElement
}).then(() => {
    for (let i = 1; i <= 10; i++)
    {
        controller
            .append("div")
            .attr("data-value", i)
            .attr("class", "gallon")
            .on("click", () => {
                gallons = i
                updateCharts()
            })
            .node()
            .append(gallon.cloneNode(true))
    }
}))

promiseList.push(d3.xml("./svg/cup.svg")
.then(data => {
    cup = data.documentElement
}))


promiseList.push(d3.xml("./svg/1cup.svg")
.then(data => {
    oneCup = data.documentElement
}))

promiseList.push(d3.xml("./svg/2cup.svg")
.then(data => {
    twoCup = data.documentElement
}))

promiseList.push(d3.xml("./svg/3cup.svg")
.then(data => {
    threeCup = data.documentElement
}))

promiseList.push(d3.xml("./svg/6cup.svg")
.then(data => {
    sixCup = data.documentElement
}))

promiseList.push(d3.xml("./svg/32cup.svg")
.then(data => {
    manyCup = data.documentElement
}))

// empty icons
promiseList.push(d3.xml("./svg/emptycup.svg")
.then(data => {
    emptyCup = data.documentElement
}))

// selected icons

promiseList.push(d3.xml("./svg/1cup-select.svg")
.then(data => {
    selectOne = data.documentElement
}))

promiseList.push(d3.xml("./svg/2cup-select.svg")
.then(data => {
    selectTwo = data.documentElement
}))

promiseList.push(d3.xml("./svg/3cup-select.svg")
.then(data => {
    selectThree = data.documentElement
}))

promiseList.push(d3.xml("./svg/6cup-select.svg")
.then(data => {
    selectSix = data.documentElement
}))

promiseList.push(d3.xml("./svg/32cup-select.svg")
.then(data => {
    selectMany = data.documentElement
}))

// as stated, once all are complete, the charts are generated.

Promise.all(promiseList).then(() => updateCharts())

// updateCupsUsed

// Updates all charts when gallons are updated.

function updateCharts() {
    cupsUsed = 0
    cups = gallons * 16
    controller
        .selectAll(".gallon")
        .each(function(){
            let gal = d3.select(this)
            if(gal.attr("data-value") > gallons)
            {
                gal.attr("class", "gallon over")
            }
            else
            {
                gal.attr("class", "gallon")
            }

        })

    d3.selectAll(".cup").remove()
    d3.selectAll(".gal-subchart").remove()

    //galToCupChart
    for(let i = 0; i < gallons; i++)
    {
        let galSubchart = galToCupChart.append("div")
        galSubchart.attr("class", "gal-subchart")
        for(let j = 1; j <= 16; j++)
        {
            let thisIcon = galSubchart
                .append("div")
                .attr("class", "cup")
                .attr("data-value", (i* 16) + j)
            thisIcon
                .append("div")
                .attr("class", "full")
                .node()
                .append(cup.cloneNode(true))
            thisIcon
                .append("div")
                .attr("class", "empty")
                .node()
                .append(emptyCup.cloneNode(true))
        }

    }
    //foodChart
    createChart(foodChart, 2, twoCup, selectTwo)

    //drinkingChart
    createChart(drinkingChart, 1, oneCup, selectOne)

    //showeringChart
    createChart(showerChart, 6, sixCup, selectSix)

    //toiletChart
    createChart(toiletChart, 32, manyCup, selectMany)

    //hygieneChart
    createChart(hygieneChart, 3, threeCup, selectThree)
}

// create chart

// Parameters
// - chart: chart to be created
// - numCups: number of cups each icon represents
// - fullSvg: icon representing full state
// - emptySvg: icon representing empty state

// Output
//  A chart

function createChart(chart, numCups, fullSvg, emptySvg)
{
    for(let i = 1; i <= Math.floor(cups/numCups); i++)
    {
        let thisIcon = chart
            .attr("data-used", 0)
            .append("div")
            .attr("class", "cup")
        thisIcon
            .attr("data-value", i * numCups)
            .on("click", function(){
                let clicked = d3.select(this)
                updateCupsUsed(chart, clicked, numCups)
            })
        thisIcon
            .append("div")
            .attr("class", "full")
            .node()
            .append(fullSvg.cloneNode(true))
        thisIcon
            .append("div")
            .attr("class", "empty")
            .node()
            .append(emptySvg.cloneNode(true))
    }
}

// updateCupsUsed

// Paramters
// - chart: d3 chart being updated
// - clicked: the clicked item
// - value: the number of cups the clicked item is equal to

// When a the chart is updated, the used class is applied to each icon with a data-value less than the clicked item
// icons with the used class will apply display: none to the fullSvg and display: block to the empty svg,
// and vice versa for items that do not have the used class

// Output
//  Updates the given chart to indicate all cups up to the clicked icon are in use, if cupsUsed < cups available

function updateCupsUsed(chart, clicked, value){
    let chartCupsUsed = parseInt(chart.attr("data-used"))
    let cupVal = parseInt(clicked.attr("data-value"))
    cupsUsed -= chartCupsUsed

    if(cupsUsed + cupVal > gallons * 16)
    {
        cupsUsed += chartCupsUsed
        return
    }

    if(chartCupsUsed == cupVal)
    {
        chartCupsUsed -= value
    }
    else
    {
        chartCupsUsed = cupVal
    }

    chart.attr("data-used", chartCupsUsed)
    cupsUsed += chartCupsUsed
    chart
        .selectAll(".cup")
        .each(function(){
            let cup = d3.select(this)
            if(cup.attr("data-value") <= chartCupsUsed)
            {
                cup.attr("class", "cup used")
            }
            else
            {
                cup.attr("class", "cup")
            }
        })
    galToCupChart
        .selectAll(".cup")
        .each(function(){
            let cup = d3.select(this)
            if(cup.attr("data-value") <= cupsUsed)
            {
                cup.attr("class", "cup used")
            }
            else
            {
                cup.attr("class", "cup")
            }
        })
}

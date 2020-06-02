window.chartColors = {
    red: 'rgb(255,0,0)',
    orange: 'rgb(232,182,7)',
    yellow: 'rgb(229,201,13)',
    green: 'rgb(0,108,0)',
    blue: 'rgb(54, 162, 235)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
};

/**
 * Chart configuration
 * @param dataGot
 * @param labelsGot
 * @param titleGot
 * @return {{data: {datasets: [{backgroundColor: [string, string, string], data: *}], labels: *}, options: {legend: {display: boolean, labels: {fontSize: number, fontColor: string}}, plugins: {labels: [{textMargin: number, position: string, render: string, fontColor: function(*): string}, {precision: number, render: string, fontColor: function(*): string}]}, responsive: boolean, title: {display: boolean, fontSize: number, text: *, fontColor: string}, tooltips: {callbacks: {label: (function(*, *): string)}}}, type: string}}
 */
function getPieChartConfig(dataGot, labelsGot, titleGot) {
    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: dataGot,
                backgroundColor: [
                    window.chartColors.orange,
                    window.chartColors.green,
                    window.chartColors.red
                ],
            }],
            labels: labelsGot
        },
        options: {
            responsive: true,
            legend: {
                display: false,
                labels: {
                    fontColor: "white",
                    fontSize: 14
                }
            },
            title: {
                display: false,
                text: titleGot,
                fontSize: 14,
                fontColor: "white",
            },
            tooltips: {
                callbacks: {
                    label: function (tooltipItem, data) {
                        //get the concerned dataset
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        //calculate the total of this data set
                        var total = dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        //get the current items value
                        var currentValue = dataset.data[tooltipItem.index];
                        //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
                        var percentage = Math.floor(((currentValue / total) * 100) + 0.5);
                        return " " + data.labels[tooltipItem.index] + " (" + percentage + "%)";
                    }
                }
            },
            plugins: {
                labels: [
                    {
                        render: 'label',
                        position: 'outside',
                        fontColor: function (data) {
                            return 'white';
                        },
                        //arc: true,
                        textMargin: 10,
                    },
                    {
                        render: 'percentage',
                        fontColor: function (data) {
                            return 'white';
                        },
                        precision: 0
                    }
                ]


            },
        }
    };
    return config;
}

/**
 * chart drawing
 * @param chartType
 * @param data
 * @param canvasId
 */
function drawChart(chartType, data, canvasId) {
    let currentActiveCase;
    var ctx = document.getElementById(canvasId).getContext('2d');
    if (chartType == 'today') {
        var configPie = getPieChartConfig(
            [
                data.active,
                data.recovered,
                data.deaths
            ],
            [
                'Active cases: ' + betterNumbers(data.active),
                'Recovered cases: ' + betterNumbers(data.recovered),
                'Death cases: ' + betterNumbers(data.deaths),
            ],
            'Total cases: ' + betterNumbers(data.cases)
        );
        if (window.myPie) window.myPie.destroy();
        window.myPie = new Chart(ctx, configPie);
    } else if (chartType == 'tests') {
        let negativeCases = parseInt(data.cases) - (parseInt(data.deaths) + parseInt(data.recovered));
        let configPieTests = getPieChartConfig(
            [
                data.cases,
                negativeCases
            ],
            [
                'Positive: ' + betterNumbers(data.cases),
                'Negative: ' + betterNumbers(negativeCases),
            ],
            'Tests'
        );
        if (window.pieTests) window.pieTests.destroy();
        window.pieTests = new Chart(ctx, configPieTests);
    }
    else if (chartType == 'historyCases') {
        let deathCases = Object.values(data.timeline.deaths);
        let recoveredCases = Object.values(data.timeline.recovered);

        let activeCases = [];
        let totalCases = Object.values(data.timeline.cases);

        let currentActiveCase = 0;
        for (let i = 0; i < totalCases.length; i++) {
            currentActiveCase = parseInt(totalCases[i]) - (parseInt(recoveredCases[i]) + parseInt(deathCases[i]));
            // console.log(currentActiveCase);
            activeCases.push(currentActiveCase);
        }

        let configLine = getLineChartConfig(
            Object.keys(data.timeline.cases),
            'Cases',
            [
                {
                    label: 'Total cases',
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: totalCases,
                    fill: false,
                },
                {
                    label: 'Active cases',
                    backgroundColor: window.chartColors.yellow,
                    borderColor: window.chartColors.yellow,
                    data: activeCases,
                    fill: false,
                },
                {
                    label: 'Death cases',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: deathCases,
                    fill: false,
                },
                {
                    label: 'Recovered cases',
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: recoveredCases,
                    fill: false,
                }
            ],

        );
        if (window.historyCases) window.historyCases.destroy();
        window.historyCases = new Chart(ctx, configLine);
    }
    else if (chartType == 'historyNewCases') {
        let deathCases = Object.values(data.timeline.deaths);
        let recoveredCases = Object.values(data.timeline.recovered);

        let totalCases = Object.values(data.timeline.cases);

        let activeCases = [];
        let currentActiveCase = 0;
        for (let i = 0; i < totalCases.length; i++) {
            currentActiveCase = parseInt(totalCases[i]) - (parseInt(recoveredCases[i]) + parseInt(deathCases[i]));
            activeCases.push(currentActiveCase);
        }

        let newCases = [];
        let prevDayTotalCases = 0;
        let newCasesThatDay = 0;
        for (let i = 0; i < totalCases.length; i++) {
            newCasesThatDay = parseInt(totalCases[i]) - prevDayTotalCases;
            newCases.push(newCasesThatDay);
            prevDayTotalCases = parseInt(totalCases[i]);
        }

        let newActiveCases = [];
        let prevDayTotalActiveCases = 0;
        let newActiveCasesThatDay = 0;
        for (let i = 0; i < activeCases.length; i++) {
            newActiveCasesThatDay = parseInt(activeCases[i]) - prevDayTotalActiveCases;
            newActiveCases.push(newActiveCasesThatDay);
            prevDayTotalActiveCases = parseInt(activeCases[i]);
        }

        let newDeaths = [];
        let prevDayTotalDeaths = 0;
        let newDeathsThatDay = 0;
        for (let i = 0; i < deathCases.length; i++) {
            newDeathsThatDay = parseInt(deathCases[i]) - prevDayTotalDeaths;
            newDeaths.push(newDeathsThatDay);
            prevDayTotalDeaths = parseInt(deathCases[i]);
        }

        let newRecovered = [];
        let prevDayTotalRecovered = 0;
        let newRecoveredThatDay = 0;
        for (let i = 0; i < recoveredCases.length; i++) {
            newRecoveredThatDay = parseInt(recoveredCases[i]) - prevDayTotalRecovered;
            newRecovered.push(newRecoveredThatDay);
            prevDayTotalRecovered = parseInt(recoveredCases[i]);
        }


        let configLine = getLineChartConfig(
            Object.keys(data.timeline.cases),
            'Cases',
            [
                {
                    label: 'New cases',
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: newCases,
                    fill: false,
                },
                {
                    label: 'New active cases',
                    backgroundColor: window.chartColors.yellow,
                    borderColor: window.chartColors.yellow,
                    data: newActiveCases,
                    fill: false,
                },
                {
                    label: 'New deaths',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: newDeaths,
                    fill: false,
                },
                {
                    label: 'New recovered',
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: newRecovered,
                    fill: false,
                }
            ],

        );
        if (window.historyNewCases) window.historyNewCases.destroy();
        window.historyNewCases = new Chart(ctx, configLine);
    } else if (chartType == 'historygrowthHistory') {

        let deathCases = Object.values(data.timeline.deaths);
        let recoveredCases = Object.values(data.timeline.recovered);
        let totalCases = Object.values(data.timeline.cases);

        let activeCases = [];
        currentActiveCase = 0;
        for (let i = 0; i < totalCases.length; i++) {
            currentActiveCase = parseInt(totalCases[i]) - (parseInt(recoveredCases[i]) + parseInt(deathCases[i]));
            activeCases.push(currentActiveCase);
        }

        var growthTotalCases = [];
        var prevDayTotalCases = 0;
        var growthCasesThatDay = 0;
        for (var i = 0; i < totalCases.length; i++) {
            if (prevDayTotalCases > 0) {
                growthCasesThatDay = toFixed(parseInt(totalCases[i]) / prevDayTotalCases,2);
                growthTotalCases.push(growthCasesThatDay);
            }
            prevDayTotalCases = parseInt(totalCases[i]);
        }

       
        var growthTotalCases = [];
        var prevDayTotalCases = 0;
        var growthCasesThatDay = 0;
        for (var i = 0; i < totalCases.length; i++) {
            if (prevDayTotalCases > 0) {
                growthCasesThatDay = toFixed(parseInt(totalCases[i]) / prevDayTotalCases,2);
                growthTotalCases.push(growthCasesThatDay);
            }
            prevDayTotalCases = parseInt(totalCases[i]);
        }

        var growthDeathCases = [];
        var prevDayDeathCases = 0;
        var growthDeathsThatDay = 0;
        for (var i = 0; i < deathCases.length; i++) {
            if (prevDayDeathCases > 0) {
                growthDeathsThatDay = toFixed(parseInt(deathCases[i]) / prevDayDeathCases,2);
                growthDeathCases.push(growthDeathsThatDay);
            }
            prevDayDeathCases = parseInt(deathCases[i]);
        }

        var growthRecoveredCases = [];
        var prevDayRecCases = 0;
        var growthRecThatDay = 0;
        for (var i = 0; i < recoveredCases.length; i++) {
            if (prevDayRecCases > 0) {
                growthRecThatDay = toFixed(parseInt(recoveredCases[i]) / prevDayRecCases,2);
                growthRecoveredCases.push(growthRecThatDay);
            }
            prevDayRecCases = parseInt(recoveredCases[i]);
        }

        var growthActiveCases = [];
        var prevDayActiveCases = 0;
        var growthActiveThatDay = 0;
        for (var i = 0; i < activeCases.length; i++) {
            if (prevDayActiveCases > 0) {
                growthActiveThatDay = toFixed(parseInt(activeCases[i]) / prevDayActiveCases,2);
                growthActiveCases.push(growthActiveThatDay);
            }
            prevDayActiveCases = parseInt(activeCases[i]);
        }
        var configLine = getLineChartConfig(
            Object.keys(data.timeline.cases),
            'Cases growth factor',
            [
                {
                    label: 'Total cases growth factor',
                    backgroundColor: window.chartColors.blue,
                    borderColor: window.chartColors.blue,
                    data: growthTotalCases,
                    fill: false,
                },
                {
                    label: 'Total active growth factor',
                    backgroundColor: window.chartColors.yellow,
                    borderColor: window.chartColors.yellow,
                    data: growthActiveCases,
                    fill: false,
                },
                {
                    label: 'Total deaths growth factor',
                    backgroundColor: window.chartColors.red,
                    borderColor: window.chartColors.red,
                    data: growthDeathCases,
                    fill: false,
                },
                {
                    label: 'Total recovered growth factor',
                    backgroundColor: window.chartColors.green,
                    borderColor: window.chartColors.green,
                    data: growthRecoveredCases,
                    fill: false,
                }
            ],

        );
        if (window.historygrowthHistory) window.historygrowthHistory.destroy();
        window.historygrowthHistory = new Chart(ctx, configLine);
    }
}

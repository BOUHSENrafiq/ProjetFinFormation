const loadingTxt = '<p class="text-center">Loading...</p>';
const loadingImgSrc = 'assets/img/gifs/placeholder.gif';
let gotCountry = findGetParameter('country');
if (getCountryByCode(gotCountry) == 'N/A') gotCountry = null;
let chosenCountry = (gotCountry != null) ? gotCountry : 'ma'; //
getHistoryAndNewCasesCharts();
getTodayCasesAndCountryData();
setChartLoading(loadingTxt);
setCountryName(chosenCountry);

const selectCountry = document.getElementById('selectCountry');
for (const c in countriesList)
{
   var option = document.createElement("option");
    option.text = c;
    option.value = countriesList[c];
    if (countriesList[c] == 'ma')
        option.selected = 'selected';
    selectCountry.appendChild(option);
}

selectElement('selectCountry', chosenCountry);

/**
 * set country
 * @param val
 */
function setCountry(val) {
    chosenCountry = val;
    getHistoryAndNewCasesCharts();
    getTodayCasesAndCountryData();
    setChartLoading(loadingTxt);
    setCountryName(chosenCountry);
}

/**
 * get country name
 * @param code
 * @return {string}
 */
function getCountryByCode(code) {
    for(const c in countriesList)
    {
        if (code == countriesList[c]) return c;
    }
    return 'N/A';
}

/**
 * set country name
 * @param val
 */
function setCountryName(val) {
    var countryName = getCountryByCode(val);
    var elements = document.getElementsByClassName("countryName");
    for (var i = 0; i < elements.length; i++) {
        elements[i].innerHTML = countryName;
    }
}

/**
 * set chart
 * @param txt
 */
function setChartLoading(txt) {
    const elements = document.getElementsByClassName("chartLoading");
    for (let i = 0; i < elements.length; i++) {
        elements[i].innerHTML = txt;
    }
}

/**
 * get list of items
 * @param text
 * @param nb
 * @param className
 * @return {string}
 */
function getListItem(text, nb, className) {
    var ret = '';
    ret += '<li class="list-group-item d-flex justify-content-between align-items-center ';
    if (className == 'secondary') {
        ret += 'bg-' + className;
    }
    ret += ' ">';
    ret += '<small>';
    ret += text;
    ret += '</small>';
    ret += '<span>';
    ret += '<small>';
    ret += nb;
    ret += '</small>';
    ret += '</span>';
    ret += '</li>';
    return ret;
}

/**
 * show data of today
 * @param data
 * @param elemId
 */
function showToDateStats(data, elemId) {
    if (!issetObj(data) || !issetElem(elemId)) return;
    replaceInside(getDate(data.updated), 'updated');
    replaceImg(data.countryInfo.flag, 'countryImg');
    replaceInside(ucf(chosenCountry), 'countryName');
    const totalCases = parseInt(data.cases);
    const deathsCases = parseInt(data.deaths);
    const recoveredCases = parseInt(data.recovered);
    const activeCases = totalCases - (deathsCases + recoveredCases);
    const criticalCases = parseInt(data.critical);
    //toDateStats
    let countryInfoText = '';
    const redClass = 'danger';
    const orangeClass = 'warning';
    const greenClass = 'success';
    const secClass = 'secondary';
    countryInfoText += '<div class="row">';
    countryInfoText += '<div class="col">';
    countryInfoText += '<ul class="list-group">';
    countryInfoText += getListItem('Total cases', betterNumbers(totalCases), secClass);
    countryInfoText += getListItem('Active cases (' + getPercentage(activeCases, totalCases, 2) + ')', betterNumbers(activeCases), orangeClass);
    countryInfoText += getListItem('Total deaths (' + getPercentage(deathsCases, totalCases, 2) + ')', betterNumbers(deathsCases), redClass);
    countryInfoText += getListItem('Total recovered (' + getPercentage(recoveredCases, totalCases, 2) + ')', betterNumbers(recoveredCases), greenClass);
    countryInfoText += getListItem('Total critical (' + getPercentage(criticalCases, totalCases, 2) + ')', betterNumbers(criticalCases), greenClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';
    countryInfoText += '</div>';
    replaceInside(countryInfoText, elemId);
    setChartLoading('');
}

/**
 * show statistics about tests
 * @param data
 * @param elemId
 */
function showTestsStats(data, elemId) {
    if (!issetObj(data) || !issetElem(elemId)) return;
    replaceInside(getDate(data.updated), 'updated');
    replaceImg(data.countryInfo.flag, 'countryImg');
    replaceInside(getCountryByCode(chosenCountry), 'countryName');
    const totalCases = parseInt(data.cases);
    const totalTests = parseInt(data.tests);
    const negativeTests = parseInt(data.tests) - parseInt(data.cases);
    //toDateStats
    let countryInfoText = '';
    const lightClass = 'light';
    const secClass = 'secondary';
    countryInfoText += '<div class="row">';
    countryInfoText += '<div class="col">';
    countryInfoText += '<ul class="list-group">';
    countryInfoText += getListItem('Total tests', betterNumbers(totalTests), secClass);
    countryInfoText += getListItem('Positive tests (' + getPercentage(totalCases, totalTests, 2) + ')', betterNumbers(totalCases), lightClass);
    countryInfoText += getListItem('Negative tests (' + getPercentage(negativeTests, totalTests, 2) + ')', betterNumbers(negativeTests), lightClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';
    countryInfoText += '</div>';
    replaceInside(countryInfoText, elemId);
    setChartLoading('');
}

/**
 * show today statistics
 * @param data
 * @param elemId
 */
function showTodayStats(data, elemId) {
    if (!issetObj(data) || !issetElem(elemId)) return;
    var todayDeaths = parseInt(data.todayDeaths);
    var todayCases = parseInt(data.todayCases);
    //toDateStats 
    var countryInfoText = '';
    var lightClass = 'light';

    countryInfoText += '<div class="row">';
    countryInfoText += '<div class="col">';
    countryInfoText += '<ul class="list-group">';
    countryInfoText += getListItem('Today cases', betterNumbers(todayCases), lightClass);
    countryInfoText += getListItem('Today deaths', betterNumbers(todayDeaths), lightClass);
    countryInfoText += '</ul>';
    countryInfoText += '</div>';
    countryInfoText += '</div>';
    replaceInside(countryInfoText, elemId);
    setChartLoading('');
}

/**
 * show data about the country
 * @param data
 * @param elemId
 */
function showCountryInfoAndData(data, elemId) {
    if (!issetObj(data) || !issetElem(elemId)) return;
    getDataCountry(chosenCountry).then(d => {
        if (!issetObj(d)) return;
        const population = d.population;
        const totalCases = parseInt(data.cases);
        const totalTested = parseInt(data.tests);
        let countryInfoText2 = '';
        const casesPerOneMillion = parseInt(data.casesPerOneMillion);
        const deathsPerOneMillion = parseInt(data.deathsPerOneMillion);
        countryInfoText2 += '<ul class="list-group">';
        countryInfoText2 += getListItem('Population', abbreviate(population, 2, false, false), 'secondary');
        countryInfoText2 += getListItem('Cases', betterNumbers(totalCases), '');
        countryInfoText2 += getListItem('Tested percentage', getPercentage(totalTested, population, 4), '');
        countryInfoText2 += getListItem('Affected percentage', getPercentage(totalCases, population, 4), '');
        countryInfoText2 += getListItem('Cases per 1M', betterNumbers(casesPerOneMillion), '');
        countryInfoText2 += getListItem('Deaths per 1M', betterNumbers(deathsPerOneMillion), '');
        countryInfoText2 += '</ul>';
        replaceInside(countryInfoText2, elemId);
    });
}

/**
 * get data about cases relative to a country
 */
function getTodayCasesAndCountryData() {
    replaceInside(loadingTxt, 'toDateStats');
    replaceInside(loadingTxt, 'countryInfo');
    replaceImg(loadingImgSrc, 'countryImg');
    getDataCovid('today', chosenCountry).then(data => {
        drawChart('today', data, 'canvasPieToDate');
        drawChart('tests', data, 'canvasPieTests');
        showToDateStats(data, 'toDateStats');
        showTodayStats(data, 'todayStats');
        showTestsStats(data, 'testsStats');
        showCountryInfoAndData(data, 'countryInfo');
        setChartLoading('');
    });
}

/**
 * get history and new data charts
 */
function getHistoryAndNewCasesCharts() {
    getDataCovid('history', chosenCountry).then(data => {
        drawChart('historyCases', data, 'historyCasesChart');
        drawChart('historyNewCases', data, 'historyNewCasesChart');
        drawChart('historygrowthHistory', data, 'growthHistoryChart');
        
    });
}


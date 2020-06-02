/**
 * retrieving data relative to corona virus
 * @param dataType
 * @param country
 * @return {Promise<any>}
 */
async function getDataCovid(dataType, country) {
    var apiLink = '';
    if (dataType == 'history')
        apiLink = 'https://disease.sh/v2/historical';
    if (dataType == 'today')
        apiLink = 'https://disease.sh/v2/countries';
    apiLink += '/' + country;
    return getJSONData(apiLink);
}
/**
 * retrieve general data about the country (Population,Cases,Tested percentage,Affected percentage,Cases per 1M,Deaths per 1M.
 * @param country
 * @return {Promise<any>}
 */
async function getDataCountry(country) {
    var apiLink = '';
    apiLink = 'https://restcountries.eu/rest/v2/alpha';
    apiLink += '/' + country;
    return getJSONData(apiLink);
}

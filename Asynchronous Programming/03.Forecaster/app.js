const btn = document.querySelector('#content #request #submit');
const forecastDiv = document.querySelector('#content #forecast');
const currentDiv = document.querySelector('#content #forecast #current');
const currentDivLabel = document.querySelector('#content #forecast #current .label');
const currentDivForecast = document.querySelector('#content #forecast #current .forecasts');
const upcomingDiv = document.querySelector('#content #forecast #upcoming');
const upcomingDivLabel = document.querySelector('#content #forecast #upcoming .label');
const upcomingDivForecast = document.querySelector('#content #forecast #upcoming .forecast-info');
btn.addEventListener('click', attachEvents);


async function attachEvents() {
    let locName = document.querySelector('#content #request #location').value;
    let url = `http://localhost:3030/jsonstore/forecaster/locations`;
    let res = await fetch(url);
    let data = await res.json();

    getRequests(data, locName);

}

async function getRequests(data, locName) {

    let locCode = 'undefined';

    for (const obj of data) {
        if (locName === obj.name) {
            locCode = obj.code;
        }
    }

    let todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${locCode}`;
    let upcomingUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${locCode}`;

    try {
        let res = await Promise.all([fetch(todayUrl), fetch(upcomingUrl)]);
        forecastDiv.style.display = 'block';
        currentDivForecast.style.display = 'none';
        upcomingDivForecast.style.display = 'none';

        if (res[0].status != 200) {
            throw new Error('Error');
        }

        let todayData = await res[0].json();
        let upcomingData = await res[1].json();

        getTodaysForecast(todayData);
        getUpcomingForecast(upcomingData);

    } catch (error) {
        upcomingDiv.style.display = 'none';
        currentDivLabel.textContent = 'Error 404';
    }
}

function getTodaysForecast(data) {
    currentDivForecast.style.display = 'inline-block';
    currentDivForecast.textContent = '';
    currentDivLabel.textContent = 'Current conditions';
    currentDivForecast.innerHTML += `
        <span class="condition symbol">${returnSymbol(data.forecast.condition)}</span>
        <span class="condition">
        <span class="forecast-data">${data.name}</span>
        <span class="forecast-data">${data.forecast.low}${returnSymbol('Degrees')}/${data.forecast.high}${returnSymbol('Degrees')}</span>
        <span class="forecast-data">${data.forecast.condition}</span>
        </span>
        </div>
    `;
}

function getUpcomingForecast(data) {
    upcomingDiv.style.display = 'block';
    upcomingDivForecast.style.display = 'block';
    upcomingDivForecast.textContent = '';

    upcomingDivLabel.textContent = 'Three-day forecast';

    upcomingDivForecast.innerHTML += `
        ${getEachForecast(data)}
    `;
}

function returnSymbol(param) {
    const symbolObj = {
        'Sunny': '&#x2600',
        'Partly sunny': '&#x26C5',
        'Overcast': '&#x2601',
        'Rain': '&#x2614',
        'Degrees': '&#176'
    };
    return symbolObj[param];
}

function getEachForecast(data) {
    let info = '';
    for (const element of data.forecast) {
        info += `
            <span class="upcoming">
            <span class="symbol">${returnSymbol(element.condition)}</span>
            <span class="forecast-data">${element.low}${returnSymbol('Degrees')}/${element.high}${returnSymbol('Degrees')}</span>
            <span class="forecast-data">${element.condition}</span>
            </span>
        `;
    }
    return info;
}
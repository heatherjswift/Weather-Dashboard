

// fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely,alerts&appid=eff9a5abfd0c046b553f00639843fdd6")
//     .then(function(response) {
//         return response.json();
//         }).then(function(data) {
//             console.log(data);
//             console.log(data.daily[0].weather[0].icon)
//                 let uvi = data.uvi
//                 let uviEl = document.querySelector(".uvi")
//                 if (uvi < 5) {
//                    uviEl.classList.add(".low") 
//                 }
//         });
// get api data to see what's available 
//console.log(data.daily[0].weather[0].icon)

// if (cityName === "") {
//     alert("You need to enter a city name!");
//     return false;
// }

function doSearch (cityName) {
   
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityName)}&appid=eff9a5abfd0c046b553f00639843fdd6`)
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(`Data fetched for ${cityName}:`, data);
        const current = data.list[0];
        const currentTemp = (current.main.temp - 273.15).toFixed(1);
        
        const currentWeatherElement = document.getElementById("current-weather");
        const currentWeatherTempElement = currentWeatherElement.getElementsByClassName('tempCurrent')[0];

        currentWeatherTempElement.innerHTML = `Temp: ${currentTemp} °C`;

        const currentWind = (current.wind.speed)
        const currentWeatherWindElement = currentWeatherElement.getElementsByClassName('windCurrent')[0];
        currentWeatherWindElement.innerHTML = `Wind: ${currentWind} MPH`;

        const currentHumidity = (current.main.humidity)
        const currentWeatherHumidityElement = currentWeatherElement.getElementsByClassName('humidityCurrent')[0];
        currentWeatherHumidityElement.innerHTML = `Humidity: ${currentHumidity} %`
        
        

        var fiveDayEl = document.getElementById("five-day");
        var forecastBoxes = fiveDayEl.getElementsByClassName("forecast-box")
        for (let i = 1; i < 6; i++) {
            var thisDay = data.list[i];
            var thisBox = forecastBoxes[i - 1];

            // var dates = document.getElementsByClassName("date");
            // dates = today[i + 1];
            
           
            // var thisIcon = thisBox.getElementsByClassName('weather-icon')[0];
            // thisIcon.innerHTML = (thisDay.weather[0].icon);
            console.log(thisDay.weather[0].icon)
            
            var thisTemp = thisBox.getElementsByClassName('temp')[0];
            thisTemp.innerHTML = `Temp: ${(thisDay.main.temp - 273.15).toFixed(1)} °C`;

            var thisWind = thisBox.getElementsByClassName('wind')[0];
            thisWind.innerHTML = `Wind: ${(thisDay.wind.speed)} MPH`;

            var thisHumidity = thisBox.getElementsByClassName('humidity')[0];
            thisHumidity.innerHTML = `Humidity: ${(thisDay.main.humidity)} %`;

        };
    });
}

//save search entry to local storage       

document.getElementById("search-button").onclick = function () {
    saveCity();
}

function getParsedStorage () {
    var stringStorage = localStorage.getItem("savedCities");

    try {
        var parsedStorage = JSON.parse(stringStorage) || [];
    }
    catch (err) {
        console.error("Issue parsing json", err);
    }

    return parsedStorage;
}

function refresh () {
    const parsedStorage = getParsedStorage();

    const searchHistoryElement = document.getElementById("search-history");

    var html = ``;

    parsedStorage.forEach((city) => {
        html = `${html}<div style="padding: 5px 0px;"><button type="button" class="btn btn-info col-12" data-city-name="${city.name}">${city.label}</button></div>`;
    });

    searchHistoryElement.innerHTML = html;

    var buttons = searchHistoryElement.getElementsByClassName('btn');
    
    for (var i = 0; i < buttons.length; i++) {
        var btn = buttons[i];
        btn.onclick = function (trinket) {
            var cityName = trinket.srcElement.getAttribute('data-city-name');
            console.log('City name:', cityName);
            doSearch(cityName);
        }
    }
}

var saveCity = function() {
    var cityLabel = document.getElementById("search-bar").value;
    var cityName = cityLabel.trim().toLowerCase();

    var parsedStorage = getParsedStorage();

    const existingCity = parsedStorage.filter((c) => {
        return c.name === cityName;
    })[0];

    if (!existingCity) {
        // it's not in here
        var toAdd = {
            name: cityName,
            label: cityLabel,
            timeSearched: new Date()
        };

        parsedStorage.unshift(toAdd);
    }

    localStorage.setItem("savedCities", JSON.stringify(parsedStorage));

    refresh();

    doSearch(cityName);
}


// current date
const today = moment();
document.getElementById("currentDay").innerHTML = today.format("(DD/MM/YYYY)")

refresh();


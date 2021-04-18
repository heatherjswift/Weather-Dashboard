

// fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely,alerts&appid=eff9a5abfd0c046b553f00639843fdd6")
//     .then(function(response) {
//         return response.json();
//         }).then(function(data) {
//             console.log(data);
//             console.log(data.daily[0].weather[0].icon)
                // let uvi = data.uvi
                // let uviEl = document.querySelector(".uvi")
                // if (uvi < 5) {
                //    uviEl.classList.add(".low") 
                // }
//         });
// get api data to see what's available 
fetch("https://api.openweathermap.org/data/2.5/forecast?q=burlington&appid=eff9a5abfd0c046b553f00639843fdd6")
    .then(function(response) {
    return response.json();
    }).then(function(data) {
        console.log(data);
        //console.log(data.daily[0].weather[0].icon)
        for (let i = 0; i < 5; i++) {
            console.log(data.list[i])
        
        };
    });

//save search entry to local storage       

document.getElementById("search-button").onclick = function () {saveCity(), recallCity()}

var saveCity = function() {
    textToSave = document.getElementById("search-bar").value;
    localStorage.setItem("saveCity", textToSave);
}

var recallCity = function () {
    var savedCity = localStorage.getItem("saveCity");
    savedCity.innerHTML = <
    entries = [];
    for (var i = 0; i < savedCity.length; i++) {
        entries.push(savedCity[i]);
    }
}


// current date
const today = moment();
document.getElementById("currentDay").innerHTML = today.format("(DD/MM/YYYY)")


//<button type="button" class="btn btn-info col-12" id="recall-city"></button>

// {API key}
// `api.openweathermap.org/data/2.5/weather?q=${city name}&appid={API key}`
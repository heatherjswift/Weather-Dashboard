fetch("https://api.openweathermap.org/data/2.5/onecall?lat=33.441792&lon=-94.037689&exclude=hourly,minutely,alerts&appid=eff9a5abfd0c046b553f00639843fdd6")
    .then(function(response) {
        return response.json();
        }).then(function(data) {
            console.log(data);
        });
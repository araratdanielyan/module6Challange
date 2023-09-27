$(document).ready(function () {

    let APIKey = "395377e3a71783147f79cf2e2dbbb4df";
    let city = $('#searchId');




    // Updating User Input History (Need to Modify Buttons)
    function updateHistory() {
        let storageData = JSON.parse(localStorage.getItem('searches'))
        if (storageData && storageData.length > 0) {
            storageData.forEach((item) => {
                let button = '<button class = "history is-medium has-background-grey-light" data-id="' + item + '" type="submit">' + item + '</button>';
                $(button).appendTo('.searshHistory');
            });
        }
    }

    updateHistory();

    function renderCurrentWeather(city, data){
        let date = dayjs().format('M/D/YYYY');
        let temp = data.main.temp;
        let windSpeed = data.wind.speed;
        let humidity = data.main.humidity;
        let url = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let description = data.weather[0].description || data[0].main;

        let tempEl = document.querySelector(".temp");
        tempEl.textContent = `Temp: ${temp} °F`;
        let windEl = document.querySelector(".wind");
        windEl.textContent = `Wind: ${windSpeed} MPH`;
        let humidityEl = document.querySelector(".humid");
        humidityEl.textContent = `Humidity: ${humidity} %`;
    }

    function renderForecast(data){

    }


    function renderWeather(city, data){
        renderCurrentWeather(city, data.list[0]);
        renderForecast(data.list);
    }

    function fetchWeather(data){
        let {lat} = data;
        let {lon} = data;

        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
        fetch(url)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {

                    console.log("data = ", data);
                    renderWeather(city, data);
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    function fetchGeoCodes(city) {
        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`;
        fetch(url)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                if (!data[0]) {
                    alert('Location not found');
                } else {
                    console.log("data = ", data);
                    fetchWeather(data[0]);
                }
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    $('.button').click((e) => {

        let textarea = $('#searchId');
        let storageData = JSON.parse(localStorage.getItem('searches')) || [];
        let text = textarea.val();
        city = text;
        textarea.attr("data-id", text);
        storageData.push(text);
        storageData = JSON.stringify(storageData);
        localStorage.setItem('searches', storageData);
        let button = '<button class = "history is-medium has-background-grey-light" data-id="' + text + '" type="submit">' + text + '</button>';
        $(button).appendTo('.searshHistory');
        fetchGeoCodes(city);
    });

});


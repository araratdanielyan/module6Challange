$(document).ready(function () {

    let APIKey = "395377e3a71783147f79cf2e2dbbb4df";
    let city = $('#searchId');



    // Updating User Input History
    function updateHistory() {
        let storageData = JSON.parse(localStorage.getItem('searches'))
        if (storageData && storageData.length > 0) {
            storageData.forEach((item) => {
                let button = '<button class="buttonHistory" data-id="' + item + '" type="submit">' + item + '</button>';
                $(button).appendTo('.searshHistory');
            });
        }
    };

    updateHistory();

    function renderCurrentWeather(city, data){
        let date = dayjs().format('M/D/YYYY');
        let temp = data.main.temp;
        let windSpeed = data.wind.speed;
        let humidity = data.main.humidity;
        let url = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        let description = data.weather[0].description || data[0].main;

        let CityName = document.querySelector(".cityName");
        CityName.textContent = `${city} ${date}`;
        let tempEl = document.querySelector(".temp");
        tempEl.textContent = `Temp:${temp}°F`;
        let windEl = document.querySelector(".wind");
        windEl.textContent = `Wind:${windSpeed}MPH`;
        let humidityEl = document.querySelector(".humid");
        humidityEl.textContent = `Humidity:${humidity}%`;
    }

    function renderForecast(data){

        // Date
        
        let dayOne = document.querySelector(".dayOne");
        dayOne.textContent = `${data[1].dt_txt.slice(5, 7)}/${data[1].dt_txt.slice(8, 10)}/${data[1].dt_txt.slice(0, 4)}`;

        let dayTwo = document.querySelector(".dayTwo");
        dayTwo.textContent = `${data[8].dt_txt.slice(5, 7)}/${data[8].dt_txt.slice(8, 10)}/${data[8].dt_txt.slice(0, 4)}`;
          
        let dayThree = document.querySelector(".dayThree");
        dayThree.textContent = `${data[15].dt_txt.slice(5, 7)}/${data[15].dt_txt.slice(8, 10)}/${data[15].dt_txt.slice(0, 4)}`;

        let dayFour = document.querySelector(".dayFour");
        dayFour.textContent = `${data[23].dt_txt.slice(5, 7)}/${data[23].dt_txt.slice(8, 10)}/${data[23].dt_txt.slice(0, 4)}`;

        let dayFive = document.querySelector(".dayFive");
        dayFive.textContent = `${data[31].dt_txt.slice(5, 7)}/${data[31].dt_txt.slice(8, 10)}/${data[31].dt_txt.slice(0, 4)}`;

        //Weather Icons

        let logoOne = document.querySelector(".logoOne");
        logoOne.src = `https://openweathermap.org/img/wn/${data[1].weather[0].icon}@2x.png`;

        let logoTwo = document.querySelector(".logoTwo");
        logoTwo.src = `https://openweathermap.org/img/wn/${data[8].weather[0].icon}@2x.png`;

        let logoThree = document.querySelector(".logoThree");
        logoThree.src = `https://openweathermap.org/img/wn/${data[15].weather[0].icon}@2x.png`;

        let logoFour = document.querySelector(".logoFour");
        logoFour.src = `https://openweathermap.org/img/wn/${data[23].weather[0].icon}@2x.png`;

        let logoFive = document.querySelector(".logoFive");
        logoFive.src = `https://openweathermap.org/img/wn/${data[31].weather[0].icon}@2x.png`;

        //Temperature

        let tempOne = document.querySelector(".tempOne");
        tempOne.textContent = `Temp: ${data[1].main.temp}°F`;

        let tempTwo = document.querySelector(".tempTwo");
        tempTwo.textContent = `Temp: ${data[8].main.temp}°F`;

        let tempThree = document.querySelector(".tempThree");
        tempThree.textContent = `Temp: ${data[15].main.temp}°F`;

        let tempFour = document.querySelector(".tempFour");
        tempFour.textContent = `Temp: ${data[23].main.temp}°F`;

        let tempFive = document.querySelector(".tempFive");
        tempFive.textContent = `Temp: ${data[31].main.temp}°F`;

        //Wind

        let windOne = document.querySelector(".windOne");
        windOne.textContent = `Wind: ${data[1].wind.speed}MPH`;

        let windTwo = document.querySelector(".windTwo");
        windTwo.textContent = `Wind: ${data[8].wind.speed}MPH`;

        let windThree = document.querySelector(".windThree");
        windThree.textContent = `Wind: ${data[15].wind.speed}MPH`;

        let windFour = document.querySelector(".windFour");
        windFour.textContent = `Wind: ${data[23].wind.speed}MPH`;

        let windFive = document.querySelector(".windFive");
        windFive.textContent = `Wind: ${data[31].wind.speed}MPH`;

        //Humidity

        let humidOne = document.querySelector(".humidOne");
        humidOne.textContent = `Humidity:${data[1].main.humidity}%`;

        let humidTwo = document.querySelector(".humidTwo");
        humidTwo.textContent = `Humidity:${data[8].main.humidity}%`;

        let humidThree = document.querySelector(".humidThree");
        humidThree.textContent = `Humidity:${data[15].main.humidity}%`;

        let humidFour = document.querySelector(".humidFour");
        humidFour.textContent = `Humidity:${data[23].main.humidity}%`;

        let humidFive = document.querySelector(".humidFive");
        humidFive.textContent = `Humidity:${data[31].main.humidity}%`;

    }

    function renderWeather(city, data){
        renderCurrentWeather(city, data.list[0]);
        renderForecast(data.list);
    }


    //Initiating Api call using longitude and latitude
    function fetchWeather(city, data){
        let {lat} = data;
        let {lon} = data;

        let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;
        fetch(url)
            .then(function (res) {
                return res.json();
            })
            .then(function (data) {
                    renderWeather(city, data);
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    //Initiating Api call using City name and passing lon and lan parameters to getchWeather function

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
                    fetchWeather(city, data[0]);
                }
            })
            .catch(function (err) {
                console.error(err);
            });
    }

    //Storing User input in local storage and passing city name to geocoding function

    $('.button').click((e) => {

        let textarea = $('#searchId');
        let storageData = JSON.parse(localStorage.getItem('searches')) || [];
        let text = textarea.val();
        city = text;
        textarea.attr("data-id", text);
        storageData.push(text);
        storageData = JSON.stringify(storageData);
        localStorage.setItem('searches', storageData);
        let button = '<button class="buttonHistory" data-id="' + text + '" type="submit">' + text + '</button>';
        $(button).appendTo('.searshHistory');
        fetchGeoCodes(city);
    });

    $('.buttonHistory').each((key,item) => {
        $(item).click((e) =>{
            let city = $(e.target).text();
            fetchGeoCodes(city);
        })
    });

});

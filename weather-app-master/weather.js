class WeatherApp {
    constructor() {
        
        // TODO: 1: Create a data structure that stores the current weather and forecast for all cities
        this.cityWeather = {};

        // TODO: 2 Listen when a dropdown list is changed
        const cityDropDownE = document.getElementById('cityDropdown');
        console.log(cityDropDownE);
        cityDropDownE.addEventListener('change', this.selectCity.bind(this), false);

        // TODO: 3 Fetch data for the current selected city
        const selectedCity = cityDropDownE.value;
        this.sendRequest(selectedCity);
    }

    selectCity(event) {
        // TODO: 2-1: Display value
        console.log('select value');
        console.log(event.target.value);

        const city = event.target.value;
        // TODO: 11: Get the city weather info or display it
        if(!this.cityWeather[city]){
            this.sendRequest(city);
        } else {
            this.displayCurrentWeather(city)
        }

        this.displayCurrentWeather
        console.log(this.cityWeather);

    }

    sendRequest(city) {
        // TODO: 4: Build query string to get weather information using Yahoo API
        const format ='%22)&format=json'
        const base_uri = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22${city}${format}`

        // TODO: 5: Fetch data using getJSON
        $.getJSON(base_uri)
            .done((json) => {
                this.processResponse(city,json)
            })
            .fail((jqxhr, textStatus, error) => {
                const err = textStatus + "," + error
                console.log("Request failed" + err)
            })
    }

    processResponse(city, json) {
        // TODO: 6: access the weather information
        const item = json.query.results.channel.item;
        console.log('#6');
        console.log(item);
        // TODO: 7: store in the cityWeather object in our memory
        if (item) {
            //add current weather
            this.cityWeather[city] = {}; //Vancouver: {}
            this.cityWeather[city].current = item['condition'];
            this.cityWeather[city].forecast = item['forecast'];

            console.log('current weather')
            console.log(item)

            //display current weather
            this.displayCurrentWeather(city);
        }
    }

    displayCurrentWeather(city) {

        if (this.cityWeather[city]){
            const cityE = document.querySelector('.current .city')
            
            console.log('what is cityE?')
            console.log(cityE);
            
            cityE.textContent = city; 

            const dateE = document.querySelector('.current .date')            
            dateE.textContent = this.cityWeather[city].current.date; 

            const tempE = document.querySelector('.current .temp')            
            tempE.textContent = this.cityWeather[city].current.temp +'F'; 

            const descriptionE = document.querySelector('.current .description')            
            descriptionE.textContent = this.cityWeather[city].current.text; 

            this.displayForecast(this.cityWeather[city].forecast)
        
        }
        // TODO: 8 Display weather in the DOM
    }

    displayForecast(forecastArray) {
        // TODO: 12: get forecast element from the DOM
        const forecastElements = document.querySelectorAll('.forecast .item');

        // TODO: 13: Display 1 day forecast

        //let i = 0
        for(let i = 0; i<forecastArray.length; i++) {
        const dateE = forecastElements[i].querySelector('.date');
        dateE.textContent = forecastArray[i].day + ',' + forecastArray[i].date

        const highTempE = forecastElements[i].querySelector('.hightemp');
        highTempE.textContent = forecastArray[i].high + 'F'

        const lowTempE = forecastElements[i].querySelector('.lowtemp');
        lowTempE.textContent = forecastArray[i].low + 'F'

        const descriptionTempE = forecastElements[i].querySelector('.description');
        descriptionTempE.textContent = forecastArray[i].text
        }
    }
}

// Instantiate the weather app
const weatherApp = new WeatherApp()

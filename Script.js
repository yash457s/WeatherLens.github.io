var form = document.querySelector('form');
var input = document.querySelector('input');
var main = document.querySelector('#mainContent');
var formContainer = document.querySelector('.form');
var msg = document.querySelector('#message');
var cities=[];
form.addEventListener('submit', async function (evt) {
    evt.preventDefault();
    var inputText = input.value;
    msg.innerText = "";
    try {
        var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=e5ecb286dead4694bd1100143210110&q=${inputText}&aqi=yes`);
        var data = await response.json();
        if(cities.indexOf(data.location.name)!==-1)
        {
            msg.innerText = "City already added...";
        }
        else
        {
            createCard(data);
            cities.push(data.location.name);
        }
     
    }
    catch (e) {
        msg.innerText = "Please Enter the valid city name 😩";
    }
    input.value = "";
})

function createCard(data) {
    let div = document.createElement('div');
    let img = document.createElement('img');
    let condition = document.createElement('h3');
    let temprature = document.createElement('h4');
    let wind = document.createElement('h4');
    let humidity = document.createElement('h4');
    let city = document.createElement('h2');
    div.classList.add('wheather-container');
    city.innerText = data.location.name;
    div.append(city);
    img.src = data.current.condition.icon;
    div.append(img);
    condition.innerText = data.current.condition.text;
    temprature.innerText = `Temp Celcius : ${data.current.temp_c}`;
    wind.innerText = `Wind (Kph) :${data.current.wind_kph}`
    humidity.innerText = `Humidity :${data.current.humidity}`
    div.append(condition);
    div.append(temprature);
    div.append(wind);
    div.append(humidity);
    main.append(div);
}
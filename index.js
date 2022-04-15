//0104fb2f0d3190194238228c8f88ff98 Api Key Weather Api

var mainContainer = document.querySelector("#main-container");
mainContainer.setAttribute("id", "beforeAppend");
var container = document.querySelector("#weather-container");
var weatherInfo = document.querySelector("#weather-info");
weatherInfo.setAttribute("id", "beforeAppend-info");
var currtime = document.querySelector("#time");
var currdate = document.querySelector("#date");
var mapFrame = document.querySelector("#mapFrame");
var dailyWeather = document.querySelector("#daily-weather");
dailyWeather.style.display = "none";

var dayArr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN", "MON"];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thrusday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
setInterval(() => {
  let newDate = new Date();
  var min = newDate.getMinutes();
  let hour = newDate.getHours();
  let ampm = hour >= 12 ? "PM" : "AM";
  let day = newDate.getDay();
  let date = newDate.getDate();
  let month = newDate.getMonth();
  let hour12hr = hour > 12 ? hour % 12 : hour;
  hour12hr == 0 ? (hour12hr = 12) : hour12hr;
  if (min < 10) {
    currtime.innerHTML = `<p>${hour12hr}:0${min} ${ampm}</p>`;
  } else {
    currtime.innerHTML = `<p>${hour12hr}:${min} ${ampm}</p>`;
  }
  currdate.innerHTML = `<p>${days[day]}, ${date} ${months[month]}</p>`;
}, 1000);

var city = document.querySelector("#city");
city.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    getWeather();
  }
});

var long;
var lat;

async function getWeather() {
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=0104fb2f0d3190194238228c8f88ff98`
    );
    let data = await res.json();
    let lat = data.coord.lat;
    let long = data.coord.lon;
    weekWeather(lat, long);
    mainContainer.removeAttribute("id", "beforeAppend");
    weatherInfo.removeAttribute("id", "beforeAppend-info");
    mainContainer.setAttribute("id", "main-container");
    weatherInfo.setAttribute("id", "weather-info");
    appendData(data);
    mapFrame.src =
      src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCCGMkQeTf8ynvI1QRXd1g_IGxZyzjHI9s&q=${city.value}`;
  } catch (err) {
    console.log("Error: ", err);
  }
}

function appendData(data) {
  container.innerHTML = "";
  var icon = data.weather[0].icon;
  let imgDiv = document.createElement("span");
  var img = document.createElement("img");
  img.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);

  var imgDesc = document.createElement("p");
  imgDesc.innerText = `${data.weather[0].description.toUpperCase()}`;
  imgDesc.setAttribute("id", "weather-img-info");
  imgDiv.setAttribute("id", "weather-img");
  imgDiv.append(img, imgDesc);

  let item = document.createElement("div");
  item.setAttribute("class", "fetchData");
  let name = document.createElement("p");
  name.innerText = data.name;
  name.setAttribute("id", "location");
  let temp = document.createElement("p");
  temp.innerHTML = `Temperature&nbsp&nbsp&nbsp${data.main.temp} &deg;C`;

  let pressure = document.createElement("p");
  pressure.innerHTML = `Pressure&nbsp&nbsp&nbsp${data.main.pressure} hpa`;

  let humidity = document.createElement("p");
  humidity.innerHTML = `Humidity&nbsp&nbsp&nbsp${data.main.humidity}%`;

  let sunrise = document.createElement("p");
  sunrise.innerHTML = `Sunrise&nbsp&nbsp&nbsp${window
    .moment(data.sys.sunrise * 1000)
    .format("hh:mm A")}`;

  let sunset = document.createElement("p");
  sunset.innerHTML = `Sunset&nbsp&nbsp&nbsp${window
    .moment(data.sys.sunset * 1000)
    .format("hh:mm A")}`;

  item.append(imgDiv, name, temp, pressure, humidity, sunrise, sunset);
  container.append(item);
  dailyWeather.style.display = "grid";
  dailyWeather.innerHTML = "";
}

async function weekWeather(lat, lon) {
  let res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=0104fb2f0d3190194238228c8f88ff98`
  );
  let data = await res.json();
  var dataArr = data.daily;
  appendDaily(dataArr);
}

function appendDaily(array) {
  array.forEach((el, index) => {
    // console.log(el.weather[0].icon, dayArr[index]);
    // console.log(array);

    var item = document.createElement("div");
    let day = document.createElement("p");
    day.innerText = `${dayArr[index]}`;
    day.setAttribute("id", "day");
    let img = document.createElement("img");
    img.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`
    );
    var min = document.createElement("p");
    min.innerHTML = `Min&nbsp&nbsp${el.temp.min} &deg;C`;
    min.setAttribute("id", "min-temp");
    var max = document.createElement("p");
    max.innerHTML = `Max&nbsp&nbsp${el.temp.max} &deg;C`;
    max.setAttribute("id", "max-temp");
    item.append(day, img, min, max);
    dailyWeather.append(item);
  });
}

//https://openweathermap.org/img/wn/01d@2x.png

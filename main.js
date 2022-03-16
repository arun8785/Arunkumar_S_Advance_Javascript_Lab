const api = {
  key: "7e3f21edee540e6110af347b55eb1ab2",
  base: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box");
searchBox.addEventListener("keypress", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchBox.value);
  }
}

function getResults(city) {
  fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then((response) => {
      console.log(response);
      displayResults(response);
    });
}

function displayResults(response) {
  let city = document.querySelector(".location .city");
  city.innerText = `${response.name},${response.sys.country}`;

  let now = new Date();
  let myDate = document.querySelector(".location .date");
  myDate.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(response.main.temp)} <span>°c</span>`;

  let weather = document.querySelector(".current .weather");
  weather.innerText = response.weather[0].main;

  let highlow = document.querySelector(".hi-low");
  highlow.innerText = `${Math.round(response.main.temp_min)} °c - ${Math.round(
    response.main.temp_max
  )} °c`;
}

function dateBuilder(dt) {
  let mon = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  let day, date, month, year;

  day = days[dt.getDay()];
  month = mon[dt.getMonth()];
  year = dt.getFullYear();
  date = dt.getDate();

  return `${day} ${month} ${year} ${date}`;
}

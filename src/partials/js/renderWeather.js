import { fetchTripWeather } from './fetchAPI';
import { updateTimer } from './weatherTimer';

const modalFormRef = document.querySelector(`.modal-form`);
const citySelect = document.querySelector(`.citys-list`);
const weatherListRef = document.querySelector(`.weather-list`);
const modalWindowRef = document.querySelector('.modal');
const startDateInputRef = document.querySelector(`.start-date-input`);
const endDateInputRef = document.querySelector(`.end-date-input`);
const tripListRef = document.querySelector(`.trip-list`);
const overlayRef = document.querySelector(`.modal-overlay`);
const currWeatherContainerRef = document.querySelector(`.current-weather`);

const API_KEY = `6X4R77NCXD3UAKE2W2ZQTGHCB`;
let BASE_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/%5bcity%5d/%5bdate1%5d/%5bdate2%5d?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;
let TODAY_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/%5bcity%5d/today?unitGroup=metric&include=days&key=${API_KEY}&contentType=json`;

modalFormRef.addEventListener(`submit`, getTripWeather);

function getTripWeather(event) {
  event.preventDefault();

  const startDate = startDateInputRef.value;
  const endDate = endDateInputRef.value;
  const selectCity = citySelect.value;

  const updatedBaseUrl = BASE_URL.replace(`%5bdate1%5d`, startDate)
    .replace('%5bcity%5d', selectCity)
    .replace(`%5bdate2%5d`, endDate);

  const updatedTodayUrl = TODAY_URL.replace(`%5bcity%5d`, selectCity);

  modalWindowRef.style.display = 'none';
  overlayRef.style.display = 'none';

  weatherListRef.textContent = ``;

  tripListRef.insertAdjacentHTML(
    'afterbegin',
    tripListMarkup(selectCity, startDate, endDate)
  );

  renderTodayWeather(updatedTodayUrl);

  renderWeather(updatedBaseUrl);

  updateTimer;
}

async function renderWeather(currentUrl) {
  let weatherlist = await fetchTripWeather(currentUrl);
  weatherListRef.insertAdjacentHTML(
    'beforeend',
    await weatherListMarkup(weatherlist)
  );
}

// RENDER TODAY

async function renderTodayWeather(todayUrl) {
  let todayWeatherObj = await fetchTripWeather(todayUrl);
  console.log(todayWeatherObj);
  currWeatherContainerRef.insertAdjacentHTML(
    'beforeend',
    await todayWeatherMarkup(todayWeatherObj)
  );
}

// MARKUP MARKUP MARKUP MARKUP

async function todayWeatherMarkup(todayWeatherObj) {
  const currWeather = await todayWeatherObj;
  const todayMarkup = currWeather.days
    .map(options => {
      const currTemp = options.temp;
      const currIcon = options.icon;
      console.log(currIcon);

      return `<img src="./images/weatherIcon/cloudy.png" alt="${currIcon}"/><p>${currTemp}</p>`;
    })
    .join(``);
  return todayMarkup;
}

async function weatherListMarkup(weatherProm) {
  const weather = await weatherProm;

  const markup = weather.days
    .map(day => {
      const maxTemp = day.tempmax;
      const minTemp = day.tempmin;
      const weatherIcon = day.icon;
      const tripDayDate = day.date;

      return `<li class="weather-info">
    <div class='date'><img src="./images/weatherIcon/cloudy.png" alt="${weatherIcon}"/></div>
           <div class='icon' ></div>
           <p class='maxt-mint'>${maxTemp} / ${minTemp}</p></li>`;
    })
    .join('');
  return markup;
}

function tripListMarkup(city, startDate, endDate) {
  return `<li class="trip-item"><a href="" class="trip-item-link">
  <img src="./images/cities/Delhi.jpg" alt="${city}"/><div class="trip-info"><p class="trip-city">${city}</p><p class="trip-time">${startDate} - ${endDate}</p></div></a></li>`;
}

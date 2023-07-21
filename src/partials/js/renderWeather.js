import { fetchTripWeather } from './fetchAPI';
import { updateTimer } from './weatherTimer';
import {
  todayWeatherMarkup,
  weatherListMarkup,
  tripListMarkup,
} from './markup';

const modalFormRef = document.querySelector(`.modal-form`);
const citySelect = document.querySelector(`.citys-list`);
const weatherListRef = document.querySelector(`.weather-list`);
const modalWindowRef = document.querySelector('.modal');
const startDateInputRef = document.querySelector(`.start-date-input`);
const endDateInputRef = document.querySelector(`.end-date-input`);
const tripListRef = document.querySelector(`.trip-list`);
const overlayRef = document.querySelector(`.modal-overlay`);
const currWeatherContainerRef = document.querySelector(`.current-weather`);
const tripBtnRef = document.querySelector(`.btn-block`);

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

  const urlArray = [];
  urlArray.push(updatedTodayUrl);

  renderTodayLinkWeather(urlArray);
}

// RENDER RENDER RENDER RENDER RENDER RENDER RENDER

function renderTodayLinkWeather(urlArray) {
  const liElements = tripListRef.querySelectorAll('li');
  console.log(liElements);

  for (let i = 0; i < liElements.length; i++) {
    liElements[i].addEventListener(`click`, () => {
      renderTodayWeather(urlArray[i]);
    });
  }
}

async function renderWeather(currentUrl) {
  let weatherlist = await fetchTripWeather(currentUrl);
  weatherListRef.insertAdjacentHTML(
    'beforeend',
    await weatherListMarkup(weatherlist)
  );
}

async function renderTodayWeather(todayUrl) {
  let todayWeatherObj = await fetchTripWeather(todayUrl);
  currWeatherContainerRef.textContent = ``;

  currWeatherContainerRef.insertAdjacentHTML(
    'beforeend',
    await todayWeatherMarkup(todayWeatherObj)
  );
}

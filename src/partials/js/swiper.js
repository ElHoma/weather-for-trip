const swiperWrapper = document.querySelector('.swiper-wrapper');
const prevButton = document.querySelector('.left-btn');
const nextButton = document.querySelector('.right-btn');
const weatherList = document.querySelector(`.weather-list`);

let currentPosition = 0;

// TRRIP SWIPER
prevButton.addEventListener('click', () => {
  currentPosition -= 310;
  if (currentPosition > 0) {
    currentPosition = 0;
  }
  swiperWrapper.style.transform = `translateX(${currentPosition}px)`;
});

nextButton.addEventListener('click', () => {
  currentPosition += 310;

  swiperWrapper.style.transform = `translateX(${currentPosition}px)`;
});

// WEATHER SWIPER

const weatherLeftBtn = document.querySelector(`.left-weather-btn`);
const weatherrightBtn = document.querySelector(`.right-weather-btn`);

let weatherCurrPosition = 0;

weatherLeftBtn.addEventListener('click', () => {
  weatherCurrPosition -= 200;
  if (weatherCurrPosition > 0) {
    weatherCurrPosition = 0;
  }
  weatherList.style.transform = `translateX(${weatherCurrPosition}px)`;
});

weatherrightBtn.addEventListener('click', () => {
  weatherCurrPosition += 200;

  weatherList.style.transform = `translateX(${weatherCurrPosition}px)`;
});

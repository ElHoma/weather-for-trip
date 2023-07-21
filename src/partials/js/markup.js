export async function todayWeatherMarkup(todayWeatherObj) {
  const currWeather = await todayWeatherObj;

  const todayMarkup = currWeather.days
    .map(options => {
      const currTemp = options.temp;
      const currIcon = options.icon;

      return `<img src="https://res.cloudinary.com/drt9u5b0w/image/upload/f_auto,q_auto/v1/weather-icon/${currIcon}" alt="${currIcon}"/><p>${currTemp}</p><p>${currWeather.address}</p>`;
    })
    .join(``);
  return todayMarkup;
}

export async function weatherListMarkup(weatherProm) {
  const weather = await weatherProm;

  const markup = weather.days
    .map(day => {
      const maxTemp = day.tempmax;
      const minTemp = day.tempmin;
      const weatherIcon = day.icon;
      const tripDayDate = day.datetime;

      return `<li class="weather-info">
    <div class='date'><p>${tripDayDate}</p><img src="https://res.cloudinary.com/drt9u5b0w/image/upload/f_auto,q_auto/v1/weather-icon/${weatherIcon}" alt="${weatherIcon}"/></div>
           <div class='icon' ></div>
           <p class='maxt-mint'>${maxTemp} / ${minTemp}</p></li>`;
    })
    .join('');
  return markup;
}

export function tripListMarkup(city, startDate, endDate) {
  return `<li class="trip-item">
  <img class="trip-img" src="https://res.cloudinary.com/drt9u5b0w/image/upload/f_auto,q_auto/v1/cities/${city}" alt="${city}"/><div class="trip-info"><p class="trip-city">${city}</p><p class="trip-time">${startDate} - ${endDate}</p></div></li>`;
}

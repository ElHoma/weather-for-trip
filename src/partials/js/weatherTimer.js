const daysEl = document.querySelector(`span[data-days]`);
const hoursEl = document.querySelector(`span[data-hours]`);
const minutesEl = document.querySelector(`span[data-minutes]`);
const secondsEl = document.querySelector(`span[data-seconds]`);
const startDateInputRef = document.querySelector(`.start-date-input`);

function convertMs(ms) {
  // Кількість мілісекунд у одному одиниці часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Залишок днів
  const days = Math.floor(ms / day);
  // Залишок годин
  const hours = Math.floor((ms % day) / hour);
  // Залишок хвилин
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Залишок секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function updateTimer() {
  const selectedDate = new Date(startDateInputRef.value);

  if (selectedDate <= new Date()) {
    window.alert('Please choose a date and time in the future');
    return;
  }

  setInterval(() => {
    const currentTime = Date.now();
    const timeDifference = selectedDate.getTime() - currentTime;
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (
      daysEl.textContent === '00' &&
      hoursEl.textContent === '00' &&
      minutesEl.textContent === '00' &&
      secondsEl.textContent === '00'
    ) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

startDateInputRef.addEventListener('change', updateTimer);

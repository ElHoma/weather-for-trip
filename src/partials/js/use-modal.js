import { cities } from './city';

const modalWindowRef = document.querySelector('.modal');
const closeModalBtnRef = document.querySelector('.close-modal-btn');
const openModalBtnRef = document.querySelector('.open-modal-btn');
const citySelect = document.querySelector(`.citys-list`);
const overlayRef = document.querySelector(`.modal-overlay`);

openModalBtnRef.addEventListener('click', () => {
  modalWindowRef.style.display = 'block';
  overlayRef.style.display = 'block';
});

closeModalBtnRef.addEventListener('click', () => {
  modalWindowRef.style.display = 'none';
  overlayRef.style.display = 'none';
});

for (let i = 0; i < cities.length; i++) {
  let option = document.createElement('option');
  option.value = cities[i].name;
  option.text = cities[i].name;
  citySelect.appendChild(option);
}

const startDateInputRef = document.querySelector(`.start-date-input`);
const endDateInputRef = document.querySelector(`.end-date-input`);

// Отримуємо поточну дату
const today = new Date();

// Додаємо 15 днів до поточної дати
const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 15);

// Форматуємо дату у вигляді "рік-місяць-день"
const formattedMaxDate = maxDate.toISOString().split('T')[0];

// Форматуємо сьогоднішню дату у вигляді "рік-місяць-день"
const formattedToday = today.toISOString().split('T')[0];

// Встановлюємо максимальну дату для елемента <input>
startDateInputRef.setAttribute('max', formattedMaxDate);

startDateInputRef.setAttribute('min', formattedToday);
endDateInputRef.setAttribute('max', formattedMaxDate);

endDateInputRef.setAttribute('min', formattedToday);

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

const today = new Date();

const maxDate = new Date(today);
maxDate.setDate(today.getDate() + 15);

const formattedMaxDate = maxDate.toISOString().split('T')[0];

const formattedToday = today.toISOString().split('T')[0];

startDateInputRef.setAttribute('max', formattedMaxDate);

startDateInputRef.setAttribute('min', formattedToday);
endDateInputRef.setAttribute('max', formattedMaxDate);

endDateInputRef.setAttribute('min', formattedToday);

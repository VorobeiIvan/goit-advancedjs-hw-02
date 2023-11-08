import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const elements = {
  startBtn: document.querySelector('.js-startBtn'),
  input: document.querySelector('.js-input'),
  days: document.querySelector('.js-days'),
  hours: document.querySelector('.js-hours'),
  minutes: document.querySelector('.js-minutes'),
  seconds: document.querySelector('.js-seconds'),
};

elements.startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(), 
  minuteIncrement: 1, 
  onClose(selectedDates) {
    const now = new Date();
    const selectedDate = selectedDates[0];
    if (selectedDate > now) {
      elements.startBtn.removeAttribute('disabled');
    } else {
      errorAlert();
      elements.startBtn.setAttribute('disabled', 'disabled');
  
      elements.days.textContent = '00';
      elements.hours.textContent = '00';
      elements.minutes.textContent = '00';
      elements.seconds.textContent = '00';
    }
  },
};

// Функція для перетворення мілісекунд в об'єкт з днями, годинами, хвилинами та секундами
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? '0' + value : value.toString();
}

flatpickr('.js-input', options); // календар

// Функція виведення помилки
function errorAlert() {
  iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topRight',
    messageColor: 'white',
    timeout: 3000,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
  });
}

elements.startBtn.addEventListener('click', startTimer);

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  let timerInterval;
  timerInterval = setInterval(() => {
    let ms = 0;
    const now = new Date();
    convertMs(ms)

    ms = selectedDate - now;
    const { days, hours, minutes, seconds } = convertMs(ms);

    elements.days.textContent = addLeadingZero(days);
    elements.hours.textContent = addLeadingZero(hours);
    elements.minutes.textContent = addLeadingZero(minutes);
    elements.seconds.textContent = addLeadingZero(seconds);
    ms -= 1000;
    if (ms <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

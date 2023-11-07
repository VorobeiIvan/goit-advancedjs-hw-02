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

let timerInterval;
let ms = 0;
const now = new Date();

const options = {
  enableTime: true, //Вмикає засіб вибору часу
  time_24hr: true, // Відображає засіб вибору часу в 24-годинному режимі без вибору AM/PM, якщо ввімкнено.
  defaultDate: new Date(), //Встановлює початкові вибрані дати.Якщо ви використовуєте mode: "multiple"календар діапазону, надайте Arrayоб’єкти Dateабо масив рядків дат, які слідують за вашим dateFormat.В іншому випадку ви можете надати один об’єкт Date або рядок дати
  minuteIncrement: 1, //Регулює крок для введення хвилин (включно з прокручуванням)
  onClose(selectedDates) {
    //Функції, які запускаються щоразу, коли календар закривається. Перегляньте  API подій
    displayTimer(selectedDates);
  },
};
function displayTimer(selectedDates) {
  const selectedDate = selectedDates[0];
  if (selectedDate > now) {
    ms = selectedDate - now;
    const { days, hours, minutes, seconds } = convertMs(ms);

    elements.days.textContent = addLeadingZero(days);
    elements.hours.textContent = addLeadingZero(hours);
    elements.minutes.textContent = addLeadingZero(minutes);
    elements.seconds.textContent = addLeadingZero(seconds);

    elements.startBtn.removeAttribute('disabled');
  } else {
    errorAlert();
    elements.startBtn.setAttribute('disabled', 'disabled');

    elements.days.textContent = '00';
    elements.hours.textContent = '00';
    elements.minutes.textContent = '00';
    elements.seconds.textContent = '00';
  }
}
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

  timerInterval = setInterval(() => {
    displayTimer(now);
    ms -= 1000;
    if (ms <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

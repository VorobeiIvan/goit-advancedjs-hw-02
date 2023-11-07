import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const elements = {
  startBtn: document.querySelector('.js-startBtn'),
  input: document.querySelector('.js-input'),
  days: document.querySelector('.js-days'),
  hours: document.querySelector('.js-hours'),
  minutes: document.querySelector('.js-minutes'),
  seconds: document.querySelector('.js-seconds')
};

elements.startBtn.setAttribute('disabled', 'disabled');

let selectedDate;
let now;
let timerInterval;

flatpickr("input#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i:S",
});

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

function displayTimer() {
  let days = selectedDate.getDate() - now.getDate();
  let hours = selectedDate.getHours() - now.getHours();
  let minutes = selectedDate.getMinutes() - now.getMinutes();
  let seconds = selectedDate.getSeconds() - now.getSeconds();

  if (seconds < 0) {
    seconds = 60 + seconds;
    minutes = minutes - 1;
  }
  if (minutes < 0) {
    minutes = 60 + minutes;
    hours = hours - 1;
  }
  if (hours < 0) {
    hours = 24 + hours;
    days = days - 1;
  }

  elements.days.textContent = days < 10 ? "0" + days : days;
  elements.hours.textContent = hours < 10 ? "0" + hours : hours;
  elements.minutes.textContent = minutes < 10 ? "0" + minutes : minutes;
  elements.seconds.textContent = seconds < 10 ? "0" + seconds : seconds;
}

elements.input.addEventListener("input", selectionTime);

function selectionTime() {
  now = new Date();
  let minTime = now.setMinutes(now.getMinutes() + 1);
  selectedDate = new Date(elements.input.value);

  if (selectedDate > minTime) {
    displayTimer();
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

elements.startBtn.addEventListener('click', startTimer);

function startTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
  }

  timerInterval = setInterval(() => {
    displayTimer();

    if (
      elements.days.textContent === "00" &&
      elements.hours.textContent === "00" &&
      elements.minutes.textContent === "00" &&
      elements.seconds.textContent === "00"
    ) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

const body = document.querySelector('.js-body');
const buttonStart = document.querySelector('.js-buttonStart');
const buttonStop = document.querySelector('.js-buttonStop');
let intervalId = null;
buttonStop.setAttribute('disabled', 'disabled');

function animateColorChange() {
  body.style.backgroundColor = getRandomHexColor();
}

buttonStart.addEventListener('click', () => {
  if (!intervalId) {
    intervalId = setInterval(animateColorChange, 1000);
    buttonStart.setAttribute('disabled', 'disabled');
    buttonStop.removeAttribute('disabled');
    animateColorChange();
  }
});

buttonStop.addEventListener('click', () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
    buttonStop.setAttribute('disabled', 'disabled');
    buttonStart.removeAttribute('disabled');
  }
});

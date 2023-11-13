import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handlerCreatePromise);

function handlerCreatePromise(evt) {
  evt.preventDefault();

  const delayStep = parseInt(form.elements['step'].value);
  const firstDelay = parseInt(form.elements['delay'].value);
  const amount = parseInt(form.elements['amount'].value);

  const promises = [];

  for (let i = 1; i <= amount; i++) {
    const delay = firstDelay + (i - 1) * delayStep;

    const promise = createPromise(i, delay)
      .then(({ position, delay }) => {
        showAlert('✅', `Fulfilled promise ${position} in ${delay}ms`, 'green');
      })
      .catch(({ position, delay }) => {
        showAlert('❌', `Rejected promise ${position} in ${delay}ms`, 'red');
      });

    promises.push(promise);
  }

  form.reset();

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function showAlert(icon, message, color) {
  iziToast.show({
    title: icon,
    message,
    position: 'topRight',
    messageColor: 'black',
    color,
    timeout: 3000,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
  });
}

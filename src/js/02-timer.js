import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const elements = {
startBtn: document.querySelector('.js-startBtn'),
input: document.querySelector('.js-input'),
days: document.querySelector('.js-days'),
hours:document.querySelector('.js-hours'),
minutes:document.querySelector('.js-minutes'),
secoonds:document.querySelector('.js-secoonds')
};

elements.startBtn.setAttribute('disabled', 'disabled');


flatpickr("input#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i:S",
  
});

function errorAlert () { iziToast.error({
    title: 'Error',
    message: 'Please choose a date in the future',
    position: 'topRight', 
    messageColor: 'white',
    timeout: 3000,
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
});}

elements.input.addEventListener("input",selectionTime);

function selectionTime () {
    const now = new Date();
    let minTime = now.setMinutes(now.getMinutes() + 1);
    const selectedDate = new Date(elements.input.value);
    console.log(selectedDate)
    if (selectedDate > minTime) {
        elements.startBtn.removeAttribute('disabled');
        elements.days.textContent = selectedDate.getDate()-now.getDate();
        elements.hours.textContent = selectedDate.getHours()-now.getHours();
        elements.minutes.textContent =selectedDate.getMinutes()-now.getMinutes();
        elements.secoonds.textContent = selectedDate.getSeconds()-now.getSeconds();
    
    }
      else {
        errorAlert ();
        elements.startBtn.setAttribute('disabled', 'disabled');}
  }


elements.startBtn.addEventListener('click',startTimer);

function startTimer(){

};
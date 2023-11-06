// Функція рандомної зміни кольору 
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};
  
    const body = document.querySelector('.js-body');
    const buttonStart = document.querySelector('.js-buttonStart');
    const buttonStop = document.querySelector('.js-buttonStop');
    let animation = null;

// Функція для анімації зміни кольору
function colorChange() {
    body.style.backgroundColor = getRandomHexColor();
}

// Кнопка старт зміни кольору
buttonStart.addEventListener("click", () => {
    if (!animation) {
        animation = setInterval(colorChange, 1000);
        buttonStart.setAttribute("disabled", "disabled");
        buttonStop.removeAttribute("disabled");
        colorChange();
    }
});

// Кнопка стоп зміни кольору 
buttonStop.addEventListener("click", () => {
    if (animation) {
        cancelAnimation(animation);
        animation = null;
        buttonStop.setAttribute("disabled", "disabled");
        buttonStart.removeAttribute("disabled");
    }
});
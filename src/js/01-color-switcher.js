
// Функція рандомної зміни кольору 
function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
};
  

    const body = document.querySelector('.js-body');
    const buttonStart = document.querySelector('.js-buttonStart');
    const buttonStop = document.querySelector('.js-buttonStop');
    let animationFrameId = null;
    

// Функція для анімації зміни кольору
function animateColorChange() {
    body.style.backgroundColor = getRandomHexColor();
    animationFrameId = requestAnimationFrame(animateColorChange, 1000);
}

// Кнопка старт зміни кольору
buttonStart.addEventListener("click", () => {
    if (!animationFrameId) {
        animateColorChange();
        buttonStart.setAttribute("disabled", "disabled");
        buttonStop.removeAttribute("disabled");
    }
});

// Кнопка стоп зміни кольору 
buttonStop.addEventListener("click", () => {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
        buttonStop.setAttribute("disabled", "disabled");
        buttonStart.removeAttribute("disabled");
    }
});
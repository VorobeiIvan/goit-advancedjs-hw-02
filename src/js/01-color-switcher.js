function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
const body = document.querySelector('.js-body');
const buttonStart = document.querySelector('.js-buttonStart');
const buttonStop = document.querySelector('.js-buttonStop');
let animation = null;

function animateColorChange() {
    body.style.backgroundColor = getRandomHexColor();
    animation = requestAnimationFrame(animateColorChange);
}

buttonStart.addEventListener("click", () => {
    if (!animation) {
        animateColorChange();
        buttonStart.setAttribute("disabled", "disabled");
        buttonStop.removeAttribute("disabled");
    }
});

buttonStop.addEventListener("click", () => {
    if (animation) {
        cancelAnimationFrame(animation);
        animation = null;
        buttonStop.setAttribute("disabled", "disabled");
        buttonStart.removeAttribute("disabled");
    }
});
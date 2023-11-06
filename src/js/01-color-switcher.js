
// Функція рандомної зміни кольору 
function getRandomHexColor() {
    return #${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)};
    }

    const body = document.querySelector('.js-body');
    const buttonStart = document.querySelector('.js-buttonStart');
    const buttonStop = document.querySelector('.js-buttonStop');
    let timerId = null;
    

    buttonStart.addEventListener("click", () => {
    timerId = setInterval(() => {
        body.style.backgroundColor=getRandomHexColor();
    }, 1000);
    buttonStart.setAttribute("disabled", "disabled");
    });


    buttonStop.addEventListener("click", () => {
    clearInterval(timerId);
    buttonStop.removeAttribute("disabled");
    });


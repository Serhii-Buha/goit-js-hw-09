const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

let intervalId = null;

const getRandomHexColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

const changeBackgroundColor = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

const startBackgroundColorChange = () => {
  btnStart.disabled = true;
  intervalId = setInterval(changeBackgroundColor, 1000);
};

const stopBackgroundColorChange = () => {
  clearInterval(intervalId);
  btnStart.disabled = false;
};

btnStart.addEventListener('click', startBackgroundColorChange);
btnStop.addEventListener('click', stopBackgroundColorChange);

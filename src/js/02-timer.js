import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';

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
  return String(value).padStart(2, '0');
}
// Если значение value = 3, то функция addLeadingZero(value) вернет строку "03", добавив символ "0" в начало строки, чтобы получить двузначное значение. Это осуществляется с помощью метода padStart(2, '0'), который добавляет указанный символ (в данном случае "0") в начало строки до тех пор, пока длина строки не достигнет заданной (в данном случае 2 символа).

Notiflix.Notify.init({
  plainText: false,
  useGoogleFont: false,
  fontFamily: 'Quicksand',
  cssAnimationStyle: 'from-bottom',
  cssAnimationDuration: 400,
  success: {
    background: '#3f4458',
    textColor: '#32C682',
    childClassName: 'success-icon',
    // notiflixIconColor: 'rgba(0,0,0,.02)',
    notiflixIconColor: '#32C682',
  },
  failure: {
    background: '#3f4458',
    textColor: '#FF5549',
    childClassName: 'failure-icon',
    // notiflixIconColor: 'rgba(0,0,0,.02)',
    notiflixIconColor: '#FF5549',
  },
});

const datetimePicker = document.getElementById('datetime-picker');
const btnStart = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // window.alert('Please choose a date in the future');
      btnStart.disabled = true;
    } else {
      btnStart.disabled = false;
      console.log(selectedDates[0]);
    }
  },
};

flatpickr(datetimePicker, options);

let intervalId = null;

btnStart.addEventListener('click', () => {
  // const selectedDate = new Date(datetimePicker.value);
  const selectedDate = flatpickr.parseDate(datetimePicker.value, 'Y-m-d H:i'); //  по умолчанию "Y-m-dTH:i:S".
  btnStart.disabled = true;

  intervalId = setInterval(() => {
    const timeLeft = selectedDate.getTime() - new Date().getTime();
    //Запускаем интервал, который будет запускать функцию каждую секунду. Функция вычисляет разницу между выбранной пользователем датой и текущей датой. Разница вычисляется в миллисекундах и сохраняется в переменную timeLeft.
    if (timeLeft <= 0) {
      clearInterval(intervalId);
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      btnStart.disabled = true;
      Notiflix.Notify.success('Countdown has ended!');
      //Если разница между выбранной пользователем датой и текущей датой < или = 0, значит, таймер истек. Останавливаем интервал с помощью функции clearInterval и выводим на экран значения "00" для дней, часов, минут и секунд.
    } else {
      const { days, hours, minutes, seconds } = convertMs(timeLeft);
      // convertMs(timeLeft) = { days: 3, hours: 12, minutes: 30, seconds: 45 }

      //const { days, hours, minutes, seconds } = days = 3, hours = 12, minutes = 30 и seconds = 45.
      //Вычисляем количество дней, часов, минут и секунд, используя функцию convertMs, которая была объявлена.
      daysEl.textContent = addLeadingZero(days); // 3 => 03  String(value).padStart(2, '0');
      hoursEl.textContent = addLeadingZero(hours); // 12
      minutesEl.textContent = addLeadingZero(minutes); // 30
      secondsEl.textContent = addLeadingZero(seconds); // 45
    }
  }, 1000);
  //Выводим на экран количество дней, часов, минут и секунд с помощью метода textContent элементов страницы.
  //Интервал запускается каждую секунду, чтобы обновлять значения на экране таймера.
});

//v2

// const SECOND = 1000;
// const MINUTE = SECOND * 60;
// const HOUR = MINUTE * 60;
// const DAY = HOUR * 24;

// function convertMs(ms) {
//   const days = Math.floor(ms / DAY);
//   const hours = Math.floor((ms % DAY) / HOUR);
//   const minutes = Math.floor(((ms % DAY) % HOUR) / MINUTE);
//   const seconds = Math.floor((((ms % DAY) % HOUR) % MINUTE) / SECOND);
//   return { days, hours, minutes, seconds };
// }

// function addLeadingZero(value) {
//   return String(value).padStart(2, '0');
// }

// function updateTimerText(days, hours, minutes, seconds) {
//   daysEl.textContent = addLeadingZero(days);
//   hoursEl.textContent = addLeadingZero(hours);
//   minutesEl.textContent = addLeadingZero(minutes);
//   secondsEl.textContent = addLeadingZero(seconds);
// }

// const datetimePicker = document.getElementById('datetime-picker');
// const btnStart = document.querySelector('[data-start]');
// const daysEl = document.querySelector('[data-days]');
// const hoursEl = document.querySelector('[data-hours]');
// const minutesEl = document.querySelector('[data-minutes]');
// const secondsEl = document.querySelector('[data-seconds]');

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     const selectedDateValue = selectedDates[0].getTime();
//     btnStart.disabled = selectedDateValue < Date.now() ? true : false;
//     if (btnStart.disabled) {
//       window.alert('Please choose a date in the future');
// Notiflix.Notify.failure('Please choose a date in the future');
//     } else {
//       console.log(selectedDates[0]);
//     }
//   },
// };

// flatpickr(datetimePicker, options);

// let intervalId;

// btnStart.addEventListener('click', () => {
//   const selectedDateValue = flatpickr
//     .parseDate(datetimePicker.value, 'Y-m-d H:i')
//     .getTime();

//   intervalId = setInterval(() => {
//     const timeLeft = selectedDateValue - Date.now();

//     if (timeLeft <= SECOND) {
//       clearInterval(intervalId);
//       updateTimerText(0, 0, 0, 0);
//       btnStart.disabled = true;
//      Notiflix.Notify.success('Countdown has ended!');
//     } else {
//       const { days, hours, minutes, seconds } = convertMs(timeLeft);

//       updateTimerText(days, hours, minutes, seconds);
//     }
//   }, SECOND);
// });

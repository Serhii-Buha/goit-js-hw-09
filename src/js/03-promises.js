import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(delayInput.value);
  const step = Number(stepInput.value);
  const amount = Number(amountInput.value);
  //метод Number() для преобразования значений полей формы в числа

  for (let i = 1; i <= amount; i++) {
    // запускается цикл, который повторится столько раз, сколько введено в поле "amount"
    createPromise(i, delay + (i - 1) * step)
      // вызывается функция createPromise с параметрами номера создаваемого промиса и задержки
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});
// amount = 5 - это количество промисов, которые будут созданы и выполнены в цикле;
// step = 2000 - это количество миллисекунд, которое нужно добавить к задержке для каждого последующего промиса;
// delay = 1000 - это базовая задержка для каждого промиса, которая будет увеличиваться на значение шага для каждого последующего промиса.

// Мы находим форму и инпуты, в которых пользователь указывает задержку, шаг и количество промисов.
// При отправке формы мы получаем значения delay, step и amount из соответствующих инпутов.
// Затем мы запускаем цикл for, который будет создавать и выполнять указанное количество промисов. В цикле мы вызываем функцию createPromise, передавая ей номер текущего промиса и значение задержки, которое будет увеличиваться на значение шага для каждого последующего промиса. Таким образом,

// первый промис будет выполнен с задержкой в 1000 мс, второй - с задержкой в 3000 мс(1000 + 1 * 2000), третий - с задержкой в 5000 мс(1000 + 2 * 2000) и т.д.

// После создания каждого промиса мы вызываем метод then или catch в зависимости от того, выполнился ли промис успешно или нет.

// //Функция createPromise принимает два аргумента: position - позиция создаваемого промиса, и delay - задержка в миллисекундах перед выполнением промиса.

function createPromise(position, delay) {
  // объявляется функция createPromise, которая принимает два параметра: номер создаваемого промиса = position и задержку = delay
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // если сгенерированное значение булево true, то промис успешно выполняется
        resolve({ position, delay });
      } else {
        // если сгенерированное значение булево false, то промис неудачно выполняется
        reject({ position, delay });
      }
    }, delay);
  });
}

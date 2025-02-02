import flatpickr from "flatpickr";
import iziToast from "izitoast";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.getElementById("start-btn");
let userSelectedDate = null;
let countdownInterval;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    
    if (userSelectedDate && userSelectedDate.getTime() <= new Date().getTime()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
      startButton.style.backgroundColor = "#cfcfcf";
    } else {
      startButton.disabled = false;
      startButton.style.backgroundColor = " #4e75ff";
      startButton.style.color = "#ffff";
    }
  },
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

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

function updateTimer() {
  const timeLeft = userSelectedDate - new Date(); 
  
  if (timeLeft <= 0) {
    clearInterval(countdownInterval); 
    startButton.disabled = false;
    datetimePicker.disabled = false;
    startButton.style.backgroundColor = "#4e75ff"; 
    iziToast.success({
      title: 'Done',
      message: 'The timer has finished',
      position: 'topRight',
    });

    document.querySelector('[data-days]').textContent = "00";
    document.querySelector('[data-hours]').textContent = "00";
    document.querySelector('[data-minutes]').textContent = "00";
    document.querySelector('[data-seconds]').textContent = "00";

    return; 
  }

  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent = addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  datetimePicker.disabled = true;
  startButton.style.backgroundColor = ""; 
  countdownInterval = setInterval(updateTimer, 1000); 
});


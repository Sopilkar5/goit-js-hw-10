import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const delayInput = form.querySelector("input[name='delay']");
const stateRadios = form.querySelectorAll("input[name='state']");
const submitButton = form.querySelector("button[type='submit']");
const legend = form.querySelector("legend");
const fieldset = form.querySelector("fieldset");
const delayLabel = form.querySelector(`label:has(input[name='delay'])`);
legend.classList.add("state-legend");
fieldset.classList.add("state-fieldset"); 
delayInput.classList.add("delay-input");
submitButton.classList.add("submit-btn");
if (delayLabel) {
  delayLabel.classList.add("delay-label");
}

stateRadios.forEach(radio => {
  radio.classList.add("state-radio");
});


form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  const delay = parseInt(delayInput.value);
  const selectedState = Array.from(stateRadios).find(radio => radio.checked)?.value;

  if (!delay || !selectedState) {
    return;
  }

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedState === "fulfilled") {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then((resolvedDelay) => {
      iziToast.success({
        title: "Success",
        message: `✅ Fulfilled promise in ${resolvedDelay}ms`,
        position: "topRight",
      });
    })
    .catch((rejectedDelay) => {
      iziToast.error({
        title: "Error",
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
        position: "topRight",
      });
    });
});

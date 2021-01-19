import toastr from "toastr";

toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: `toast-top-left`,
  preventDuplicates: false,
  onclick: null,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: `swing`,
  hideEasing: `linear`,
  showMethod: `fadeIn`,
  hideMethod: `fadeOut`
};

const INVALID_CLASS = `login__input--invalid`;

const ErrorMessage = {
  REQUIRED: `Поле обязательное для заполенения`,
  EMAIL: `Email указан неверно`,
};

const validateEmail = (email) => {
  const template = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return template.test(String(email).toLowerCase());
};

const checkInput = (input) => {
  if (input.value.length === 0) {
    input.errorMessage = ErrorMessage.REQUIRED;
    return false;
  }

  return true;
};

const checkEmailInput = (input) => {
  if (checkInput(input)) {
    if (validateEmail(input.value)) {
      return true;
    }

    input.errorMessage = ErrorMessage.EMAIL;
    return false;
  }

  return false;
};

const setCheckFunction = (input, checkFunction) => {
  input.checkValue = checkFunction.bind(null, input);
  input.errorMessage = ``;
};

const setValidStatusToInput = (input) => {
  if (input.classList.contains(INVALID_CLASS)) {
    input.classList.remove(INVALID_CLASS);
    input.setCustomValidity = ``;
  }
};

const init = (closeLoginPopup = () => {}) => {
  const form = document.querySelector(`.login__form`);

  if (form) {
    const inputs = Array.from(form.querySelectorAll(`input`));
    const emailInput = inputs.find((node) => node.id === `login-email`);
    const submitButton = form.querySelector(`button[type="submit"]`);

    inputs.forEach((input) => setCheckFunction(input, checkInput));
    setCheckFunction(emailInput, checkEmailInput);

    inputs.forEach((input) => {
      input.addEventListener(`input`, () => {
        if (input.checkValue()) {
          setValidStatusToInput(input);
        }
      });
    });

    submitButton.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      let isFormValid = true;
      for (let i = 0; i < inputs.length; i++) {

        if (inputs[i].checkValue()) {
          setValidStatusToInput(inputs[i]);
        } else {
          inputs[i].classList.add(INVALID_CLASS);

          if (isFormValid) {
            inputs[i].focus();

            toastr.error(inputs[i].errorMessage);
            isFormValid = false;
          }
        }
      }

      if (isFormValid) {
        toastr.success(`Форма успешно заполнена`);

        inputs.forEach((input) => {
          input.value = ``;
        });

        closeLoginPopup();
      }
    });
  }
};

export {
  init,
};

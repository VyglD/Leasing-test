import {getToast} from "./utils";

const INVALID_CLASS = `form__field-input--invalid`;

const ErrorMessage = {
  REQUIRED: `Поле обязательное для заполенения`,
  EMAIL: `Email указан неверно`,
  PHONE: `Телефон указан неверно`,
  CONFIRM: `Значения должны совпадать`,
};

const returnTrue = () => true;

const toast = getToast();

class Form {
  constructor(selector, submitCallback = () => {}) {
    this._form = document.querySelector(selector);

    if (this._form) {
      const submit = this._form.querySelector(`.form__submit`);
      const inputs = Array.from(this._form.querySelectorAll(`input`));

      const onFormSubmit = (evt) => {
        evt.preventDefault();

        let isFormValid = true;
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].isEnterClick = true;

          if (inputs[i].checkValue()) {
            Form.setValidStatusToInput(inputs[i]);
          } else {
            Form.setInvalidStatusToInput(inputs[i]);

            if (isFormValid) {
              inputs[i].focus();

              toast.error(inputs[i].errorMessage);
              isFormValid = false;
            }
          }
        }

        if (isFormValid) {
          toast.success(`Форма успешно заполнена`);

          inputs.forEach((input) => {
            input.value = ``;
            input.isEnterClick = false;
          });

          submitCallback();
        }
      };

      inputs.forEach((input) => {
        if (input.required) {
          Form.setCheckFunction(input, Form.checkRequiredInput);
        } else {
          Form.setCheckFunction(input, returnTrue);
        }

        input.addEventListener(`input`, () => {
          if (input.checkValue()) {
            Form.setValidStatusToInput(input);
          }
        });
      });

      submit.addEventListener(`click`, onFormSubmit);
      this._form.addEventListener(`submit`, onFormSubmit);
    }
  }

  setCheckEmailInput(selector) {
    if (this._form) {
      const emailInput = document.querySelector(selector);
      if (emailInput) {
        Form.setCheckFunction(emailInput, Form.checkEmailInput);
      }
    }
  }

  setCheckPhoneInput(selector) {
    if (this._form) {
      const phoneInput = document.querySelector(selector);
      if (phoneInput) {
        Form.setCheckFunction(phoneInput, Form.checkPhoneInput);
      }
    }
  }

  setCheckConfirmInputs(selector1, selector2) {
    if (this._form) {
      const input1 = document.querySelector(selector1);
      const input2 = document.querySelector(selector2);

      if (input1 && input2) {
        Form.setCheckFunction(input1, Form.checkConfirmInputs.bind(null, input1, input2));
        Form.setCheckFunction(input2, Form.checkConfirmInputs.bind(null, input2, input1));
      }
    }
  }

  static validateFilling(value) {
    return value.length !== 0;
  }

  static validateEmail(email) {
    const template = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return template.test(String(email).toLowerCase());
  }

  static validatePhone(phone) {
    const template = /^((8|([\+]?7))([\-]| )?)?([\(]?[0-9]{3}[\)]?([\-]| )?)([0-9]|[\-]| ){7,10}$/u;
    return template.test(String(phone).toLowerCase());
  }

  static checkRequiredInput(input) {
    if (input.required && !Form.validateFilling(input.value)) {
      input.errorMessage = ErrorMessage.REQUIRED;
      return false;
    }

    return true;
  }

  static checkCustomInput(input, checkFunction, errorMessage) {
    if (Form.checkRequiredInput(input)) {
      if (
        ((!input.required) && (!Form.validateFilling(input.value))) ||
        checkFunction(input.value)
      ) {
        return true;
      }

      input.errorMessage = errorMessage;
      return false;
    }

    return false;
  }

  static checkEmailInput(input) {
    return Form.checkCustomInput(input, Form.validateEmail, ErrorMessage.EMAIL);
  }

  static checkPhoneInput(input) {
    return Form.checkCustomInput(input, Form.validatePhone, ErrorMessage.PHONE);
  }

  static checkConfirmInputs(input1, input2) {
    if (Form.checkRequiredInput(input1)) {
      if (Form.checkRequiredInput(input2)) {
        if (!input1.isEnterClick || input1.value === input2.value
        ) {
          input1.errorMessage = ``;
          input2.errorMessage = ``;

          Form.setValidStatusToInput(input1);
          Form.setValidStatusToInput(input2);

          return true;
        }

        input1.errorMessage = ErrorMessage.CONFIRM;
        input2.errorMessage = ErrorMessage.CONFIRM;

        Form.setInvalidStatusToInput(input1);
        Form.setInvalidStatusToInput(input2);

        return false;
      }

      // Возвращается если второе поле не заполнено
      return true;
    }

    return false;
  }

  static setCheckFunction(input, checkFunction) {
    input.checkValue = checkFunction.bind(null, input);
    input.errorMessage = ``;
  }

  static setValidStatusToInput(input) {
    if (input.classList.contains(INVALID_CLASS)) {
      input.classList.remove(INVALID_CLASS);
      input.setCustomValidity = ``;
      input.isEnterClick = false;
    }
  }

  static setInvalidStatusToInput(input) {
    input.classList.add(INVALID_CLASS);
  }
}

export default Form;

import Form from "./form";
import Popup from "./popup";

const init = () => {
  const popupSignUp = new Popup(`#popup-sign-up`);
  const form = new Form(`.sign-up__form`, popupSignUp.getPopupCloseFunction());

  const registrationButtons = document.querySelectorAll(`.action-button--registration`);

  registrationButtons.forEach((node) => {
    node.addEventListener(`click`, popupSignUp.getPopupOpenFunction());
  });

  form.setCheckEmailInput(`#sign-up-email`);
  form.setCheckPhoneInput(`#sign-up-phone`);
  form.setCheckConfirmInputs(`#sign-up-password-1`, `#sign-up-password-2`);
};

export {
  init,
};

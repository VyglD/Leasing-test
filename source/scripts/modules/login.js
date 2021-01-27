import Form from "./form";
import Popup from "./popup";

const init = () => {
  const popupLogin = new Popup(`#popup-login`);
  const form = new Form(`.login__form`, popupLogin.getPopupCloseFunction());

  const loginButton = document.querySelector(`#login-js`);

  if (loginButton) {
    loginButton.addEventListener(`click`, popupLogin.getPopupOpenFunction());
  }

  form.setCheckEmailInput(`#login-email`);
};

export {
  init,
};

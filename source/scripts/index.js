import Popup from "./modules/popup";
import {init as loginInit} from "./modules/login";

const popupBlank = new Popup(`#popup-blank`);
const popupLogin = new Popup(`#popup-login`);

const clientsLink = document.querySelector(`#clients-js`);
const loginButton = document.querySelector(`#login-js`);
const registrationButtons = document.querySelectorAll(`.action-button--registration`);

const openBlankPopup = popupBlank.getPopupOpenFunction();
const openLoginPopup = popupLogin.getPopupOpenFunction();
const closeLoginPopup = popupLogin.getPopupCloseFunction();

loginInit(closeLoginPopup);

if (loginButton) {
  loginButton.addEventListener(`click`, openLoginPopup);
}

// Проверка наличия popupBlank в разметки для того, чтобы сохранить возможность
// перехода по ссылке в случае отсутствия попапа
if (clientsLink && popupBlank.getPopupNode()) {
  clientsLink.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    openBlankPopup();
  });
}

registrationButtons.forEach((node) => {
  node.addEventListener(`click`, openBlankPopup);
});

import AOS from "aos";
import {init as loginInit} from "./modules/login";
import {init as signUpInit} from "./modules/sign-up";
import {setAbilitySpaceAction, getToast} from "./modules/utils";

const toast = getToast();

const clientsLink = document.querySelector(`#clients-js`);

loginInit();
signUpInit();

if (clientsLink) {
  clientsLink.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    toast.open({
      type: `info`,
      message: `Данный функционал отсутствует`,
    });
  });

  setAbilitySpaceAction(clientsLink);
}

AOS.init({
  offset: 100,
  duration: 500,
  easing: `ease-out-back`,
  delay: 0,
  once: true,
  disable: window.innerWidth < 1400,
});

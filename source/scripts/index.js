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

import {Notyf} from "notyf";
import {Key} from "./constants";

const getNextArrayIndex = (currentIndex, arr) => {
  return (currentIndex + 1) % arr.length;
};

const getPreviousArrayIndex = (currentIndex, arr) => {
  return (currentIndex + (arr.length - 1)) % arr.length;
};

const isEscKeyDown = (evt) => {
  return evt.key === Key.ESC;
};

const isSpaceKeyDown = (evt) => {
  return evt.key === Key.SPACE;
};

const setAbilitySpaceAction = (node) => {
  node.addEventListener(`keydown`, (evt) => {
    if (isSpaceKeyDown(evt)) {
      evt.preventDefault();
    }
  });

  node.addEventListener(`keyup`, (evt) => {
    if (isSpaceKeyDown(evt)) {
      node.dispatchEvent(new Event(`click`));
    }
  });
};

const getToast = () => {
  const notyf = new Notyf({
    duration: 3000,
    ripple: false,
    position: {
      x: `left`,
      y: `top`
    },
    dismissible: true,
    types: [
      {
        type: `info`,
        background: `#2f96b4`,
        icon: {
          className: `toast-icon toast-icon--info`,
          tagName: `i`,
        },
      }
    ]
  });

  return notyf;
};

export {
  getNextArrayIndex,
  getPreviousArrayIndex,
  isEscKeyDown,
  isSpaceKeyDown,
  setAbilitySpaceAction,
  getToast,
};

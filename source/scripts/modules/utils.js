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

export {
  getNextArrayIndex,
  getPreviousArrayIndex,
  isEscKeyDown,
  isSpaceKeyDown,
  setAbilitySpaceAction,
};

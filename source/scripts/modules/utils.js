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

export {
  getNextArrayIndex,
  getPreviousArrayIndex,
  isEscKeyDown,
};

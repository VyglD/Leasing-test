import {isEscKeyDown, getPreviousArrayIndex, getNextArrayIndex} from "./utils";
import {FOCUS_ELEMENTS, Key} from "./constants";

const CustomClass = {
  POPUP: `popup`,
  OPENED: `popup--opened`,
  DISABLE_SCROLL: `disable-scroll`,
  SCROLL_OFFSET: `offset-scroll`,
};

const emptyFunction = () => {};

const lockScroll = () => {
  const pagePosition = window.scrollY;

  document.body.classList.add(CustomClass.DISABLE_SCROLL);
  document.body.dataset.position = pagePosition;
  document.body.style.top = `${-1 * pagePosition}px`;
};

const unlockScroll = () => {
  const pagePosition = parseInt(document.body.dataset.position, 10);

  document.body.style.top = `auto`;
  document.body.removeAttribute(`data-position`);
  document.body.classList.remove(CustomClass.DISABLE_SCROLL);
  window.scroll({top: pagePosition, left: 0});
};

class Popup {
  constructor(selector, closeCallback = emptyFunction) {
    this._popup = document.querySelector(selector);
    this._scrollOffsetNodes = document.querySelectorAll(`[data-scroll-offset]`);

    this._previousFocusableElement = document.body;
    this._focusableElements = [];

    this._closeCallback = closeCallback;

    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
    this._handleEmptyPlaceClickHandler = this._handleEmptyPlaceClickHandler.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleFocusElementChange = this._handleFocusElementChange.bind(this);
  }

  _getfocusableElements() {
    return Array.from(this._popup.querySelectorAll(FOCUS_ELEMENTS))
      .filter((node) => node.getBoundingClientRect().width);
  }

  _addOffset() {
    const paddingOffset = `${window.innerWidth - document.body.offsetWidth}px`;

    this._scrollOffsetNodes.forEach((node) => {
      node.style.paddingRight = paddingOffset;
    });
  }

  _removeOffset() {
    this._scrollOffsetNodes.forEach((node) => {
      node.style.paddingRight = 0;
    });
  }

  _addListeners() {
    this._popup.addEventListener(`click`, this._handleEmptyPlaceClickHandler);

    document.addEventListener(`keydown`, this._handleEscKeyDown);
    document.addEventListener(`keydown`, this._handleFocusElementChange);
  }

  _removeListeners() {
    this._popup.removeEventListener(`click`, this._handleEmptyPlaceClickHandler);

    document.removeEventListener(`keydown`, this._handleEscKeyDown);
    document.removeEventListener(`keydown`, this._handleFocusElementChange);
  }

  _focusOnFirstPopupNode() {
    this._focusableElements = this._getfocusableElements();

    if (this._focusableElements.length > 0) {
      this._focusableElements[0].focus();
    }
  }

  _focusOnPreviousNode() {
    this._previousFocusableElement.focus();
  }

  _handleOpenPopup() {
    if (this._popup) {
      this._addOffset();

      // Предотвращает повторное открытие попапа, если он уже открыт
      if (!document.body.dataset.position) {
        lockScroll();
        this._addListeners();
        this._popup.classList.add(CustomClass.OPENED);
        this._previousFocusableElement = document.activeElement;
      }

      this._focusOnFirstPopupNode();
    }
  }

  _handleClosePopup() {
    if (this._popup) {
      this._removeOffset();

      unlockScroll();
      this._removeListeners();
      this._popup.classList.remove(CustomClass.OPENED);

      this._previousFocusableElement.focus();
    }
  }

  _handleEmptyPlaceClickHandler(evt) {
    if (evt.target.classList.contains(CustomClass.POPUP)) {
      this._handleClosePopup();
    }
  }

  _handleEscKeyDown(evt) {
    if (isEscKeyDown(evt)) {
      this._handleClosePopup();
    }
  }

  _handleFocusElementChange(evt) {
    if (evt.key === Key.TAB) {
      let indexElement = 0;
      this._focusableElements = this._getfocusableElements();

      evt.preventDefault();

      if (evt.shiftKey) {
        indexElement = getPreviousArrayIndex(
            this._focusableElements.indexOf(document.activeElement),
            this._focusableElements
        );
      } else {
        indexElement = getNextArrayIndex(
            this._focusableElements.indexOf(document.activeElement),
            this._focusableElements
        );
      }

      this._focusableElements[indexElement].focus();
    }
  }

  getPopupOpenFunction() {
    if (this._popup) {
      const closeButton = this._popup.querySelector(`.popup__close-button`);

      if (closeButton) {
        closeButton.addEventListener(`click`, this._handleClosePopup);
      }

      return this._handleOpenPopup;
    }

    return emptyFunction;
  }

  getPopupNode() {
    return this._popup;
  }
}

export default Popup;

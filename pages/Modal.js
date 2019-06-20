import { getSumModuleTimeAndPrice, numberWithCommas, stringifyTerm } from './utils';
import { getModuleName, getModuleMaxLevel, getModuleLevelParams, getModuleParamLabel } from '../data/selectors';
import { modalStore, changeFrom, changeTo } from './Model';

const modal = document.querySelector('.modal');

const title = modal.querySelector('.module-form__title');
const icon = modal.querySelector('.module-form__icon');
const moduleParams = modal.querySelector('.module-form__params');

const okBtn = modal.querySelector('.btn--ok');
const cancelBtn = modal.querySelector('.btn--cancel');

const tableEl = modal.querySelector('.levels-table');
const moduleResultSpan = modal.querySelector('.module-form__result-val');

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    cancelButtonHandler && cancelButtonHandler();
  }
});

let okButtonHandler = null;
okBtn.addEventListener('click', () => {
  const fromInput = modal.querySelector('input[name=from]:checked');
  const toInput = modal.querySelector('input[name=to]:checked');

  okButtonHandler &&
    okButtonHandler({
      from: (fromInput && +fromInput.value) || 0,
      to: (toInput && +toInput.value) || 0,
    });
});

let cancelButtonHandler = null;
cancelBtn.addEventListener('click', () => {
  cancelButtonHandler && cancelButtonHandler();
});

tableEl.addEventListener('change', (event) => {
  if (event.target.name === `from`) {
    changeFrom(+event.target.value);
  } else {
    changeTo(+event.target.value);
  }
});

function setTitleAndIcon({ moduleId }) {
  if (moduleId) {
    title.innerHTML = getModuleName(moduleId) || `-`;

    // неприятный хак, но пока других идей нет
    const iconBG = document.querySelector(`[data-module-id="${moduleId}"] .module__icon`).getAttribute('style');
    icon.setAttribute('style', iconBG);
  }
}

function updateRadio(parent, name, value) {
  parent.querySelectorAll(`input`).forEach((input) => {
    input.checked = input.value == value;
  });
}

function updateCurrentRadio(state) {
  updateRadio(tableEl.querySelector(`.levels-table__row--from`), `from`, state.currentLevel || 0);
}

function updateTargetRadio(state) {
  updateRadio(tableEl.querySelector(`.levels-table__row--to`), `to`, state.targetLevel || 0);
}

export function toggleLevelRows(state) {
  const moduleId = state.moduleId;

  if (!moduleId) {
    return;
  }

  const moduleMaxLevel = getModuleMaxLevel(moduleId);

  tableEl.querySelectorAll(`.levels-table__row--from label`).forEach(toggleLabel);
  tableEl.querySelectorAll(`.levels-table__row--to label`).forEach(toggleLabel);

  function toggleLabel(label, level) {
    label.style.display = level <= moduleMaxLevel ? `` : `none`;
  }
}

function renderParamsTable(from, to) {
  let html = ``;

  Object.keys(from).forEach((key) => {
    if (key === `UnlockPrice` || key === `UnlockTime`) {
      return;
    }

    const label = getModuleParamLabel(key);
    let fromVal = from[key];
    let toVal = to[key];
    let deltaVal = toVal - fromVal;

    const valString = deltaVal ? `${fromVal} -> ${toVal} (+${deltaVal})` : `${toVal}`;

    html += `
    <div class='param-row'>
      <p class='param-row__label'>${label}</p>
      <p class='param-row__value'>${valString}</p>
    </div>`;
  });

  html += `</table>`;

  moduleParams.innerHTML = html;
}

function renderTimeAndPrice(state) {
  const moduleId = state.moduleId;
  const currentLevel = state.currentLevel || 0;
  const targetLevel = state.targetLevel || 0;

  if (!moduleId) {
    moduleResultSpan.innerHTML = `error`;
    return;
  }

  const [currentTerm, currentPrice] = getSumModuleTimeAndPrice(moduleId, currentLevel);
  const [targetTerm, targetPrice] = getSumModuleTimeAndPrice(moduleId, targetLevel);

  let term = 0;
  let money = 0;

  if (targetPrice > currentPrice) {
    money = targetPrice - currentPrice;
  }

  if (targetTerm > currentTerm) {
    term = targetTerm - currentTerm;
  }

  if (money && term) {
    const moneyPerDay = ((money / term) * 24 * 60 * 60).toFixed(0);
    const durationString = `Duration: ${stringifyTerm(term)}`;
    const moneyString = `Credit: ${numberWithCommas(money)} (${numberWithCommas(moneyPerDay)} cr/day)`;

    moduleResultSpan.innerHTML = `${moneyString}<br>${durationString}`;
  } else {
    moduleResultSpan.innerHTML = `-`;
  }
}

export function initModal() {
  modalStore.watch(`moduleId`, toggleLevelRows);
  modalStore.watch(`moduleId`, setTitleAndIcon);
  modalStore.watch(`targetLevel`, updateTargetRadio);
  modalStore.watch(`currentLevel`, updateCurrentRadio);

  modalStore.watch(`currentLevel`, renderResults);
  modalStore.watch(`targetLevel`, renderResults);
}

function renderResults(state) {
  const moduleId = state.moduleId;
  const currentLevel = state.currentLevel || 0;
  const targetLevel = state.targetLevel || 0;

  if (moduleId) {
    renderTimeAndPrice(state);
    renderParamsTable(getModuleLevelParams(moduleId, currentLevel), getModuleLevelParams(moduleId, targetLevel));
  }
}

const Modal = {
  open({ onOk, onCancel }) {
    modal.style.display = 'block';
    modal.scrollTop = 0;

    okButtonHandler = onOk;
    cancelButtonHandler = onCancel;
  },
  close() {
    modal.style.display = '';
  },
};

export default Modal;

import { getSumModuleTimeAndPrice, numberWithCommas, stringifyTerm } from './utils';
import { getModuleName, getModuleMaxLevel, getModuleLevelParams, getModuleParamLabel } from '../data/selectors';

const modal = document.querySelector('.modal');

const title = modal.querySelector('.module-form__title');
const icon = modal.querySelector('.module-form__icon');
const moduleParams = modal.querySelector('.module-form__params');

const okBtn = modal.querySelector('.btn--ok');
const cancelBtn = modal.querySelector('.btn--cancel');

const tableEl = modal.querySelector('.levels-table');
const rowsEls = modal.querySelectorAll('tr[data-level]');
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

tableEl.addEventListener('change', () => {
  renderTimeAndPrice();
});

function getCurrentRadioValues() {
  const fromInput = tableEl.querySelector('input[name=from]:checked');
  const toInput = tableEl.querySelector('input[name=to]:checked');

  return [+fromInput.value, +toInput.value];
}

let currentModuleData = null; // стыдных хак, но хочется побыстрее сделать

function setSelectData(moduleId, selected) {
  currentModuleData = moduleId;
  const moduleMaxLevel = getModuleMaxLevel(moduleId);

  rowsEls.forEach((row) => {
    const rowLevel = +row.dataset.level;
    row.hidden = rowLevel > moduleMaxLevel;

    const fromInput = row.querySelector('input[name=from]');
    const toInput = row.querySelector('input[name=to]');
    fromInput.checked = rowLevel == selected.from;
    toInput.checked = rowLevel == selected.to;
  });

  title.innerHTML = getModuleName(moduleId) || `-`;

  // неприятный хак, но пока других идей нет
  const iconBG = document.querySelector(`[data-module-id="${moduleId}"] .module__icon`).getAttribute('style');
  icon.setAttribute('style', iconBG);

  renderTimeAndPrice();
  renderParamsTable(getModuleLevelParams(moduleId, selected.from), getModuleLevelParams(moduleId, selected.to));
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

function renderTimeAndPrice(moduleId = currentModuleData) {
  if (!moduleId) {
    moduleResultSpan.innerHTML = `error`;
    return;
  }

  const [from, to] = getCurrentRadioValues();
  const [currentTerm, currentPrice] = getSumModuleTimeAndPrice(moduleId, from);
  const [targetTerm, targetPrice] = getSumModuleTimeAndPrice(moduleId, to);

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

const Modal = {
  open({ moduleId, selected, onOk, onCancel }) {
    setSelectData(moduleId, selected);
    modal.style.display = 'block';
    modal.scrollTop = 0;

    okButtonHandler = onOk;
    cancelButtonHandler = onCancel;
  },
  close() {
    currentModuleData = null;
    modal.style.display = '';
  },
};

export default Modal;

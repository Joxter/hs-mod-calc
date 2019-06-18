import { getSumModuleTimeAndPrice, numberWithCommas, stringifyTerm } from './utils';

const modal = document.querySelector('.modal');

const title = modal.querySelector('.module-form__title');
const icon = modal.querySelector('.module-form__icon');

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

function setSelectData(moduleData, selected) {
  currentModuleData = moduleData;
  const moduleMaxLevel = Array.isArray(moduleData.UnlockPrice) ? moduleData.UnlockPrice.length : moduleData.UnlockPrice;

  rowsEls.forEach((row) => {
    const rowLevel = +row.dataset.level;
    row.hidden = rowLevel > moduleMaxLevel;

    const fromInput = row.querySelector('input[name=from]');
    const toInput = row.querySelector('input[name=to]');
    fromInput.checked = rowLevel == selected.from;
    toInput.checked = rowLevel == selected.to;
  });

  title.innerHTML = moduleData.eng || `-`;

  // неприятный хак, но пока других идей нет
  const iconBG = document.querySelector(`[data-module-id="${moduleData.id}"] .module__icon`).getAttribute('style');
  icon.setAttribute('style', iconBG);

  renderTimeAndPrice();
}

function renderTimeAndPrice(moduleData = currentModuleData) {
  if (!moduleData) {
    moduleResultSpan.innerHTML = `error`;
    return;
  }

  const [from, to] = getCurrentRadioValues();
  const [currentTerm, currentPrice] = getSumModuleTimeAndPrice(moduleData, from);
  const [targetTerm, targetPrice] = getSumModuleTimeAndPrice(moduleData, to);

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
  open({ moduleData, selected, onOk, onCancel }) {
    setSelectData(moduleData, selected);
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

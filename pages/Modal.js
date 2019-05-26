const modal = document.querySelector('.modal');

const title = modal.querySelector('.module-form__title');
const icon = modal.querySelector('.module-form__icon');

const okBtn = modal.querySelector('.btn--ok');
const cancelBtn = modal.querySelector('.btn--cancel');

const tableEl = modal.querySelector('.levels-table');
const rowsEls = modal.querySelectorAll('tr[data-level]');

console.log(rowsEls);

tableEl.addEventListener('change', (event) => {
  const name = event.target.name;
  const value = event.target.value;

  console.log(name, value);
});
////

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

function getOption(level, selected) {
  const selectedTag = selected ? `selected` : ``;
  return `<option value="${level}" ${selectedTag} >${level}</option>`;
}

function setSelectData(moduleData, selected) {
  console.log(selected);
  const moduleMaxLevel = moduleData.data.length;
  const from = selected.from || 0;
  const to = selected.to || 0;
  if (from) {
    const fromInput = rowsEls[from].querySelector('input[name=from]');
    fromInput.checked = true;
  }

  if (to) {
    const toInput = rowsEls[to].querySelector('input[name=to]');
    toInput.checked = true;
  }

  // const levels = [...Array(moduleData.data.length + 1).keys()];

  rowsEls.forEach((row) => {
    const rowLevel = +row.dataset.level;
    row.hidden = rowLevel > moduleMaxLevel;
  });

  // fromSelect.innerHTML = levels.map((level) => getOption(level, level == selected.from)).join(``);
  // toSelect.innerHTML = levels.map((level) => getOption(level, level == selected.to)).join(``);

  title.innerHTML = moduleData.eng || `-`;

  // неприятный хак, но пока других идей нет
  const iconBG = document.querySelector(`[data-module-id="${moduleData.id}"] .module__icon`).getAttribute('style');
  icon.setAttribute('style', iconBG);
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
    modal.style.display = '';
  },
};

export default Modal;

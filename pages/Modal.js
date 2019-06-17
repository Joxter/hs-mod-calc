const modal = document.querySelector('.modal');

const title = modal.querySelector('.module-form__title');
const icon = modal.querySelector('.module-form__icon');

const okBtn = modal.querySelector('.btn--ok');
const cancelBtn = modal.querySelector('.btn--cancel');

const tableEl = modal.querySelector('.levels-table');
const rowsEls = modal.querySelectorAll('tr[data-level]');

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

function setSelectData(moduleData, selected) {
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

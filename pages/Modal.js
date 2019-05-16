const modal = document.querySelector('.modal');

const title = modal.querySelector('.module-form__title');
const icon = modal.querySelector('.module-form__icon');

const okBtn = modal.querySelector('.btn--ok');
const cancelBtn = modal.querySelector('.btn--cancel');

const fromSelect = modal.querySelector('select[name=from]');
const toSelect = modal.querySelector('select[name=to]');

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    Modal.close();
  }
});

let okButtonHandler = null;
okBtn.addEventListener('click', () => {
  okButtonHandler &&
    okButtonHandler({
      from: fromSelect.value,
      to: toSelect.value,
    });
  Modal.close();
});

cancelBtn.addEventListener('click', () => {
  Modal.close();
});

function getOption(level, selected) {
  const selectedTag = selected ? `selected` : ``;
  return `<option value="${level}" ${selectedTag} >${level}</option>`;
}

function setSelectData(moduleData, selected) {
  const levels = [...Array(moduleData.data.length + 1).keys()];

  fromSelect.innerHTML = levels.map((level) => getOption(level, level == selected.from)).join(``);
  toSelect.innerHTML = levels.map((level) => getOption(level, level == selected.to)).join(``);

  title.innerHTML = moduleData.eng || `-`;

  // неприятный хак, но пока других идей нет
  const iconBG = document.querySelector(`[data-module-id="${moduleData.id}"] .module__icon`).getAttribute('style');
  icon.setAttribute('style', iconBG);
}

const Modal = {
  open({ moduleData, selected, onOk }) {
    setSelectData(moduleData, selected);
    modal.style.display = 'block';
    modal.scrollTop = 0;

    okButtonHandler = onOk;
  },
  close() {
    modal.style.display = '';
  },
};

export default Modal;

import { save, get } from '../localStorageUtils';
import { optionsStore, modalStore, modulesStore } from './Model';
import Modal, { initModal } from './Modal';
import { modulesData, allModuleKeys } from '../../data/moduleData';
import { parseModules, stringifyModules, parseQueryString } from './urlModules';
import { stringifyTerm, numberWithCommas, getSumModuleTimeAndPrice } from '../utils';

const modules = document.querySelector('.modules');

const newSaveBtn = document.querySelector('.save-button--js');
const newLoadBtn = document.querySelector('.load-button--js');

const resultCreditSpan = document.querySelector('.result-credit .value');
const resultDurationSpan = document.querySelector('.result-duration .value');

const CURRENT_URL_RAPAM = 'cm';
const TARGET_URL_RAPAM = 'tm';
const LOCAL_STORAGE_MODULE_KEY = 'player_modules';

document.addEventListener('DOMContentLoaded', main);

function main() {
  modulesStore.set(() => {
    const urlModules = getModulesStrFromUrl(location.search);

    if (urlModules.currentModuleStr || urlModules.targetModuleStr) {
      return getInitModules();
    } else {
      return getModulesFromLocalStorage();
    }
  });

  initSaveAndLoadButtons(newSaveBtn, newLoadBtn);

  initModulesButtons(modules);

  initAutosaveCB();
  initShareLink();
  initModal2();
  initResetButton();
}

function initResetButton() {
  const button = document.querySelector('.reset-btn');

  button.addEventListener(`click`, () => {
    modulesStore.set(() => {
      return getCleanState();
    });
  });
}

function initAutosaveCB() {
  optionsStore.bindCb(document.querySelector('.autosave--js'), ({ isAutosave }) => ({
    isAutosave: !isAutosave,
  }));

  modulesStore.watch(`*`, (state) => {
    autosaveModules(state);
  });

  optionsStore.watch(`isAutosave`, () => {
    autosaveModules(modulesStore.getState());
  });
}

function initShareLink() {
  function renderLink() {
    const shareLink = document.querySelector('.share-modules-link--js');

    const link = getLink();

    shareLink.innerHTML = link;
    shareLink.href = link;
  }

  modulesStore.watch(`*`, () => {
    renderLink();
  });
}

function initModal2() {
  initModal();

  modalStore.watch(`moduleId`, ({ moduleId }) => {
    if (!moduleId) {
      Modal.close();
      return;
    }

    Modal.open({
      onCancel: () => {
        modalStore.set(() => ({
          moduleId: null,
        }));
      },
      onOk: ({ from, to }) => {
        modalStore.set(() => ({
          moduleId: null,
        }));
        modulesStore.set(() => ({
          [moduleId]: {
            current: +from,
            target: +to,
          },
        }));
      },
    });
  });
}

function getLink() {
  const { currentStr, targetStr } = stringifyModules(allModuleKeys, modulesStore.getState());

  const url = `${location.origin}${location.pathname}`;
  const paramsStr = `${CURRENT_URL_RAPAM}=${currentStr}&${TARGET_URL_RAPAM}=${targetStr}`;

  return `${url}?${paramsStr}`;
}

function autosaveModules(modules) {
  if (optionsStore.getState().isAutosave) {
    saveModules(modules);
  }
}

function getInitModules() {
  const moduleStrs = getModulesStrFromUrl(location.search);
  const moduleData = transformSavedDataToModelData(moduleStrs);
  let newUrl = `${location.origin}${location.pathname}`;
  window.history.pushState('', '', newUrl);

  return moduleData;
}

function getModulesStrFromUrl(url) {
  const urlData = parseQueryString(url);

  const currentModuleStr = urlData[CURRENT_URL_RAPAM] || ``;
  const targetModuleStr = urlData[TARGET_URL_RAPAM] || ``;

  return {
    currentModuleStr,
    targetModuleStr,
  };
}

function transformSavedDataToModelData({ currentModuleStr, targetModuleStr }) {
  const modulesData = {};

  const currentModules = parseModules(allModuleKeys, currentModuleStr || ``);
  const targetModules = parseModules(allModuleKeys, targetModuleStr || ``);

  Object.keys(currentModules).forEach((moduleId) => {
    modulesData[moduleId] = {
      current: currentModules[moduleId],
      target: targetModules[moduleId],
    };
  });

  return modulesData;
}

function saveModules(modules) {
  save(LOCAL_STORAGE_MODULE_KEY, modules);
}

function getModulesFromLocalStorage() {
  const data = get(LOCAL_STORAGE_MODULE_KEY, getCleanState());
  if (!data.Suspend) {
    data.Suspend = {
      current: 0,
      target: 0,
    };
    save(LOCAL_STORAGE_MODULE_KEY, data);
  }
  return data;
}

function getCleanState() {
  const data = {};

  allModuleKeys.forEach((key) => {
    data[key] = {
      current: 0,
      target: 0,
    };
  });

  return data;
}

function initSaveAndLoadButtons(saveButton, loadButton) {
  saveButton.addEventListener(`click`, () => {
    const modules = modulesStore.getState();

    saveModules(modules);
    updateButton(modules);
  });

  loadButton.addEventListener(`click`, () => {
    modulesStore.set(() => {
      return getModulesFromLocalStorage();
    });
  });

  modulesStore.watch(`*`, (store) => {
    updateButton(store);
  });

  function updateButton(store) {
    if (isSameModules(store, getModulesFromLocalStorage())) {
      saveButton.disabled = true;
      loadButton.disabled = true;
    } else {
      saveButton.disabled = false;
      loadButton.disabled = false;
    }
  }
}

function isSameModules(modulesA, modulesB) {
  const aStr = stringifyModules(allModuleKeys, modulesA);
  const bStr = stringifyModules(allModuleKeys, modulesB);

  return aStr.currentStr === bStr.currentStr && aStr.targetStr === bStr.targetStr;
}

function renderResult(state) {
  let term = 0;
  let money = 0;

  Object.keys(state).forEach((moduleId) => {
    const userModuleData = state[moduleId];

    const [currentTerm, currentPrice] = getSumModuleTimeAndPrice(moduleId, userModuleData.current);
    const [targetTerm, targetPrice] = getSumModuleTimeAndPrice(moduleId, userModuleData.target);

    if (targetPrice > currentPrice) {
      money += targetPrice - currentPrice;
    }

    if (targetTerm > currentTerm) {
      term += targetTerm - currentTerm;
    }
  });

  const moneyPerDay = money && term ? ((money / term) * 24 * 60 * 60).toFixed(0) : 0;
  const termString = stringifyTerm(term);

  resultCreditSpan.innerHTML = money ? `${numberWithCommas(money)} (${numberWithCommas(moneyPerDay)} credit/day)` : `-`;

  resultDurationSpan.innerHTML = termString || `-`;
}

function updateButtons(modulesData) {
  Object.keys(modulesData).forEach((moduleId) => {
    const btn = document.querySelector(`.module[data-module-id='${moduleId}']`);
    const { current, target } = modulesData[moduleId];

    btn.classList.toggle(`module--closed`, !current && !target);
    btn.classList.toggle(`module--active`, current < target);

    btn.dataset.currentL = modulesData[moduleId].current;
    btn.dataset.targetL = modulesData[moduleId].target;
  });
}

function initModulesButtons(modulesDiv) {
  modulesDiv.querySelectorAll('button').forEach((btn) => {
    const moduleName = btn.dataset.moduleId;

    if (!modulesData[moduleName]) {
      console.log(`there are no module this name: ${moduleName}`);
      return;
    }

    btn.addEventListener('click', () => {
      const moduleData = modulesData[moduleName];
      const state = modulesStore.getState();
      const userSelect = state[moduleData.Name];

      modalStore.set(() => ({
        moduleId: moduleData.Name,
        currentLevel: userSelect.current,
        targetLevel: userSelect.target,
      }));
    });
  });

  modulesStore.watch(`*`, (state) => {
    updateButtons(state);
  });

  modulesStore.watch(`*`, (state) => {
    renderResult(state);
  });
}

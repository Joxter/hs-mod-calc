import { save, get } from './localStorageUtils';
import { optionsStore, modalStore, modulesStore } from './Model';
import Modal from './Modal';
import { modulesData, allModuleKeys } from './moduleData';
import { parseModules, stringifyModules, parseQueryString } from './urlModules';
import { stringifyTerm, numberWithCommas } from './utils';

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
  initModal();
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
  optionsStore.bindCb(document.querySelector('.share-current--js'), ({ isShareCurrent }) => ({
    isShareCurrent: !isShareCurrent,
  }));
  optionsStore.bindCb(document.querySelector('.share-target--js'), ({ isShareTarget }) => ({
    isShareTarget: !isShareTarget,
  }));

  function renderLink(state) {
    const shareLink = document.querySelector('.share-modules-link--js');

    const link =
      state.isShareCurrent || state.isShareTarget
        ? getLink({
            isCurrent: state.isShareCurrent,
            isTarget: state.isShareTarget,
          })
        : ``;

    shareLink.innerHTML = link;
    shareLink.href = link;
  }

  optionsStore.watch(`*`, renderLink);
  modulesStore.watch(`*`, () => {
    renderLink(optionsStore.getState());
  });
}

function initModal() {
  modalStore.watch(`moduleId`, ({ moduleId, currentLevel, targetLevel }) => {
    if (!moduleId) {
      Modal.close();
      return;
    }

    Modal.open({
      moduleData: modulesData[moduleId],
      selected: {
        from: currentLevel,
        to: targetLevel,
      },
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

function getLink({ isCurrent, isTarget }) {
  let newUrl = `${location.origin}${location.pathname}`;
  const params = [];
  const { currentStr, targetStr } = stringifyModules(allModuleKeys, modulesStore.getState());

  if (isCurrent) {
    params.push(`${CURRENT_URL_RAPAM}=${currentStr}`);
  }

  if (isTarget) {
    params.push(`${TARGET_URL_RAPAM}=${targetStr}`);
  }

  const paramsStr = params.join(`&`);

  if (paramsStr) {
    newUrl += `?${paramsStr}`;
  }

  return newUrl;
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

function getModulePrices(moduleData) {
  if (Array.isArray(moduleData.UnlockPrice)) {
    return moduleData.UnlockPrice.map((price) => +price);
  } else {
    return [moduleData.UnlockPrice];
  }
}

function getModuleTerm(moduleData) {
  if (Array.isArray(moduleData.UnlockPrice)) {
    return moduleData.UnlockTime.map((term) => +term);
  } else {
    return [moduleData.UnlockTime];
  }
}

function renderResult(state) {
  let term = 0;
  let money = 0;

  Object.keys(state).forEach((moduleId) => {
    const userModuleData = state[moduleId];

    const currentPrice = getSumFirst(getModulePrices(modulesData[moduleId]), userModuleData.current);
    const targetPrice = getSumFirst(getModulePrices(modulesData[moduleId]), userModuleData.target);

    if (targetPrice > currentPrice) {
      money += targetPrice - currentPrice;
    }

    const currentTerm = getSumFirst(getModuleTerm(modulesData[moduleId]), userModuleData.current);
    const targetTerm = getSumFirst(getModuleTerm(modulesData[moduleId]), userModuleData.target);

    if (targetTerm > currentTerm) {
      term += targetTerm - currentTerm;
    }
  });

  const moneyPerDay = money && term ? ((money / term) * 24 * 60 * 60).toFixed(0) : 0;
  const termString = stringifyTerm(term);

  resultCreditSpan.innerHTML = money ? `${numberWithCommas(money)} (${numberWithCommas(moneyPerDay)} credit/day)` : `-`;

  resultDurationSpan.innerHTML = termString || `-`;

  function getSumFirst(arr, n) {
    n = n || 0;
    return arr.filter((item, i) => i < n).reduce((acc, item) => acc + +item, 0);
  }
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
      const userSelect = state[moduleData.id];

      modalStore.set(() => ({
        moduleId: moduleData.id,
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

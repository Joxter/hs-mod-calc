import { save, get } from './localStorageUtils';
import { optionsStore, modalStore, modulesStore } from './Model';
import Modal from './Modal';
import { modulesData, allModuleKeys } from './moduleData';
import { parseModules, stringifyModules, parseQueryString } from './urlModules';

const modules = document.querySelector('.modules');
const saveBtn = document.querySelector('.save-btn');
const resetBtn = document.querySelector('.reset-btn');

const newSaveBtn = document.querySelector('.save-button--js');
const newLoadBtn = document.querySelector('.load-button--js');

const resultCreditSpan = document.querySelector('.result-credit .value');
const resultDurationSpan = document.querySelector('.result-duration .value');

const CURRENT_URL_RAPAM = 'cm';
const TARGET_URL_RAPAM = 'tm';
const LOCAL_STORAGE_MODULE_KEY = 'player_modules';

document.addEventListener('DOMContentLoaded', main);
const Model = {};

function main() {
  modulesStore.set(() => getModulesFromLocalStorage());

  initNewSaveButton(newSaveBtn);
  initNewLoadButton(newLoadBtn);

  initModulesButtons(modules);
  // initSaveButton(saveBtn);
  initResetButton(resetBtn);

  initAutosaveCB();
  initShareLink();
  initModal();

  // optionsStore.watch(`*`, (_) => console.log(_));
}

function initAutosaveCB() {
  optionsStore.bindCb(document.querySelector('.autosave--js'), ({ isAutosave }) => ({
    isAutosave: !isAutosave,
  }));
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
  }

  optionsStore.watch(`*`, renderLink);
  modulesStore.watch(`*`, () => {
    setTimeout(() => {
      // неприятный хак(
      renderLink(optionsStore.getState());
    }, 0);
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

function autosaveModules() {
  // todo сделать автосейв
  if (optionsStore.getState().isAutosave) {
    saveModules(allModuleKeys, Model);
  }
}

function getInitModules() {
  const moduleStrs = getModulesStrFromUrl(location.search);
  const moduleData = transformSavedDataToModelData(moduleStrs);

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

function saveModules(store) {
  save(LOCAL_STORAGE_MODULE_KEY, store.getState());
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

function initNewSaveButton(button) {
  button.addEventListener(`click`, () => {
    saveModules(modulesStore);
    updateButton(modulesStore.getState());
  });

  modulesStore.watch(`*`, (store) => {
    updateButton(store);
  });

  function updateButton(store) {
    if (isSameModules(store, getModulesFromLocalStorage())) {
      button.disabled = true;
      button.innerHTML = 'Saved';
    } else {
      button.disabled = false;
      button.innerHTML = 'Save modules';
    }
  }
}

function isSameModules(modulesA, modulesB) {
  const aStr = stringifyModules(allModuleKeys, modulesA);
  const bStr = stringifyModules(allModuleKeys, modulesB);

  return aStr.currentStr === bStr.currentStr && aStr.targetStr === bStr.targetStr;
}

function initNewLoadButton(button) {
  button.addEventListener(`click`, () => {
    loadModulesFromStorage();
  });
}

function loadModulesFromStorage() {
  const moduleStrs = getModulesFromLocalStorage();
  const moduleData = transformSavedDataToModelData(moduleStrs);

  // Model.setData(moduleData);
}

/* 
function initSaveButton(button) {
  button.addEventListener('click', () => {
    const newUrl = getLink({ isCurrent: true, isTarget: true });

    window.history.pushState('', '', newUrl);
  });
}
 */
function initResetButton(button) {
  button.addEventListener('click', () => {
    // Model.reset(`current`);
    // Model.reset(`target`);
  });
}

function getSumFirst(arr, n) {
  n = n || 0;
  return arr.filter((item, i) => i < n).reduce((acc, item) => acc + +item, 0);
}

function getModulePrices(moduleData) {
  return moduleData.data.map(([price, term]) => price);
}
function getModuleTerm(moduleData) {
  return moduleData.data.map(([price, term]) => term);
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
}

function updateButtons(modulesData) {
  Object.keys(modulesData).forEach((moduleId) => {
    const btn = document.querySelector(`.module[data-module-id='${moduleId}']`);

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

function stringifyTerm(sec) {
  const secInMin = 60;
  const secInHour = 60 * secInMin;
  const secInDay = 24 * secInHour;

  const days = Math.floor(sec / secInDay);
  const hours = Math.floor((sec - days * secInDay) / secInHour);
  const mins = Math.floor((sec - days * secInDay - hours * secInHour) / secInMin);

  let result = [];

  if (days) {
    result.push(days + `d`);
  }

  if (hours) {
    result.push(hours + `h`);
  }

  if (mins) {
    result.push(mins + `m`);
  }

  return result.join(` `);
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const modulesData = require('./moduleData').modulesData;
const allModuleKeys = require('./moduleData').allModuleKeys;
const parseModules = require('./urlModules').parseModules;
const stringifyModules = require('./urlModules').stringifyModules;
const parseQueryString = require('./urlModules').parseQueryString;
const Model = require('./Model').default;
const Modal = require('./Modal').default;

const modules = document.querySelector('.modules');
const saveBtn = document.querySelector('.save-btn');
const resetBtn = document.querySelector('.reset-btn');
const resultCreditSpan = document.querySelector('.result-credit .value');
const resultDurationSpan = document.querySelector('.result-duration .value');

const CURRENT_URL_RAPAM = 'cm';
const TARGET_URL_RAPAM = 'tm';

initModulesButtons(modules);
initSaveButton(saveBtn);
initResetButton(resetBtn);

Model.onChange(renderResult);
Model.onChange(updateButtons);
Model.setData(getInitModules());

function getInitModules() {
  if (!location.search) {
    return [];
  }

  const currentModuleStr = parseQueryString(location.search.slice(1))[CURRENT_URL_RAPAM];
  const targetModuleStr = parseQueryString(location.search.slice(1))[TARGET_URL_RAPAM];

  const currentModules = parseModules(allModuleKeys, currentModuleStr);
  const targetModules = parseModules(allModuleKeys, targetModuleStr);

  const modulesData = [];

  Object.keys(currentModules)
    .filter((moduleName) => currentModules[moduleName])
    .forEach((moduleName) => {
      modulesData.push({
        module: moduleName,
        level: currentModules[moduleName],
        section: `current`,
      });
    });

  Object.keys(targetModules)
    .filter((moduleName) => targetModules[moduleName])
    .forEach((moduleName) => {
      modulesData.push({
        module: moduleName,
        level: targetModules[moduleName],
        section: `target`,
      });
    });

  return modulesData;
}

function initSaveButton(button) {
  button.addEventListener('click', () => {
    const currntStr = stringifyModules(allModuleKeys, Model.getSection(`current`));
    const targetStr = stringifyModules(allModuleKeys, Model.getSection(`target`));

    const newUrl = `${location.pathname}?${CURRENT_URL_RAPAM}=${currntStr}&${TARGET_URL_RAPAM}=${targetStr}`;

    window.history.pushState('', '', newUrl);
  });
}

function initResetButton(button) {
  button.addEventListener('click', () => {
    Model.reset(`current`);
    Model.reset(`target`);
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

function renderResult(newData, state) {
  let term = 0;
  let money = 0;

  Object.keys(state.target).forEach((modName) => {
    const currentPrice = getSumFirst(getModulePrices(modulesData[modName]), state.current[modName]);
    const targetPrice = getSumFirst(getModulePrices(modulesData[modName]), state.target[modName]);

    if (targetPrice > currentPrice) {
      money += targetPrice - currentPrice;
    }

    const currentTerm = getSumFirst(getModuleTerm(modulesData[modName]), state.current[modName]);
    const targetTerm = getSumFirst(getModuleTerm(modulesData[modName]), state.target[modName]);

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
  modulesData.forEach(({ module, level, section }) => {
    const btn = document.querySelector(`.module[data-module-id='${module}']`);
    if (section === `current`) {
      btn.dataset.currentL = level;
    } else {
      btn.dataset.targetL = level;
    }
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
      Modal.open({
        moduleData: modulesData[moduleName],
        selected: {
          from: Model.getLevel({ section: `current`, module: moduleName }),
          to: Model.getLevel({ section: `target`, module: moduleName }),
        },
        onOk: (moduleLevel) => {
          Model.setData([
            {
              module: moduleName,
              level: moduleLevel.from,
              section: `current`,
            },
            {
              module: moduleName,
              level: moduleLevel.to,
              section: `target`,
            },
          ]);
        },
      });
    });
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

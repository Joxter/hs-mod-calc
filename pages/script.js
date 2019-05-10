const modulesData = require("./moduleData").modulesData;
const allModuleKeys = require("./moduleData").allModuleKeys;
const parseModules = require("./urlModules").parseModules;
const stringifyModules = require("./urlModules").stringifyModules;
const parseQueryString = require("./urlModules").parseQueryString;
const Model = require("./Model").default;
const Modal = require("./Modal").default;

const modules = document.querySelector(".modules");
const modeToggle = document.querySelector(".mode-toggle");
const saveBtn = document.querySelector(".save-btn");
const resetBtn = document.querySelector(".reset-btn");
const URL_RAPAM = "cm";

const UserSelect = {
  mode: `current`
};

initButtons(modules);
initToggler(modeToggle);
initSaveButton(saveBtn);
initResetButton(resetBtn);

Model.onChange(renderResult);
Model.onChange(updateButtons);
Model.setData(getInitCurrentModules());

Modal.open({
  moduleData: modulesData.barrage,
  selected: {
    from: 2,
    to: 4
  }
});

function getInitCurrentModules() {
  if (!location.search) {
    return [];
  }

  const moduleStr = parseQueryString(location.search.slice(1))[URL_RAPAM];

  if (!moduleStr) {
    return [];
  }

  const modules = parseModules(allModuleKeys, moduleStr);

  const modulesData = Object.keys(modules)
    .filter(moduleName => modules[moduleName])
    .map(moduleName => {
      return {
        module: moduleName,
        level: modules[moduleName],
        section: `current`
      };
    });

  return modulesData;
}

function initSaveButton(button) {
  button.addEventListener("click", () => {
    const str = stringifyModules(allModuleKeys, Model.getSection(`current`));
    const newUrl = `${location.pathname}?${URL_RAPAM}=${str}`;

    window.history.pushState("", "", newUrl);
  });
}

function initResetButton(button) {
  button.addEventListener("click", () => {
    Model.reset();
  });
}

function getSumFirst(arr, n) {
  return arr.filter((item, i) => i < n).reduce((acc, item) => acc + +item, 0);
}

function renderResult(newData, state) {
  const result = document.querySelector(".result");

  let term = 0;
  let money = 0;

  Object.keys(state.target).forEach(modName => {
    const currentPrice = getSumFirst(
      modulesData[modName].prices,
      state.current[modName]
    );

    const targetPrice = getSumFirst(
      modulesData[modName].prices,
      state.target[modName]
    );

    if (targetPrice > currentPrice) {
      money += targetPrice - currentPrice;
    }

    const currentTerm = getSumFirst(
      modulesData[modName].term.map(termItem => parseTerm(termItem)),
      state.current[modName]
    );

    const targetTerm = getSumFirst(
      modulesData[modName].term.map(termItem => parseTerm(termItem)),
      state.target[modName]
    );

    if (targetTerm > currentTerm) {
      term += targetTerm - currentTerm;
    }
  });

  const moneyPerDay = money && term ? Math.floor((money / term) * 24 * 60) : 0;
  const termString = stringifyTerm(term);

  result.innerHTML = `term ${termString}, money ${money} (${moneyPerDay} money/day)`;
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

function initButtons(modulesDiv) {
  modulesDiv.querySelectorAll("button").forEach(btn => {
    const moduleName = btn.dataset.moduleId;

    if (!modulesData[moduleName]) {
      console.log(`there are no module this name: ${moduleName}`);
      return;
    }

    btn.addEventListener("click", () => {
      Modal.open({
        moduleData: modulesData[moduleName],
        selected: {
          from: Model.getLevel({ section: `current`, module: moduleName }),
          to: Model.getLevel({ section: `target`, module: moduleName })
        },
        onOk: moduleLevel => {
          Model.setData([
            {
              module: moduleName,
              level: moduleLevel.from,
              section: `current`
            },
            {
              module: moduleName,
              level: moduleLevel.to,
              section: `target`
            }
          ]);
        }
      });
    });
  });
}

function parseTerm(term /* 4h / 2d / 5m */) {
  try {
    const [, number, period] = term.match(/(\d+)([hdm])/);

    if (period === `m`) {
      return +number;
    }
    if (period === `h`) {
      return +number * 60;
    }
    if (period === `d`) {
      return +number * 60 * 24;
    }
  } catch (e) {
    throw new Error(`Term must be like '4h' or '2d', not: ${term}`);
  }
}

function stringifyTerm(term /* 600 */) {
  const days = Math.floor(term / (24 * 60));
  const hours = Math.floor((term - days * 24 * 60) / 60);
  const mins = term - days * 24 * 60 - hours * 60;

  let result = ``;

  if (days) {
    result += days + `d`;
  }

  if (hours) {
    result += hours + `h`;
  }

  if (mins) {
    result += mins + `m`;
  }

  return result;
}

function initToggler(elem) {
  elem.addEventListener("change", event => {
    UserSelect.mode = event.target.value;
  });

  const checkedElem = elem.querySelector("input:checked");

  if (checkedElem) {
    UserSelect.mode = checkedElem.value;
  }
}

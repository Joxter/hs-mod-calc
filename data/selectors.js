import { modulesData } from './moduleData';

export function getModulePrices(key) {
  const raw = modulesData[key].UnlockPrice;

  return raw.map((price) => +price);
}

export function getModuleTerms(key) {
  const raw = modulesData[key].UnlockTime;

  return raw.map((time) => +time);
}

export function getModuleName(key) {
  return modulesData[key].eng;
}

export function getModuleLevelParams(key, level) {
    const levelParams = {};
    const allModuleInfo = modulesData[key];

    Object.keys(allModuleInfo)
        .filter((paramKey) => Array.isArray(allModuleInfo[paramKey]))
        .forEach((paramKey) => {
            levelParams[paramKey] = allModuleInfo[paramKey][Math.max(level - 1, 0)];
        });

    return levelParams;
}

export function getModuleMaxLevel(key) {
  return +modulesData[key].maxLevel;
}

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

export function getModuleMaxLevel(key) {
  console.log(+modulesData[key].maxLevel);
  return +modulesData[key].maxLevel;
}

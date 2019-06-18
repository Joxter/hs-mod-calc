import { modulesData } from './moduleData';

export function getModulePrices(key) {
  const raw = modulesData[key].UnlockPrice;

  if (Array.isArray(raw)) {
    return raw.map((price) => +price);
  } else {
    return [+raw];
  }
}

export function getModuleTerms(key) {
  const raw = modulesData[key].UnlockTime;

  if (Array.isArray(raw)) {
    return raw.map((time) => +time);
  } else {
    return [+raw];
  }
}

export function getModuleName(key) {
    return modulesData[key].eng;
}

export function getModuleMaxLevel(key) {
    const raw = modulesData[key].UnlockPrice;

    if (Array.isArray(raw)) {
        return raw.length;
    } else {
        return 1;
    }
}


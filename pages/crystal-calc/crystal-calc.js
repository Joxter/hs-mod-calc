import {
  min2crystals,
  credits2crystals,
  hydrogen2crystals,
  crystals2sec,
  crystals2credits,
  crystals2hydrogen,
} from './formulas';

import { stringifyTerm, numberWithCommas } from '../utils';

document.addEventListener('DOMContentLoaded', main);

function main() {
  document.body.addEventListener(`input`, (event) => {
    const input = event.target;
    const maxLength = +input.getAttribute(`maxlength`);

    if (input.value.length > maxLength) {
      input.value = input.value.slice(0, 2);
    }
  });

  initSec2crystals();
  initCredits2crystals();
  initHydrogen2crystals();

  initCrystals2any();
}

function initSec2crystals() {
  const daysInput = document.querySelector(`#days-2-crystals`);
  const hoursInput = document.querySelector(`#hours-2-crystals`);
  const minInput = document.querySelector(`#mins-2-crystals`);
  const resultEl = document.querySelector(`#sec-2-crystals-output`);

  function count() {
    const days = daysInput.value;
    const hours = hoursInput.value;
    const mins = minInput.value;

    const result = mins === `` && hours === `` && days === `` ? null : min2crystals(getSec(days, hours, mins));

    resultEl.innerHTML = result === null ? `-` : numberWithCommas(result);
  }

  minInput.addEventListener(`input`, count);
  hoursInput.addEventListener(`input`, count);
  daysInput.addEventListener(`input`, count);
  count();
}

function initCredits2crystals() {
  const inputEl = document.querySelector(`#credits-2-crystals`);
  const resultEl = document.querySelector(`#credits-2-crystals-output`);

  function count() {
    const input = inputEl.value;
    const result = input === `` ? null : credits2crystals(int(input));

    resultEl.innerHTML = result === null ? `-` : numberWithCommas(result);
  }

  inputEl.addEventListener(`input`, count);
  count();
}

function initHydrogen2crystals() {
  const inputEl = document.querySelector(`#hydrogen-2-crystals`);
  const resultEl = document.querySelector(`#hydrogen-2-crystals-output`);

  function count() {
    const input = inputEl.value;
    const result = input === `` ? null : hydrogen2crystals(int(input));

    resultEl.innerHTML = result === null ? `-` : numberWithCommas(result);
  }

  inputEl.addEventListener(`input`, count);
  count();
}

function initCrystals2any() {
  const inputEl = document.querySelector(`#crystals-2-any`);
  const crystalResultEl = document.querySelector(`#crystals-2-sec-output`);
  const creditResultEl = document.querySelector(`#crystals-2-credits-output`);
  const hydrogenResultEl = document.querySelector(`#crystals-2-hydrogen-output`);

  function count() {
    const input = inputEl.value;
    const secResult = input === `` ? null : crystals2sec(int(input));
    const creditsResult = input === `` ? null : crystals2credits(int(input));
    const hydrogenResult = input === `` ? null : crystals2hydrogen(int(input));

    crystalResultEl.innerHTML = secResult === null ? `-` : stringifyTerm(secResult * 60);
    creditResultEl.innerHTML = creditsResult === null ? `-` : numberWithCommas(creditsResult);
    hydrogenResultEl.innerHTML = hydrogenResult === null ? `-` : numberWithCommas(hydrogenResult);
  }

  inputEl.addEventListener(`input`, count);
  count();
}

function int(a) {
  return parseInt(a) || 0;
}

function getSec(days, hours, mins) {
  return int(mins) * 60 + int(hours) * 60 * 60 + int(days) * 60 * 60 * 24;
}

import { getModuleParamLabel, getModulePrices, getModuleTerms } from '../data/selectors';

export function stringifyTerm(timeSec) {
  const secInMin = 60;
  const secInHour = 60 * secInMin;
  const secInDay = 24 * secInHour;

  const days = Math.floor(timeSec / secInDay);
  const hours = Math.floor((timeSec - days * secInDay) / secInHour);
  const mins = Math.floor((timeSec - days * secInDay - hours * secInHour) / secInMin);
  const sec = timeSec - days * secInDay - hours * secInHour - mins * secInMin;

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

  if (sec) {
    result.push(sec + `s`);
  }

  return result.join(` `) || 0;
}

export function getLabelAndFormatter(key) {
  const label = getModuleParamLabel(key);

  const timeFields = [
    `SpawnLifetime`,
    `SpawnLifetime_WS`,
    `ActivationDelay`,
    `ActivationPrepWS`,
    `RedStarLifeExtention`,
  ];
  const secFuelds = [`EffectDurationx10`, `EffectDurationx10BS`, `EffectDurationx10WS`];
  const hydroFields = [`ActivationFuelCost`];
  const moneyFields = [`BCCost`];
  const fuelFields = [`FuelUseIncrease`];
  const auFields = [`EffectRadiusWS`, `EffectRadiusBS`, `EffectRadius`];
  const percentFields = [
    `MiningSpeedModifierPct`,
    `JobPayoutIncreasePercent`,
    `DamageReductionPct`,
    `TradeStationDeliverReward`,
    `DroneShipmentBonus`,
    `TradeBurstShipmentBonus`,
    `MirrorDamagePct`,
    `IncreaseSectorHydroPct`,
    `HydroUploadPct`,
    `SpeedIncreasePerShipment`,
    `SalvageHullPercent`,
    `IncreaseSectorHydroPct`,
  ];

  let format = numberWithCommas;

  if (timeFields.indexOf(key) > -1) {
    format = stringifyTerm;
  } else if (secFuelds.indexOf(key) > -1) {
    format = (_) => `${_ / 10} sec`;
  } else if (hydroFields.indexOf(key) > -1) {
    format = (_) => `${numberWithCommas(_)} hyd`;
  } else if (fuelFields.indexOf(key) > -1) {
    format = (_) => `${_ / 5}/100 AU`;
  } else if (moneyFields.indexOf(key) > -1) {
    format = (_) => `${numberWithCommas(_)} cr`;
  } else if (auFields.indexOf(key) > -1) {
    format = (_) => `${_}AU`;
  } else if (percentFields.indexOf(key) > -1) {
    format = (_) => `${_}%`;
  }

  return {
    label,
    format,
  };
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function getSumModuleTimeAndPrice(moduleId, level) {
  return [
    getSumFirst(getModuleTerms(moduleId), level), //
    getSumFirst(getModulePrices(moduleId), level),
  ];
}

function getSumFirst(arr, n) {
  n = n || 0;
  return arr.filter((item, i) => i < n).reduce((acc, item) => acc + +item, 0);
}

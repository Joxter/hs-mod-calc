import { getModulePrices, getModuleTerms } from '../data/selectors';

export function stringifyTerm(timeSec) {
  timeSec = +timeSec;
  const isNegative = timeSec < 0;
  timeSec = Math.abs(timeSec);

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

  if (isNegative) {
    return `-` + result.join(` `);
  }

  return result.join(` `) || 0;
}

export function getStatFormatter(key) {
  const secFields = [`SpawnLifetime`, `ActivationDelay`, `ActivationPrep`, `ActivationPrepBS`, `RedStarLifeExtention`];
  const sixHoursFields = [`ActivationPrepWS`, `SpawnLifetime_WS`];
  const secFuelds = [`EffectDurationx10`, `EffectDurationx10BS`, `EffectDurationx10WS`];
  const hydroFields = [`ActivationFuelCost`];
  const moneyFields = [`BCCost`];
  const fuelFields = [`FuelUseIncrease`];
  const auFields = [`EffectRadiusWS`, `EffectRadiusBS`, `EffectRadius`, `DamageRange`, `DamageRangeWhenNeutralized`];
  const percentFields = [
    `MiningSpeedModifierPct`,
    `JobPayoutIncreasePercent`,
    `DamageReductionPct`,
    `TradeStationDeliverReward`,
    `DroneShipmentBonus`,
    `TradeBurstShipmentBonus`,
    `MirrorDamagePct`,
    `WaypointShipmentRewardBonus`,
    `UnityBoostPercent`,
    `IncreaseSectorHydroPct`,
    `HydroUploadPct`,
    `SpeedIncreasePerShipment`,
    `IncreaseSectorHydroPct`,
  ];
  const x10multFields = [`TimeWarpFactor`];
  const speedFields = [`Speed`];
  const miningSpeedFields = [`MiningSpeed`];
  const salvageHullPercentFields = [`SalvageHullPercent`];

  let format = numberWithCommas;

  if (secFields.indexOf(key) > -1) {
    format = stringifyTerm;
  } else if (secFuelds.indexOf(key) > -1) {
    format = (_) => `${_ / 10} sec`;
  } else if (sixHoursFields.indexOf(key) > -1) {
    format = (_) => stringifyTerm((_ * 60 * 60) / 6);
  } else if (miningSpeedFields.indexOf(key) > -1) {
    format = (_) => numberWithCommas((+_).toFixed(1)) + `/min`;
  } else if (hydroFields.indexOf(key) > -1) {
    format = (_) => `${numberWithCommas(_)} hyd`;
  } else if (fuelFields.indexOf(key) > -1) {
    format = (_) => `${_ / 5}/100 AU`;
  } else if (moneyFields.indexOf(key) > -1) {
    format = (_) => `${numberWithCommas(_)} cr`;
  } else if (salvageHullPercentFields.indexOf(key) > -1) {
    format = (_) => {
      if (!_) {
        return 0;
      }
      const [ val ] = _.split('!');
      return `${+val}%`
    };
  } else if (auFields.indexOf(key) > -1) {
    format = (_) => `${_ / 10}AU`;
  } else if (speedFields.indexOf(key) > -1) {
    format = (_) => `${_ * 6}AU/m`;
  } else if (x10multFields.indexOf(key) > -1) {
    format = (_) => `${_ / 100}x`;
  } else if (percentFields.indexOf(key) > -1) {
    format = (_) => `${_}%`;
  }

  return format;
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

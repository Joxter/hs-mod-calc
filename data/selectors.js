import { modulesData } from './moduleData';

export function getModulePrices(key) {
  const raw = modulesData[key].UnlockPrice;

  return raw.map((price) => +price);
}

export function getModuleTerms(key) {
  const raw = modulesData[key].UnlockTime;

  return raw.map((time) => +time);
}

export function getModuleParamLabel(key) {
  const trKey = {
    UnlockBlueprints: `Unlock blueprints`,
    FuelUseIncrease: `Additional hydrogen use`,
    BCCost: `Install price`,
    BSScore: `[BSScore]`,
    WhiteStarScore: `[WhiteStarScore]`,
    ActivationDelay: `Activation delay`,
    EffectRadius: `Effect Range`,
    ActivationFuelCost: `Activation cost`,
    SpawnLifetime: `Lifetime`,
    SpawnLifetime_WS: `Lifetime (WS)`,
    EffectRadiusWS: `Effect range (WS)`,
    EffectRadiusBS: `Effect range (BS)`,
    WaypointShipmentRewardBonus: `Reward bonus`,
    EffectDurationx10: `Effect duration`,
    EffectDurationx10BS: `Effect duration (BS)`,
    EffectDurationx10WS: `Effect duration (WS)`,
    JobPayoutIncreasePercent: `Shipment reward bonus`,
    SpeedIncreasePerShipment: `Speed increase`,
    TradeBurstShipmentsStart: `Threshold`,
    TradeBurstShipmentBonus: `Bonus reward`,
    SpawnCapacity: `Total cargo slots`,
    DroneShipmentBonus: `Bonus per additional shipment, %`,
    TradeStationDeliverReward: `Payoff`,
    TeleportShipments: `Max shipments`,
    APTPIOTTP: null,
    MiningSpeedModifierPct: `Mining speed, %`,
    ExtraMineralStorage: `Activation storage`,
    IncreaseSectorHydroPct: `Hydro increase, %`,
    HydroUploadPct: `Hydro upload, %`,
    UnityBoostPercent: `Damage increase per player`,
    InstantHydrogenCollected: `Max amount`,
    MaxNewAsteroids: `Max new asteroids`,
    HydroPerNewAsteroid: `Hydro per new asteroid`,
    InitialBlueprints: ``,
    DPS: `Damage per second`,
    MaxDPS: `Max damage per second`,
    MaxTargets: `Max targets`,
    AdditionalDPSPerTargetInRange: `Additional damage`,
    ShieldStrength: `Shield strength`,
    SpeedIncrDuringActivation: `Speed increase`,
    MirrorDamagePct: `Damage mirrored`,
    RedStarLifeExtention: `Life extention`,
    RepairHullPointsPerSecond: `HP repaired per second`,
    TimeWarpFactor: `Time factor`,
    DamageReductionPct: `Damage reduction`,
    SalvageHullPercent: `Hull repaired per ship`,
    AOEDamage: `Area damage`,
    AOEDamage_WS: `Area damage (WS)`,
    AOEDamage_BS: `Area damage (BS)`,
    ActivationPrepWS: `Activation delay (WS)`,
  }[key];

  return trKey || key;
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

var fs = require('fs');
var someHumanData = require('./someHumanData').someHumanData;
var modulesByTypes = require('./someHumanData').modulesByTypes;
var specialModuleData = require('./someHumanData').specialModuleData;
var prettier = require('prettier');
var csv2json = require('csv2json');

const tempJsonModulesFileName = './raw_data/modules.json';
const tempJsonProjectilesFileName = './raw_data/projectiles.json';
const outputFileName = './data/moduleData.js';

fs.createReadStream('./raw_data/modules.csv')
  .pipe(csv2json({}))
  .pipe(fs.createWriteStream(tempJsonModulesFileName))
  .on('finish', function() {
    fs.createReadStream('./raw_data/projectiles.csv')
      .pipe(csv2json({}))
      .pipe(fs.createWriteStream(tempJsonProjectilesFileName))
      .on('finish', function() {
        const modulesFile = fs.readFileSync(tempJsonModulesFileName).toString();
        const projectilesFile = fs.readFileSync(tempJsonProjectilesFileName).toString();

        const modulesDataRaw = JSON.parse(modulesFile);
        const projectilesDataRaw = JSON.parse(projectilesFile);

        let modulesData = getModuleInfo(modulesDataRaw);
        modulesData = addRocketInfo(modulesData, projectilesDataRaw);
        let fullModulesData = addSpecialModulesData(modulesData, specialModuleData);

        saveToFile(outputFileName, fullModulesData);
        fs.unlinkSync(tempJsonProjectilesFileName);
        fs.unlinkSync(tempJsonModulesFileName);
      });
  });

function saveToFile(filePath, modulesData) {
  const content = `
// generated by ${__filename} 
// at ${new Date().toString()}

var modulesData = ${JSON.stringify(modulesData, true, 2)}

var modulesByTypes = ${JSON.stringify(modulesByTypes, true, 2)}

const allModuleKeys = [
  ...modulesByTypes.trade,
  ...modulesByTypes.mining,
  ...modulesByTypes.weapon,
  ...modulesByTypes.shield,
  ...modulesByTypes.support
];

module.exports = {
  modulesData,
  allModuleKeys,
  modulesByTypes
};
`;

  fs.writeFileSync(
    filePath,
    prettier.format(content, {
      parser: 'babel',
      trailingComma: 'es5',
      tabWidth: 2,
      semi: true,
      printWidth: 500, // чтоб массивы выстраивались в одну линию
      jsxSingleQuote: true,
      jsxBracketSameLine: false,
      arrowParens: 'always',
      bracketSpacing: true,
      singleQuote: true,
    })
  );
}

function removeFields(obj, fields) {
  const cleanObj = {};

  for (let key in obj) {
    if (fields.indexOf(key) === -1) {
      cleanObj[key] = obj[key];
    }
  }

  return cleanObj;
}

function getNonEmptyString(obj) {
  const cleanObj = {};

  for (let key in obj) {
    if (obj[key] !== '') {
      cleanObj[key] = obj[key];
    }
  }

  return cleanObj;
}

function squooshNonArrays(moduleData) {
  const newModuleData = {};

  Object.keys(moduleData).forEach((key) => {
    if (moduleData[key][1] === '' || moduleData[key].length === 1) {
      newModuleData[key] = moduleData[key][0];
    } else {
      newModuleData[key] = moduleData[key];
    }
  });

  return newModuleData;
}

function addSpecialModulesData(modulesData, specData) {
  modulesData = { ...modulesData };

  Object.keys(specData).forEach((key) => {
    modulesData[key] = specData[key];
  });

  return modulesData;
}

function addRocketInfo(modulesData, projectilesData) {
  const rocketsData = getModuleInfo(projectilesData);

  function getRockerData(rocketData) {
    const data = {
      Speed: Array.from({ length: rocketData.HP.length }, () => rocketData.Speed),
      HP: rocketData.HP,
      Damage: rocketData.Damage,
      DamageRange: rocketData.DamageRange,
    };

    if (rocketData.DamageWhenNeutralized) {
      data.DamageWhenNeutralized = rocketData.DamageWhenNeutralized;
    }

    if (rocketData.DamageRangeWhenNeutralized) {
      data.DamageRangeWhenNeutralized = rocketData.DamageRangeWhenNeutralized;
    }

    return data;
  }

  modulesData.DartLauncher = {
    ...modulesData.DartLauncher,
    ...getRockerData(rocketsData.Dart),
  };

  modulesData.HydroRocket = {
    ...modulesData.HydroRocket,
    ...getRockerData(rocketsData.HydroRocket),
  };

  modulesData.AlphaRocket = {
    ...modulesData.AlphaRocket,
    ...getRockerData(rocketsData.Alpha),
  };

  modulesData.DeltaRocket = {
    ...modulesData.DeltaRocket,
    ...getRockerData(rocketsData.Delta),
  };

  modulesData.OmegaRocket = {
    ...modulesData.OmegaRocket,
    ...getRockerData(rocketsData.Omega),
  };

  return modulesData;
}

function getModuleInfo(modulesData) {
  let modulesInfo = {};

  let currentName = null;
  let currentMatterKeys = null;

  const trash = [
    'ActivationType',
    'ShowWSInfo',
    'HideSelection',
    'SlotType',
    'ClientActivationFx',
    'SustainedFX',
    'WeaponFx',
    'ActivateFX',
    'ActivateFXStaysInPlace',
    'WeaponEffectType',
    'ScaleEffectsWithZoom',
    'AllowedStarTypes',
    'DoNotAward',
    'TeleportToTradeStation',
    'MaxImpulse',
    'StopCountdownOnDisable',
    'AdditionalWaypoint',
    'Model',
    'ImpactFX',
    'DestroyedFX',
    'LaunchFX',
  ];

  modulesData.forEach((modData) => {
    if (+modData.Hide) {
      return;
    }

    // console.log(modData);

    if (modData.Name && currentName !== modData.Name) {
      currentName = modData.Name;
      currentMatterKeys = Object.keys(removeFields(getNonEmptyString(modData), trash));

      modulesInfo[currentName] = {
        ...(someHumanData[currentName] ? { eng: someHumanData[currentName].eng } : null),
        id: currentName,
        maxLevel: 0,
      };

      currentMatterKeys.forEach((key) => {
        modulesInfo[currentName][key] = [];
      });
    }

    modulesInfo[currentName].maxLevel++;

    currentMatterKeys.forEach((key) => {
      modulesInfo[currentName][key].push(modData[key]);
    });
  });

  Object.keys(modulesInfo).forEach((key) => {
    modulesInfo[key] = squooshNonArrays(modulesInfo[key]);
  });

  return modulesInfo;
}

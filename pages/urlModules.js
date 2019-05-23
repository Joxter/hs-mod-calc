export function parseModules(modules, url = ``) {
  const userSelect = {};

  modules.forEach((moduleName, i) => {
    userSelect[moduleName] = +`0x${url[i] || 0}` || 0;
  });

  return userSelect;
}

export function stringifyModules(modulesKeys, userSelect) {
  let currentStr = '';
  let targetStr = '';

  function transform(input) {
    input = +input || 0;
    return input.toString(16).toLocaleUpperCase();
  }

  modulesKeys.forEach((moduleName, i) => {
    currentStr += transform(userSelect[moduleName].current);
    targetStr += transform(userSelect[moduleName].target);
  });

  return {
    targetStr,
    currentStr,
  };
}

export function parseQueryString(url) {
  const [_, query = ``] = url.split(`?`);
  const params = {};
  const vars = query.split('&');

  vars.forEach((variable) => {
    var [key, value] = variable.split('=');

    if (key) {
      if (value === undefined) {
        value = true;
      }
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });

  return params;
}

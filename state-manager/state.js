import { optionsStore } from '../pages/Model';

function diffKeys(objA, objB) {
  const bKeys = Object.keys(objB).sort();

  // console.log(bKeys.filter((key) => objA[key] !== objB[key]));
  return bKeys.filter((key) => objA[key] !== objB[key]);
}

export function createStore(initState) {
  let data = initState;

  const reducers = {};
  const watchers = {};

  function callWatchers(keys, data) {
    [...keys, `*`].forEach((diffKey) => {
      // console.log(diffKey);
      (watchers[diffKey] || []).forEach((watcher) => {
        watcher(data);
      });
    });
  }

  const store = {
    watch(key, callback) {
      if (!watchers[key]) {
        watchers[key] = [];
      }

      watchers[key].push(callback);

      callback(data);
    },

    set(callback) {
      _set(callback(data));
    },

    reset() {
      callWatchers(Object.keys(data));
    },

    getState() {
      return data;
    },

    dispatch(actionName, payload) {
      let actionReducers = reducers[actionName];

      const newData = actionReducers.reduce((accData, reducer) => {
        return reducer(accData, payload);
      }, data);

      callWatchers(diffKeys(data, newData), newData);

      data = newData;
    },

    on(action, callback) {
      if (!action.jActionName) {
        throw new Error(`Event should be gotten from 'createEvent'`);
      }

      if (!reducers[action.jActionName]) {
        reducers[action.jActionName] = [];
      }

      action.jStores.add(store);

      reducers[action.jActionName].push(callback);
    },

    bindCb(elem, action) {
      elem.addEventListener(`change`, (event) => {
        event.preventDefault();
        store.set(action);
      });

      const key = Object.keys(action({}));

      optionsStore.watch(key, (state) => {
        elem.checked = state[key];
      });
    },
  };

  const _set = createEvent(`set`);

  store.on(_set, (state, payload) => {
    return {
      ...state,
      ...payload,
    };
  });

  return store;
}

export function createEvent(eventName) {
  const innerEventName = Symbol(eventName);

  function event(payload) {
    if (event.jStores.size === 0) {
      console.log(`no reducers for ${innerEventName.toString()}`);
    }
    event.jStores.forEach((store) => {
      store.dispatch(innerEventName, payload);
    });
  }

  event.jActionName = innerEventName;
  event.jStores = new Set();

  return event;
}

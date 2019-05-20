function diffKeys(objA, objB) {
  const aKeys = Object.keys(objA).sort();
  const bKeys = Object.keys(objB).sort();

  if (aKeys.join(',') !== bKeys.join(',')) {
    throw new Error(`Object should have similar keys`);
  }

  return aKeys.filter((key) => objA[key] !== objB[key]);
}

function createStore(initState) {
  let data = initState;

  const reducers = {};
  const watchers = {};

  function callWatchers(keys, data) {
    [keys, `*`].forEach((diffKey) => {
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
  };

  return store;
}

function createEvent(eventName) {
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

const inc = createEvent(`inc`);
const reset = createEvent(`reset`);
const toggle = createEvent(`toggle`);

const store = createStore({
  counter: 0,
  toggler: false,
  //
  // modules: {
  //   // miduleId: {current, target}
  // },
  //
  // isAutosave: false, // true / false
  // isShareCurrent: false, // true / false
  // isShareTarget: false, // true / false
  //
  // modalForm: {
  //   moduleId: null,
  //   currentLevel: null,
  //   targetLevel: null,
  // },
});

store.on(inc, (state, payload) => ({
  ...state,
  counter: state.counter + payload,
}));
store.on(toggle, (state) => ({
  ...state,
  toggler: !state.toggle,
}));
store.on(reset, (state) => ({
  toggler: false,
  counter: 0,
}));

store.watch('counter', (state) => {
  console.log(`counter: `, state);
});
store.watch('toggler', (state) => {
  console.log(`toggler: `, state);
});
store.watch('*', (state) => {
  console.log(`!!! state: `, state);
});

inc(3);
toggle();
reset();
inc(4);

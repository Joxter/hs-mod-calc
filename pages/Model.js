import { createEvent, createStore } from '../state-manager/state';

export const modulesStore = createStore({
  // miduleId: {current, target}
});
window.modulesStore = modulesStore;

export const updateModule = createEvent(`updateModule`); // {...state, modId: {current, target}}

modulesStore.on(updateModule, (state, payload) => ({
  ...state,
  ...payload,
}));


///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

export const optionsStore = createStore({
  isAutosave: false, // true / false
  isShareCurrent: false, // true / false
  isShareTarget: false, // true / false
});
window.optionsStore = optionsStore;

export const toggleAutosave = createEvent(`toggleAutosave`);
export const toggleShareCurrent = createEvent(`toggleShareCurrent`);
export const toggleShareTarget = createEvent(`toggleShareTarget`);

optionsStore.on(toggleAutosave, (state) => ({
  ...state,
  isAutosave: !state.isAutosave,
}));

optionsStore.on(toggleShareCurrent, (state) => ({
  ...state,
  isShareCurrent: !state.isShareCurrent,
}));

optionsStore.on(toggleShareTarget, (state) => ({
  ...state,
  isShareTarget: !state.isShareTarget,
}));

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

export const modalStore = createStore({
  moduleId: null,
  currentLevel: null,
  targetLevel: null,
});
window.modalStore = modalStore;

const changeModuleId = createEvent(`changeModuleId`);
const changeLevel = createEvent(`changeLevel`);

modalStore.on(changeModuleId, (state, payload) => ({
  ...state,
  moduleId: payload,
}));

modalStore.on(changeLevel, ({ current, target }) => ({
  ...state,
  currentLevel: current,
  targetLevel: target,
}));

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

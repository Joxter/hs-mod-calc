import { createStore, createEvent } from '../state-manager/state';

export const modulesStore = createStore({});
window.modulesStore = modulesStore;

export const optionsStore = createStore({
  isAutosave: location.search ? false : true, // грубая проверка есть ли модули в URL
  isShareCurrent: false,
  isShareTarget: false,
});
window.optionsStore = optionsStore;

export const changeFrom = createEvent(`changeFrom`);
export const changeTo = createEvent(`changeTo`);

export const modalStore = createStore({
  moduleId: null,
  currentLevel: null,
  targetLevel: null,
});

modalStore.on(changeFrom, (state, from) => {
  const to = from > state.targetLevel ? from : state.targetLevel;

  return {
    ...state,
    currentLevel: from,
    targetLevel: to,
  };
});

modalStore.on(changeTo, (state, to) => {
  const from = to < state.currentLevel ? to : state.currentLevel;

  return {
    ...state,
    currentLevel: from,
    targetLevel: to,
  };
});
window.modalStore = modalStore;

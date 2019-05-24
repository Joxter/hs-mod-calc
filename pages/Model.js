import { createStore } from '../state-manager/state';

export const modulesStore = createStore({});
window.modulesStore = modulesStore;

export const optionsStore = createStore({
  isAutosave: location.search ? false : true, // грубая проверка есть ли модули в URL
  isShareCurrent: false,
  isShareTarget: false,
});
window.optionsStore = optionsStore;

export const modalStore = createStore({
  moduleId: null,
  currentLevel: null,
  targetLevel: null,
});
window.modalStore = modalStore;

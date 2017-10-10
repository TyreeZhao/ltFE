import throttle from 'lodash.throttle';
import localforage from 'localforage';
import {INDEXED_DB_NAME} from 'config';

const createInstance = (storeName) => localforage.createInstance({
  driver: [
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE,
  ],
  name: INDEXED_DB_NAME,
  storeName,
});

let stores = {};

export const clearState = (storeName) => {

  return new Promise((resolve) => {
    stores[storeName].clear().then(() => {
      resolve();
    }).catch(err => resolve(undefined));
  });
};

export const loadState = (storeName) => {

  if (!stores[storeName]) {
    stores[storeName] = createInstance(storeName);
  }

  let state;
  return new Promise((resolve) => {
    stores[storeName].iterate((value, key) => {
      if (!state) {
        state = {};
      }
      state[key] = value;
    }, () => {
      resolve(state);
    }).catch(err => resolve(undefined));
  });

};

export const saveState = (storeName, object) => {

  if (!stores[storeName]) {
    stores[storeName] = createInstance(storeName);
  }

  if (Array.isArray(object) && 0 === object.length) {
    return clearState(storeName);
  }

  let promises = [];

  for (let key in object) {
    promises = [...promises, stores[storeName].setItem(key, object[key])];
  }

  return Promise.all(promises);
};

export const getStateSize = (storeName) => {

  if (!stores[storeName]) {
    stores[storeName] = createInstance(storeName);
  }

  return new Promise((resolve) => {

    stores[storeName].length().then((numberOfKeys) => {
      resolve(numberOfKeys);
    }).catch((err) => {
      resolve(0);
    });
  });
};


export const persistStore = (store, options) => {
  store.subscribe(throttle(() => {
    const reduxState = store.getState();
    const {whitelist} = options;

    if (whitelist && whitelist.length > 0) {
      whitelist.forEach((item, index) => saveState(item, reduxState[item]));
    }

  }, 66));

  return store;
};

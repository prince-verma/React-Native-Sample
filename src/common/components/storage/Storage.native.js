import {AsyncStorage} from 'react-native';

//store value/object, if object stringify
export let set = (key, object) => {
  return new Promise(function (resolve, reject) {
    if (object === undefined) {
      reject(new Error('storage item value required'));
    } else {
      let value = getString(object);
      AsyncStorage.setItem(key, value).then(() => {
        return resolve();
      }).catch(err => {
        return reject(err);
      });
    }
  });
};

//get value/object, if json then parse
export let get = (key) => {
  return new Promise(function (resolve, reject) {
    AsyncStorage.getItem(key).then(value => {
      let object = getJSONObject(value);
      resolve(object);
    }).catch(reject);
  });
};

export let remove = (key) => {
  return new Promise(function (resolve, reject) {
    AsyncStorage.removeItem(key).then(resolve).catch(reject);
  });
};


export let getJSONObject = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return str;
  }
};

export let getString = (data) => {
  try {
    if (typeof data === "string") {
      return data
    }
    return JSON.stringify(data);
  } catch (e) {
    return data;
  }
};

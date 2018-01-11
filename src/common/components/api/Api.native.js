export function get(url, data) {
  return requestNative('GET', url, data);
}

export function post(url, data) {
  return requestNative('POST', url, data);
}

export function put(url, data) {
  return requestNative('PUT', url, data);
}

export function del(url, data) {
  return requestNative('DELETE', url, data);
}

let requestNative = (type, url, data) => {
  return new Promise(function (resolve, reject) {
    let options = {
      method: type,
      body: data ? JSON.stringify(data) : null,
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    type === 'GET' && delete options.body;

    fetch(url, options)
      .then(response => {
        resolve(response.json());
      })
      .catch(err => {
        console.log('native api error: ', JSON.stringify(err), err.message);
        notify('Please check your internet connection');
        reject(err);
      });
  });
};
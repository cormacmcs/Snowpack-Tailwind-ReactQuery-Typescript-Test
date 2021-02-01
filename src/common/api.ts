// const {
//   REACT_APP_TARGET_URL_ROOT,
//   REACT_APP_TARGET_API_KEY
// } = process.env;

// const pokeAPI = 'https://pokeapi.co/api/v2/';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const get = async (endpoint: string, headers?: Headers, options?: object) => {
  return await fetch(endpoint, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...options,
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok') as Error;
    }
    return response.json();
  });
};

const del = async (endpoint: string, headers?: Headers, options?: object) => {
  return await fetch(endpoint, {
    method: 'DELETE',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...options,
  }).then((response) => {
    return response.json();
  });
};

const post = async (endpoint: string, body: any, headers?: Headers, options?: object) => {
  return await fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...options,
  }).then((response) => {
    return response.json();
  });
};

const put = async (endpoint: string, body: any, headers?: Headers, options?: object) => {
  return await fetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...options,
  }).then((response) => {
    return response.json();
  });
};

const patch = async (endpoint: string, body?: any, headers?: Headers, options?: object) => {
  return await fetch(endpoint, {
    method: 'PATCH',
    body: body && JSON.stringify(body),
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...options,
  }).then((response) => {
    return response.json();
  });
};

const download = async (endpoint: string, filename: string, headers?: Headers, options?: object) => {
  return await fetch(endpoint, {
    method: 'GET',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    ...options,
  }).then((response) => {
    const blob = response.blob();
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return response.json();
  });
};

export default {
  get,
  del,
  post,
  patch,
  put,
  download,
};

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

//const API_ROOT = 'https://conduit.productionready.io/api';
//const API_ROOT = 'http://35.200.191.17:4101';
const API_ROOT = 'http://35.200.234.151:8080/gbapi';
//const API_ROOT = 'localhost:4101';

// const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
}

const Auth = {
  current: () =>
    requests.get('/user'),
  login: (mobile, password) =>
    requests.post('/login', { mobile, password }),
  register: (name, mobile, email, password, role) =>
    requests.post('/user/register', { user: { name, mobile, email, password, role } }),
  save: user =>
    requests.put('/user', { user })
};



const Calculator={
  calculateSumAssured:(sumAssuredCalculatorReq) =>
    requests.post('/getSumAssuredAmount',sumAssuredCalculatorReq)
}

// const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
// const omitSlug = article => Object.assign({}, article, { slug: undefined })


export default {
  //Articles,
  Auth,
  Calculator,
  //Comments,
  //Profile,
  //Tags,
  setToken: _token => { token = _token; }
};

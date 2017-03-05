const fetch = require('node-fetch');
const uuidV4 = require('uuid/v4');

const config = require('./config');

function askQuestion(question) {
  const fetchOptions = {
    headers: {
      'Authorization': `Bearer ${config.apiai.accessToken}`,
    }
  };

  const params = {
    lang: config.apiai.lang,
    sessionId: uuidV4(),
    query: question,
  };

  const queryString = Object.keys(params)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  const url = `${config.apiai.endpoint}/query?${queryString}`;

  return fetch(url, fetchOptions).then(res => res.json());
};

module.exports = {
  askQuestion
};

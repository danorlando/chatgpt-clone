const ask = require('./ask');
const messages = require('./messages');
const convos = require('./convos');
const presets = require('./presets');
const prompts = require('./prompts');
const search = require('./search');
const tokenizer = require('./tokenizer');
const auth = require('./auth');
const { router: endpoints } = require('./endpoints');
const { localAuth, googleAuth, facebookAuth } = require('./oauth');

module.exports = {
  search,
  ask,
  messages,
  convos,
  presets,
  prompts,
  auth,
  localAuth,
  googleAuth,
  facebookAuth,
  tokenizer,
  endpoints,
};

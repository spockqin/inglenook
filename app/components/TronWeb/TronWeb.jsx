const TronWeb = require('tronweb');
const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider('https://api.trongrid.io');
const solidityNode = new HttpProvider('https://api.trongrid.io');
const eventServer = 'https://api.trongrid.io/';
const privateKey = 'da14...9f0d0';

export const tronWeb = new TronWeb(
  fullNode,
  solidityNode,
  eventServer,
  privateKey,
);
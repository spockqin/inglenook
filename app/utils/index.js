const contractAddr = 'TKbBcPbi2NNLbMkdkg8rnyu4uD8QSxzmdN';

const utils = {
  tronWeb: false,
  contract: false,

  async setTronWeb(tronWeb) {
    this.tronWeb = tronWeb;
    this.contract = await tronWeb.contract().at(contractAddr);
  },

};

export default utils;
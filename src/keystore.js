const Store = require("electron-store");

const userkeys = new Store({
  name: "keys",
  fileExtension: "crypt",
});

const keychain = new Store({
  name: "keychain",
});

module.exports = { keychain, userkeys };

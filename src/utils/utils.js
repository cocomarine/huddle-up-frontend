const CryptoJS = require("crypto-js");

const encryptEventCode = (text) => {
  if (text) {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
  } else return null;
};

const decryptEventCode = (data) => {
  if (data) {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
  } else return null;
};

module.exports = { encryptEventCode, decryptEventCode };

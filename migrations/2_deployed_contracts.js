/** @format */

// eslint-disable-next-line no-undef
const userauth = artifacts.require("userauth");

module.exports = function (deployer) {
  deployer.deploy(userauth);
};

/** @format */

// eslint-disable-next-line no-undef
const migrations = artifacts.require("migrations");

module.exports = function (deployer) {
  deployer.deploy(migrations);
};

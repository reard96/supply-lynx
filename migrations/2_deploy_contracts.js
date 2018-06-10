const Business = artifacts.require("./Business.sol");

module.exports = function (deployer) {
  deployer.deploy(Business);
};

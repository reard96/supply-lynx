const Business = artifacts.require("./Business.sol");

module.exports = function (deployer) {
  deployer.deploy(Business);
};

// this syntax will allow you to migrate your contracts to the blockchain in the truffle config file, by running truffle migrate

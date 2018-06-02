var Sale = artifacts.require("./Sale.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Sale, accounts[1]);
};

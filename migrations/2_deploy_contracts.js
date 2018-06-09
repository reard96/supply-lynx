<<<<<<< HEAD
var Sale = artifacts.require("./Sale.sol");

module.exports = function(deployer, network, accounts) {
  deployer.deploy(Sale, accounts[1]);
=======
const Business = artifacts.require("./Business.sol");

module.exports = function (deployer) {
  deployer.deploy(Business);
>>>>>>> b48e45698464937ccb2742899c988cb03a781501
};

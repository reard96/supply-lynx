var Business = artifacts.require('./Business.sol');

contract('Business', function (accounts) {
    let business;

    beforeEach('sets up contract for each test', function () {
        return Business.deployed().then(function (instance) {
            business = instance;
        });
    });

    it('has an initial orders count of 0', function () {
        return business.getOrdersCount()
            .then(function (count) {
                assert.equal(count, 0);
            });
    });

    it('makes contract creator the admin', function () {
        return business.admin()
            .then(function (account) {
                assert.equal(account, accounts[0]);
            });
    });
});

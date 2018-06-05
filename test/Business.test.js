var Business = artifacts.require("./Business.sol");

contract('Business', function (accounts) {
    it("has an initial orders count of 0", function () {
        return Business.deployed().then(function (instance) {
            app = instance;
            return app.getOrdersCount();
        }).then(function (count) {
            assert.equal(count, 0);
        });
    });
});

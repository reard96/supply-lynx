pragma solidity ^0.4.2;

contract Business {
    struct Order {
        uint payment;
        uint productId;
        uint quantity;
        uint price;
        string unit;
        string status;
        address buyer;
        address seller;
    }

    Order[] public orders;
    address public admin;

    constructor() public {
        admin = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == admin);
        _;
    }

    function getOrdersCount() public view returns (uint) {
        return orders.length;
    }

    function createBid(uint productId, uint quantity, uint price, string unit) public payable {
        Order memory bid = Order({
            payment: msg.value,
            productId: productId,
            quantity: quantity,
            price: price,
            unit: unit,
            status: "requested",
            buyer: msg.sender,
            seller: 0x0000
        });
        uint id = orders.push(bid) - 1;
    }

    function acceptBid(uint id) public {
        Order storage bid = orders[id];
        require(msg.sender != bid.buyer);
        bid.status = "accepted";
        bid.seller = msg.sender;
    }

    function createQuote(uint productId, uint quantity, uint price, string unit) public {
        Order memory quote = Order({
            payment: 0,
            productId: productId,
            quantity: quantity,
            price: price,
            unit: unit,
            status: "requested",
            buyer: 0x0000,
            seller: msg.sender
        });
        uint id = orders.push(quote) - 1;
    }

    function acceptQuote(uint id) public payable {
        Order storage quote = orders[id];
        require(msg.sender != quote.seller);
        quote.status = "accepted";
        quote.buyer = msg.sender;
        quote.payment = msg.value;
    }

    function completeOrder(uint id) public {
        Order storage order = orders[id];
        order.status = "completed";
        order.seller.transfer(order.payment);
    }

    function cancelOrder(uint id) public {
        Order storage order = orders[id];
        order.status = "cancelled";
        order.buyer.transfer(order.payment);
    }
}

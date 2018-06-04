pragma solidity ^0.4.2;

contract Business {
    event OrderLog (
        uint id,
        uint payment,
        uint productId,
        uint quantity,
        uint price,
        string unit,
        bool requested,
        bool accepted,
        bool completed,
        address buyer,
        address seller
    );

    struct Order {
        uint payment;
        uint productId;
        uint quantity;
        uint price;
        string unit;
        bool requested;
        bool accepted;
        bool completed;
        address buyer;
        address seller;
    }

    Order[] public orders;

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
            requested: true,
            accepted: false,
            completed: false,
            buyer: msg.sender,
            seller: 0x0000
        });
        uint id = orders.push(bid) - 1;
        emit OrderLog(
            id,
            bid.payment,
            bid.productId,
            bid.quantity,
            bid.price,
            bid.unit,
            bid.requested,
            bid.accepted,
            bid.completed,
            bid.buyer,
            bid.seller
        );
    }

    function acceptBid(uint id) public {
        Order storage bid = orders[id];
        require(msg.sender != bid.buyer);
        bid.accepted = true;
        bid.seller = msg.sender;
        emit OrderLog(
            id,
            bid.payment,
            bid.productId,
            bid.quantity,
            bid.price,
            bid.unit,
            bid.requested,
            bid.accepted,
            bid.completed,
            bid.buyer,
            bid.seller
        );
    }

    function createQuote(uint productId, uint quantity, uint price, string unit) public {
        Order memory quote = Order({
            payment: 0,
            productId: productId,
            quantity: quantity,
            price: price,
            unit: unit,
            requested: true,
            accepted: false,
            completed: false,
            buyer: 0x0000,
            seller: msg.sender
        });
        uint id = orders.push(quote) - 1;
        emit OrderLog(
            id,
            quote.payment,
            quote.productId,
            quote.quantity,
            quote.price,
            quote.unit,
            quote.requested,
            quote.accepted,
            quote.completed,
            quote.buyer,
            quote.seller
        );
    }

    function acceptQuote(uint id) public payable {
        Order storage quote = orders[id];
        require(msg.sender != quote.seller);
        quote.accepted = true;
        quote.buyer = msg.sender;
        quote.payment = msg.value;
        emit OrderLog(
            id,
            quote.payment,
            quote.productId,
            quote.quantity,
            quote.price,
            quote.unit,
            quote.requested,
            quote.accepted,
            quote.completed,
            quote.buyer,
            quote.seller
        );
    }

    function completeOrder(uint id) public {
        Order storage order = orders[id];
        order.completed = true;
        order.seller.transfer(order.payment);
        emit OrderLog(
            id,
            order.payment,
            order.productId,
            order.quantity,
            order.price,
            order.unit,
            order.requested,
            order.accepted,
            order.completed,
            order.buyer,
            order.seller
        );
    }
}

pragma solidity ^0.4.11;

contract Sale {
    //Entity's and Consumer's addresses
    address public entity;
    address public customer;

    //Customer details
    struct Consumer {
        address customerAddress;
        string name;
    }

    //Order details
    struct Order {
        string product;
        uint quantity;
        uint price;
        uint orderNumber;
        uint payment
    }

    //mapping to create key-value pairs called 'orders'
    mapping(uint => Order) orders;

    //event triggered by function sendOrder
    event orderSent (address customer string product uint quantity uint price uint orderNumber)

    //event triggered by function sendPayment
    event paymentSent (address customer uint orderNo uint payment uint now)

    //event triggered by function delivery
    event orderDone (address customer uint orderNo uint deliveryDate)

    //Smart Contract's Constructor Function.  Producer deploys contract.
    function Sale(address _consumerAddress) public payable {
        producer = msg.sender;
        customer = _customerAddress
    }

    //Web interface calls this function when user sends order.  Function calls event newOrder and uses payload returned from newOrder.
    function sendOrder(string _product, uint _quantity, uint _price) payable public {   

        //Accept orders only from consumer's address.  Is this 100% necessary?    
        require (msg.sender == customer);

        orderNo++;

        orders[orderNo] = Order(_product, _quantity, _price, orderNo); 

        //Triggers the event newOrder
        orderSent(msg.sender, _product, _quantity, _price, orderNo);
    
    }

    function sendPayment(uint orderNo) payable public {
        
        //Only buyer can make payment
        require(msg.sender == customer);

        //Sets order.payment to equal Ether value sent by customer (in msg global var)
        orders[orderNo].payment = msg.value;

        paymentSent(msg.sender, orderNo, msg.value, now)

    }

    function delivery(uint orderNo) payable public {
        
        //User clicks on button to mark product as being delivered to initiate this function!

        //Stores _order in storage (local vars are stored in 'storage' in Solidity)   
        Order storage _order = orders[orderNo];
        
        //Smart contract releases payment to entity.
        entity.transfer(_order.payment);

        orderDone(customer, orderNo, timestamp);
    }

}

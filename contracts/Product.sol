pragma solidity ^0.4.11;

contract Product {
  struct Offering {
    uint id;
    string name;
    uint quantity;
  }
  
  mapping(uint => Offering) public offerings;

  uint public offeringsCount;

  function Product() public {
    addOffering('Offering 1');
    addOffering('Offering 2');
  }

  function addOffering(string _name) private {
    offeringsCount ++;
    offerings[offeringsCount] = Offering(offeringsCount, _name, 10);
  }

}


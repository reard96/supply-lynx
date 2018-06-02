pragma solidity ^0.4.11;

contract Producer {
  struct Entity {
    uint id;
    string name;
    address entityAddress;
  }
  
  mapping(uint => Entity) public entities;

  uint public entitiesCount;

  function Producer() public {
    addEntity('Entity 1');
    addEntity('Entity 2');
  }

  function addEntity(string _name address _entityAddress) private {
    entitiesCount ++;
    entities[entitiesCount] = Entity(entitiesCount, _name, _entityAddress);
  }

}


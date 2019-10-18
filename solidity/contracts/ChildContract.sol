pragma solidity ^0.5.0;
/**
 * A Contract can create other contracts.
 * Represents an asset such as car, diamond, land-deed ....
 **/


contract  ChildContract {
    // Represents the identifier for some kind of asset

    uint8     public  identity;
    address   public  owner;
    bytes32   public  name;

    modifier  OwnerOnly {if(msg.sender != owner)  revert(); else _;}
    event     ChildOwnerTransfered(uint8 identity, bytes32 from, bytes32 to);

    // Constructor
    constructor(uint8 id, address own, bytes32 nm) public {
      identity = id;
      owner = own;
      name = nm;
    }

    // transfer the ownership
    function  transferOwnership (address newOwner, bytes32 nm) public OwnerOnly {
        bytes32  former = name;
        owner = newOwner;
        name = nm;
        emit ChildOwnerTransfered(identity, former, name);
    }
    // checks if caller is the owner
    function  isOwner(address addr) public view returns(bool) {
        return (addr == owner);
    }
}

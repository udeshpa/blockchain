pragma solidity ^0.5.0;


contract BasicDataType {
  //uint8 x8 = 256; //generates compiler error
  uint8 x8 = 255;

  address owner;
  uint ownerInitialBalance;

  constructor(address addr) public {
    int x256;
    x256 = x8; //Implicit works
    //x8 = 256; //compilation fails
    owner = addr;
    ownerInitialBalance = addr.balance;

    bool flag = true; //uninitialized bool is set to false

    //if(1) { } //compilation error
    uint24 x24 = uint24(x256); //Explicit


  }
}

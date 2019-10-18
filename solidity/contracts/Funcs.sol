pragma solidity ^0.5.0;

contract Funcs {

  string  ownerName;
  uint8   ownerAge;

  // Constructor
  constructor(string memory name, uint8 age) public {
    ownerName = name;
    ownerAge = age;
  }

  // Sets the name
  function  setOwnerInfo(string memory name, uint8 age) public {
    ownerName = name;
    ownerAge = age;
  }

  function secretFunction() private {
    // Not available outside this contract
  }

  function  getOwnerInfo() public returns (string memory name, uint8 age){
    name = ownerName;
    age = ownerAge;
  }


  // Shows that function overloading is supported
  // Returns owner data only if age > greaterThan otherwise all 0s
  // PS: Truffle framework seem to have issues with overloaded functions
  //     Uncommenting this *may* give unexpected test results
  function  getOwnerInfo(uint8 greaterThan) public returns (string memory name, uint8 age){
    if(ownerAge > greaterThan){ 
      name = ownerName;
      age = ownerAge;
    }
  }


  // Shows how multiple values are received from a function call
  function  multiReturnCaller() public returns (string memory n,uint8 a){
    // Create a tuple
    (string memory name, uint8 age) = getOwnerInfo();
  }


  // Get the name
  function  getOwnerName() public returns (string memory) {

    return ownerName;
  }

  // Get the age
  function  getOwnerAge() public returns(uint8 age){
    age = ownerAge;
    //return ownerAge;
  }

}
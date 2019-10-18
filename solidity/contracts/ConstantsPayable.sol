pragma solidity ^0.5.0;

contract ConstantsPayable {

    // MUST initialize storage here
    uint    public  creationTime;
    string  public  lastCaller = "NOTSET";

    address public  lastSender;
    uint    public  lastReceived=0;

    function getBalance() public returns (uint) {
      return address(this).balance;
    }


    // This function will NOT update the lastCaller if declared constant
    // variable's value as it is marked constant
    // Compiler implicitly takes contant as a view function
    function  setLastCaller(string memory name) public {
        lastCaller = name;
    }

    constructor() public {
        // Storage constant initialization NOT allowed
        // in constructor
        creationTime = now;
    }


    // This function can receive ethers
    function receiveEthers(string memory name)   payable public{
        lastSender = msg.sender;
        lastReceived = msg.value;
        lastCaller = name;
    }

   /* function  getBalance() public view returns (uint){
        return this.balance;
    }*/

    // Fallback function
    // This function gets invoked when contract receives ethers
    // without the function data. 
    function() payable external{
        // Max gas that can be spent in this function is 2300
        // msg.value has the number wei received
        // msg.sender has the address of the sender

        // As a BEST practice just log an Event here

        // If you do not want to receive ethers in the contract
        // then throw exception here
        lastReceived = msg.value;
    }
}
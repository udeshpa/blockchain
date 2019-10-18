pragma solidity ^0.5.0;


contract DataLocation {
    uint count; //Storage
    uint[] allPoints; //Storage

  constructor() public {
  }

  function localVariables() public {
      //uint[] localArray; Must provide memory or storage keyword.
      uint[] memory memoryArray;
      uint[] memory pointer = allPoints;
  }

  //All arguments and return values must be in memory
  function defaultAction(uint[] memory args ) public returns(uint[] memory data)  {
    return allPoints;
  }

  function testFunction() public {
    defaultAction(allPoints); //Ok to pass storage variable
    uint[] memory memoryArray;
    defaultAction(memoryArray);
  }

}

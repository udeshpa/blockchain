pragma solidity ^0.5.0;


contract Array {

  //int8[3] arr1 = [1,2,3]; //This will not compile due to type mismatch. By Default each number is uint8.

  int8[3] arr = [int8(1),2,3];

  int[] arry = [1,2,3 ];

  int[3] staticArray = [1,2]; //Third element is 0.

  //int[3] staticArray1 = [1,2,3,4];  //Will not compile

  int8[] dynamicIntArray;
  bool[] dynamicBoolArray;

  byte b = 0x01;
  byte[120] bigarray;//static (fixed size) byte array
  bytes3 fixedByteArray;
  byte[3] fixedByteArray2 = [bytes1(0x01)];
  byte[] byteData; //dynamic byte array
  bytes8 arrayof8bytes; //static byte array
  bytes bytearray; //dynamic byte array
  string stringStorage = "abcde";

  bytes32 x = "ABCD1111111111111111111111111111";

  int[] array = [int(1),2,3]; //This initialization compiles for storage only

  constructor() public {
    dynamicIntArray = [int8(1), 2, 3];
    dynamicBoolArray = new bool[](8);
    //int[] memory array = [int(1),2,3]; //Does not compile for memory, but does for storage
    uint8[] memory memoryArray;
    //memoryArray = [1,2,3]; //memory is not implicitly convertible to expected type uint8[] memory
    memoryArray = new uint8[](8);
    //memoryArray.push(2); // push not available for memory only for storage


    fixedByteArray2 = [byte(0x01), byte(0x01), byte(0x01)];
    fixedByteArray2 = [ bytes1(0x01), 0x02, 0x03];

    //bytes[] memory dynamicArray;
    //bytes32  array1 = "somestring";
    //string memory data = string(array1); //does not compile

    string memory xyz = "abc";


  }

  function conversionTest() public returns (string memory) {

    bytes memory hello = "hello";
    string memory converted = string(hello);
    return converted;
  }

  function getElementAt(uint index) public returns(byte) {

        bytes memory bytesData = bytes(stringStorage);
        byte element = bytesData[index];
        return element;
  }

  function getUintOfByte() public returns (string memory) {
     return bytes32ToString(x);
  }

  function bytes32ToString(bytes32 y) public returns (string memory) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    for (uint j = 0; j < 32; j++) {
        byte char = byte(bytes32(uint(y) * 2 ** (8 * j)));
        if (char != 0) {
            bytesString[charCount] = char;
            charCount++;
        }
    }
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (uint j = 0; j < charCount; j++) {
        bytesStringTrimmed[j] = bytesString[j];
    }
    return string(bytesStringTrimmed);
  }
}

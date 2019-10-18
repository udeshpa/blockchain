pragma solidity ^0.5.0;

// Utilities for contracts
contract UtilContract {

  // Concatenates strings
  // Perfect example of a "pure" function - no reference to any storage
  function  concatenate(string memory s1, string memory s2) public pure returns(string memory) {

    bytes memory a = bytes(s1);
    bytes memory b = bytes(s2);
    string memory concat = new string(a.length+b.length);
    bytes  memory bm = bytes(concat);
    uint k = 0;

    for (uint i = 0; i < a.length; i++) {
      bm[k++] = a[i];
    }

    for (uint i = 0; i < b.length; i++) {
      bm[k++] = b[i];
    }

    return string(bm);
  }
}
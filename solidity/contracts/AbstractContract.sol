pragma solidity ^0.5.0;

// Sample of a abstract contract
// ObjectOrientation contract inherits from this


contract  AbstractContract {

  struct AgentStruct {
    string   name;
    uint     commission;
  }


  AgentStruct    agent;

  // constructor
  constructor (string memory name) public {
    agent.name = name;
  }

  // Abstract - no body for the function
  function  calculateAgentCommission(uint16 saleAmount) public;

  // Get the agent information
  function  getAgentInformation() public view returns (string memory name, uint commission) {
    name = agent.name;
    commission = agent.commission;
  }
}
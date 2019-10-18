var Calculator = artifacts.require("./Calculator.sol");
var CalculatorV2 = artifacts.require("./CalculatorV2.sol");
var ArrayTest = artifacts.require("./Array.sol");
var Funcs = artifacts.require("./Funcs.sol");
var Globals = artifacts.require("./Globals.sol");
var MappingEnumStruct = artifacts.require("./MappingEnumStruct.sol");
var FuncTypes = artifacts.require("./FuncTypes.sol");
var FuncTypesCaller = artifacts.require("./FuncTypesCaller.sol");
var ConstantsPayable = artifacts.require("./ConstantsPayable.sol");
var Modifiers = artifacts.require("./Modifiers.sol");
var Events = artifacts.require("./Events.sol");
var SelfDestruct = artifacts.require("./SelfDestruct.sol");
var ContractFactory = artifacts.require("./ContractFactory.sol");
var NameRegistry = artifacts.require("./NameRegistry.sol");
var UserAddressRegistry = artifacts.require("./UserAddressRegistry.sol");
var WithdrawalContract = artifacts.require("./WithdrawalContract.sol");


module.exports = function(deployer) {
  // #2 Deploy the instance of the contract
  deployer.deploy(Calculator);//, 10);
  deployer.deploy(CalculatorV2, 10);
  deployer.deploy(ArrayTest);
  deployer.deploy(Funcs, "Nelson", 20);
  deployer.deploy(Globals);
  deployer.deploy(MappingEnumStruct);
  deployer.deploy(FuncTypes);
  deployer.deploy(FuncTypesCaller);
  deployer.deploy(ConstantsPayable);
  deployer.deploy(Modifiers);
  deployer.deploy(Events);
  deployer.deploy(SelfDestruct);
  deployer.deploy(ContractFactory, 5, 10);
  deployer.deploy(NameRegistry);
  deployer.deploy(UserAddressRegistry);
  deployer.deploy(WithdrawalContract);

};
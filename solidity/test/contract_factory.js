var ContractFactory = artifacts.require("./ContractFactory.sol");

var ChildContract = artifacts.require("./ChildContract.sol");

contract('ContractFactory', function(accounts) {
  it("should assert true", function() {
    var contractFactory;
    var childContract;
    return ContractFactory.deployed().then(function(instance){
        contractFactory = instance;
      // lets transfer ownership
      contractFactory.purchase(web3.utils.fromAscii("John Wayne"),{value:100, from:accounts[1]});
      contractFactory.purchase(web3.utils.fromAscii("Cindy Smith"),{value:100, from:accounts[2]});
    }).then(async function(result){
      await printOwners(contractFactory);
      // get the child contract address for John Wayne i.e., index=0
      return contractFactory.getChildContractAddress.call(0);
    }).then(async function(result){
      console.log("John Wayne - Asset Address=", result);
      childContract = await ChildContract.at(result);
      return childContract.transferOwnership(accounts[3],web3.utils.fromAscii("Jake Crown"),{from:accounts[1]});
    }).then(async function(result){
      await printOwners(contractFactory);

      // John Wayne tries to sell the asset again
      //return childContract.transferOwnership(accounts[3],"Sue Kenworth",{from:accounts[1]});
    });
  });
});

async function  printOwners(contractFactory){

    // var ctr = 0;

    for(i=0; i < 5; i++){

      var result =  await contractFactory.getInfo(i);
      var name = web3.utils.toAscii(result[2]);
      name = name.replace(/\0/g, '');
      console.log(result[0].toString(), '---', result[1],'----' , name);
    }
}
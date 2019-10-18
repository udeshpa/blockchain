var Globals = artifacts.require("./Globals.sol");

const PREFIX = "Returned error: VM Exception while processing transaction: ";
async function tryCatch(promise, errType) {
  try {
      await promise;
      throw null;
  }
  catch (error) {
      assert(error, "Expected an error but did not get one");
      assert(error.message.startsWith(PREFIX + errType), "Expected an error starting with '" + PREFIX + errType + "' but got '" + error.message + "' instead");
  }
};

contract('Globals', function(accounts) {

  it("should assert true", function() {
    var globals;
    return Globals.deployed().then(function(instance){
        console.log("deployed");

      globals = instance;
      return globals.etherUnitsTest.call();
    }).then(function(result){
      console.log("etherUnitsTest() received bool=",result);
      return globals.timeUnitsTest.call();
    }).then(function(result){
      var curTime = Math.floor((new Date().getTime())/1000);
      console.log("timeUnitsTest() = ", result.toNumber()," Local time = ",curTime);
      // Time after 1 days - Enum index for day unit = 2
      return globals.calculateFutureTime.call(1,0)
    }).then(function(result){
      // Create the date - time received in second need to be converted to millisec
      var dt = new Date(result.toNumber()*1000);
      //console.log("Current time = ",Math.floor((new Date().getTime())/1000));
      console.log("calculateFutureTime() = ",dt," Result = ", result.toNumber());
      return globals.getBlockInformation.call();
    }).then(function(result){
      console.log("block.number=",result[0].toNumber()," block.hash=",result[1]);
      console.log("Miner coinbase = ", result[2], " difficulty = ",result[3].toNumber());
      return globals.getMsgInformation.call();
    }).then(async function(result){
      console.log("data = ",result[0]," sig = ",result[1]);
      console.log("sender = ",result[2]);

      // Using empty string as arg will throw an exception in the contract
      await tryCatch(globals.revertBehavior(""), 'revert');
      return globals.revertBehavior("John Smith");
    }).then(function(result){
      // Result = txn receipt
      // console.log(result);
      return globals.lastCaller.call();
    }).then(function(result){
      console.log("lastCaller = ",result);
      return globals.callCrypto.call("ABCDE");
    }).then(function(result){
      console.log("keccak256 = ",result[0]);
      console.log("sha3      = ",result[1]);
      console.log("sha256    = ",result[2]);
      console.log("packed sha3 = ",result[3]);
      console.log("ripemd160   = ",result[4]);
    });
  });
});


var UserAddressRegistry = artifacts.require("./UserAddressRegistry.sol");

contract('UserAddressRegistry', function(accounts) {
  it("should assert true", function() {
    var addressRegistry;

    return UserAddressRegistry.deployed().then(function(instance){
      addressRegistry = instance;
      
      addressRegistry.registerName(web3.utils.fromAscii("Cindy Smith"),{from:accounts[2]});
      addressRegistry.registerName(web3.utils.fromAscii("George Clooney"),{from:accounts[1]});
      addressRegistry.registerName(web3.utils.fromAscii("Jackie Chen"),{from:accounts[0]});
      
      return addressRegistry.count.call();

    }).then(function(result){
      console.log("Count=", result.toNumber());
      addressRegistry.updateName(accounts[2],web3.utils.fromAscii("Cindy Only"),{from:accounts[0]});
      
      printNames(addressRegistry, result.toNumber())
      // Lets delete George
      addressRegistry.registerName(web3.utils.fromAscii(""),{from:accounts[1]});
      return addressRegistry.count.call();
    }).then(function(result){
      console.log(result)
      // Should have deleted George Clooney
      printNames(addressRegistry, result.toNumber())

      // Delete Cindy
      addressRegistry.deleteName(accounts[2], {from:accounts[0]});

      return addressRegistry.count.call();
      
    }).then(function(result){
      // Should print only Jackie Chen
      printNames(addressRegistry, result.toNumber())
    });
  });
});

function  printNames(addressRegistry, count){
    // var ctr = 0;
    for(i=0; i < count; i++){
        addressRegistry.getByIndex.call(i).then( function(result){
          var name = web3.utils.toAscii(result[1]);
          name = name.replace(/\0/g, '');
          console.log(result[0],'----',name,'---', new Date(result[2].toNumber()*1000));
        });
    }
}
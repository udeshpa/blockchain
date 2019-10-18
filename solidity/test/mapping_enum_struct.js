// This test may not work against EVM as the addCaptial are invoked as txn
// MUST be mined before data will become available. Try in TestRPC only
var MappingEnumStruct = artifacts.require("./MappingEnumStruct.sol");

contract('MappingEnumStruct', function(accounts) {
  it("should return capital of Egypt & then Blank", function() {
    var mapping_enum_struct;
    return MappingEnumStruct.deployed().then(function(instance){
      mapping_enum_struct = instance;
      // Add some sample data
      mapping_enum_struct.addCapital("Egypt", "Cairo");
      mapping_enum_struct.addCapital("America", "Washington DC");
      return mapping_enum_struct.addCapital("Australia", "Sydney");
    }).then(function(){
      return mapping_enum_struct.getCapital.call("Egypt");
    }).then(function(result){
      console.log("Capital of Egypt: ", result);
      assert.isTrue(result === "Cairo");
      // remove the capital of Egypt
      mapping_enum_struct.removeCapital("Egypt");
      return mapping_enum_struct.getCapital.call("Egypt");
    }).then(function(result){
      console.log("Capital of Egypt: ", result);
      assert.isTrue(result === "");
    });
  });
});

contract('MappingEnumStruct', function(accounts) {
  it("should assert true", function() {
    var mapping_enum_struct;
    return MappingEnumStruct.deployed().then(function(instance){
      mapping_enum_struct = instance;
      // Get the enum continent/value at index = 0
      return mapping_enum_struct.getContinent.call(0);
    }).then(function(result){
      console.log("Continent at index=", 0, "is: ",result);
      assert.isTrue(result === "Africa");
      return mapping_enum_struct.getContinent.call(4);
    }).then(function(result){
      console.log("Continent at index=", 4, "is: ",result);
      assert.isTrue(result === "Europe");
    });
  });
});

contract('struct', function(accounts) {
  it("should assert true", function() {
    var mapping_enum_struct;
    return MappingEnumStruct.deployed().then(function(instance){
      mapping_enum_struct = instance;
      // Add a few countries
      //mapping_enum_struct.addEuropeanCountry("France",4,65);
      mapping_enum_struct.addEuropeanCountry(web3.utils.utf8ToHex("Russia"),4,144);
      mapping_enum_struct.addEuropeanCountry(web3.utils.utf8ToHex("Poland"),4,39);
      // Asia @ index 2 in the enum continents
      mapping_enum_struct.addEuropeanCountry(web3.utils.utf8ToHex("Singapore"),2,5);

      // Get the country data for Russia
      return mapping_enum_struct.getEuropeanCountry.call(web3.utils.utf8ToHex("Russia"));
    }).then(function(result){
      var name = web3.utils.toAscii(result[0]);
      // Remove \u0000 characters - Use the regular expression with replace
      name = name.replace(/\0/g, ''); 
      console.log("Country: ",name,
                  " Continent: ", result[1].toNumber(),
                  " Population (Mil): ", result[2].toNumber());   
      assert.equal("Russia",name,"name should be Russia");
      return mapping_enum_struct.getEuropeanCountry.call(web3.utils.utf8ToHex("Singapore"));
    }).then(function(result){
      assert.equal(result[0], '0x0000000000000000000000000000000000000000000000000000000000000000',
                   "should be all 0x000... !!");
    });
  });
});
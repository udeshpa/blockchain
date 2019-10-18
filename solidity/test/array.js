var Array = artifacts.require("Array");

contract("Array", function(_accounts) {
  it("should assert true", function(done) {
    Array.deployed();
    assert.isTrue(true);
    done();
  });

  it("should assert true", function(done) {
    var arraytest;
    Array.deployed().then(function(inst) {
        arraytest = inst;
        return inst.conversionTest.call();
    }).then(function(result){
        console.log('conversionTest', result);
        return arraytest.getElementAt.call(1);
    }).then(function(result) {
        console.log('getElementAt', result, web3.utils.toAscii(result));
        assert.equal(result, '0x62', "Unexpected Result");
        return arraytest.getUintOfByte.call();
    }).then(function(result) {
      console.log('getUintOfByte', result);
      done();
    });
  });

});

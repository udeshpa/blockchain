var Calculator = artifacts.require("Calculator");

contract("Calculator", function(_accounts) {
  it("should assert true", function(done) {
    Calculator.deployed();
    assert.isTrue(true);
    done();
  });


  it("should assert true", function() {
    var calculator;
    return Calculator.deployed().then(function(instance){
      calculator = instance;
      return calculator.getResult.call();
    }).then(function (result) {
      assert.equal(result.valueOf(), 10, "Contract initialized with value NOT equal to 10!!!");
    });
  });

  it("should add 10 and then substract 5 to get a result=15", function () {
    // Get the deployed instance
    var calculator;
    
    return Calculator.deployed().then(function(instance){
      calculator = instance;
      return calculator.addToNumber(10)
    }).then(function () {
      return calculator.getResult.call();
    }).then(function (result) {

      assert.equal(result.toNumber(), 20, "Result after adding 10 should be 20");
      // Now substract 10
      return calculator.subtractFromNumber(5)
    }).then(function () {
      return calculator.getResult.call();
    }).then(function (result) {
      assert.equal(result.toNumber(), 15, "Result after subtracting 5 should be 15");
    });
  });
});

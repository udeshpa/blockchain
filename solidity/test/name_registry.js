var NameRegistry = artifacts.require("NameRegistry");

contract("NameRegistry", function(_accounts) {
  it("should assert true", function(done) {
    NameRegistry.deployed();
    assert.isTrue(true);
    done();
  });
});

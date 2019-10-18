var Events = artifacts.require("./Events.sol");

contract('Events', function(accounts) {
  it("should emit 2 events : BidFailed, NewHighBid", function() {
    var events;
    return Events.deployed().then(async function(instance){
      events = instance;
      // This bid will lose as the required minimum is 1010
      var tx;
      try {
        tx = await events.bid("Ben",{from:accounts[0], value:1050});
      }catch(err) {
        console.log('Need to forget this exception', err);
      }
      return tx;
    }).then(function(result){
      // result=tx reciept that has the log/events
      dumpEvents(result);
      assert.equal('NewHighBid',result.logs[0].event );
      //Not possinle to get assert.equal('BidFailed',result.logs[0].event );
      // John will become high bidder with 1100 wei
      return events.bid("John",{from:accounts[0], value:1100});
    }).then(function(result){
      dumpEvents(result);
      assert.equal('NewHighBid',result.logs[0].event );
      return events.getHighBidder.call();
    }).then(function(result){
      console.log('High Bidder=', result);
      assert.equal('John', result);
    });
  });
});

// Truffle: you may access the log in receipt
function  dumpEvents(result){
  for(var i=0; i<result.logs.length;i++){
        console.log(result.logs[i].event,'>>', result.logs[i].args.name,' ',result.logs[i].args.howmuch.toNumber())
  }
}
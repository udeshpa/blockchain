/**
 * Tests the contract SelfDestruct
 */
var SelfDestruct = artifacts.require("./SelfDestruct.sol");

module.exports = function(callback) {

    console.log('here1');

    var  selfDestruct;
    //1. Get the deployed contract instance
    return SelfDestruct.deployed().then(function(instance){
        console.log('here2');
        selfDestruct = instance;
        //2. Set the value
        selfDestruct.setValue("Some Value");
        //3. Get the value
        return selfDestruct.someValue.call();
    }).then(async function(result){
        //4. Print the received value to console
        console.log("Value=", result, selfDestruct.address, web3.utils.isAddress(selfDestruct.address), await web3.eth.getCode(selfDestruct.address));
        //5. Call kill
        return selfDestruct.killContract();
    }).then(async function(result){
        console.log("Contract Destroyed", await web3.eth.getCode(selfDestruct.address));
        // This call will throw an excepion as contract is destroyed
        selfDestruct.setValue("NEW Value");
    });
}


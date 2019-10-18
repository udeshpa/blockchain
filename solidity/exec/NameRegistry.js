/**
 * Tests the name registry contract
 */
var NameRegistry = artifacts.require("./NameRegistry.sol");

module.exports = function (callback) {

    var nameRegistry;
    NameRegistry.deployed().then(async function (instance) {
        nameRegistry = instance;

        //1. Add version 1 of contracts
        await nameRegistry.registerName(web3.utils.fromAscii("CheckingAccountFactory"),generateRandomAddress(), 1);
        await nameRegistry.registerName(web3.utils.fromAscii("SavingAccountFactory"), generateRandomAddress(), 1);

        //2. Print the names & information on console
        await printRegistry(nameRegistry);

        //3. Update to version 2 - update the address for the contract
        return nameRegistry.registerName(web3.utils.fromAscii("CheckingAccountFactory"), generateRandomAddress(), 2);
    }).then(async function(result){
        //4. Print the names & information on console
        await printRegistry(nameRegistry);
        callback();
    });
}

async function printRegistry(nameRegistry) {

    var result = await nameRegistry.getContractInfo(web3.utils.fromAscii("CheckingAccountFactory"));

    console.log("CheckingAccountFactory", result[0],' version=', result[1].toNumber());
    result = await nameRegistry.getContractInfo(web3.utils.fromAscii("SavingAccountFactory"));
    // console.log(result)
    console.log("SavingAccountFactory", result[0],' version=', result[1].toNumber());
    console.log('------------------------------------------');
}

// For testing this function generates random 20 byte strings
function generateRandomAddress() {
    var text = "";
    var possible = "0123456789abcde0123456789abcde0123456789abcde0123456789abcde";

    for (var i = 0; i < 40; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return '0x'+text;
}
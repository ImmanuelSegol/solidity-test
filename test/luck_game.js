const Web3 = require("web3");

const LuckGame = artifacts.require("LuckGame");

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("LuckGame", function (accounts) {
  it("should assert true", async function () {
    const ERROR_MSG = "participant must add enough funds.";
    const contract = await LuckGame.deployed();

    const address = accounts[0];
    const balance = await web3.eth.getBalance(address)

    await contract.joinGame("3", address).should.be.rejectedWith(ERROR_MSG);;
  });
});

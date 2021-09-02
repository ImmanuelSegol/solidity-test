const { assert } = require('chai');
const BigNumber = require('bignumber.js');
const Web3 = require("web3");

const LuckGame = artifacts.require("LuckGame");

const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'));

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("LuckGame", function (accounts) {
  it("should not be able to joinGame without enough funds", async function () {
    const ERROR_MSG = "Error: Returned error: VM Exception while processing transaction: revert participant must add enough funds. -- Reason given: participant must add enough funds..";
    const contract = await LuckGame.deployed();

  
    const account = await web3.eth.accounts.create();
    const balance = await web3.eth.getBalance(account.address);

    assert.equal(balance, 0);

    try {
      await contract.joinGame("3", account.address);
      assert.fail('Exception not thrown, should fail on: participant must add enough funds');
    } catch (error) {
      assert.equal(error, ERROR_MSG);
    }
  });

  it("first player should win if number is even", async function () {
    const contract = await LuckGame.deployed();

    const player1 = accounts[1];
    const player2 = accounts[2];
    const player1LuckNumber = 3;
    const player2LuckyNumber = 1;
    const initialPlayer1Balance = new BigNumber(await web3.eth.getBalance(player1));
    const initialPlayer2Balance = new BigNumber(await web3.eth.getBalance(player2));

    await contract.joinGame(player1LuckNumber, player1,  {value: web3.utils.toWei("2", 'ether')});
    await contract.joinGame(player2LuckyNumber, player2,  {value: web3.utils.toWei("2", 'ether')});

    const finalPlayer1Balance = new BigNumber(await web3.eth.getBalance(player1));
    const finalPlayer2Balance = new BigNumber(await web3.eth.getBalance(player2));

    
    assert.isAbove(finalPlayer1Balance.toNumber(), initialPlayer1Balance.toNumber());
    assert.isAbove(finalPlayer1Balance.toNumber(), finalPlayer2Balance.toNumber());
  });
});

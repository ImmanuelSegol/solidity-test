const LuckGame = artifacts.require('LuckGame');
 
module.exports = function(deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(LuckGame);
};
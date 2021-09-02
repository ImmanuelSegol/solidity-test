// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract LuckGame {
  struct Participant {
        address payable payoutAddress; 
        uint luckyNumber;
    }

  Participant[2] private participants;
  uint8 private count = 0; 

  constructor() {
        
  }

  modifier checkParticipantsBalace {
        require(
            msg.value == 1 ether,
            "participant must add enough funds."
        );
        _;
    }

  function joinGame(uint luckyNumber, address payable payoutAddress) payable public checkParticipantsBalace {
        participants[count] = Participant(payoutAddress, luckyNumber);
        count++;
        if (count == 2) endGame();
  }

  function endGame() private {
    uint sumOfNumbers = participants[0].luckyNumber + participants[1].luckyNumber;
    address payable winnersAddress =  participants[sumOfNumbers%2].payoutAddress;
    winnersAddress.transfer(address(this).balance);

       // clean up
        delete participants;
        count = 0;
  }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;


contract Person {

    string private _name = "test";

    constructor() {
        
    }
    
    /**
     * @dev Returns the person's name
     */
    function name() public view returns (string memory) {
        return _name;
    }
}

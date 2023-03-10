// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    uint256 _value;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "permission denied");
        _;
    }

    function get() public view returns(uint256) {
        return _value;
    }

    function add(uint256 x) public onlyOwner {
        _value += x;
    }

    function reset() public onlyOwner {
        _value = 0;
    }

    function count() public onlyOwner {
        _value += 1;
    }
}

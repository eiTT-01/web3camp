// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Counter {
    uint256 _value;

    function get() public view returns(uint256) {
        return _value;
    }

    function add(uint256 x) public {
        _value += x;
    }

    function reset() public {
        _value = 0;
    }
}

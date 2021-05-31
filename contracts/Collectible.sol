// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Tangible.sol";

// potatoes

contract Collectible {
    string public uri;
    uint256 private index;
    Tangible parentContract;

    constructor(
        Tangible _parentContract,
        uint256 _index,
        string memory _uri
    ) public {
        parentContract = _parentContract;
        index = _index;
        uri = _uri;
    }

    fallback() external payable {}
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PolyToken
 * @dev ERC20 reward token for PolyThreads platform
 */
contract PolyToken is ERC20, Ownable {
    mapping(address => bool) public minters;

    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);

    constructor() ERC20("PolyThreads Token", "PTT") Ownable(msg.sender) {
        // Mint initial supply to owner
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    modifier onlyMinter() {
        require(minters[msg.sender] || msg.sender == owner(), "Not authorized to mint");
        _;
    }

    /**
     * @dev Add a minter address (typically the Rewards contract)
     */
    function addMinter(address minter) external onlyOwner {
        minters[minter] = true;
        emit MinterAdded(minter);
    }

    /**
     * @dev Remove a minter address
     */
    function removeMinter(address minter) external onlyOwner {
        minters[minter] = false;
        emit MinterRemoved(minter);
    }

    /**
     * @dev Mint tokens to a user (only callable by authorized minters)
     */
    function mint(address to, uint256 amount) external onlyMinter {
        _mint(to, amount);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./PolyToken.sol";

/**
 * @title Rewards
 * @dev Handles automatic token rewards for user actions
 */
contract Rewards is Ownable {
    PolyToken public token;
    
    uint256 public postReward = 5 * 10 ** 18; // 5 PTT tokens
    uint256 public likeReward = 1 * 10 ** 18; // 1 PTT token

    event RewardIssued(address indexed user, uint256 amount, string reason);

    constructor(address tokenAddress) Ownable(msg.sender) {
        token = PolyToken(tokenAddress);
    }

    /**
     * @dev Update reward amounts
     */
    function setRewards(uint256 _postReward, uint256 _likeReward) external onlyOwner {
        postReward = _postReward;
        likeReward = _likeReward;
    }

    /**
     * @dev Called when a post is created
     */
    function onPostCreated(address user) external {
        token.mint(user, postReward);
        emit RewardIssued(user, postReward, "post_created");
    }

    /**
     * @dev Called when a post receives a like
     */
    function onPostLiked(address postOwner) external {
        token.mint(postOwner, likeReward);
        emit RewardIssued(postOwner, likeReward, "post_liked");
    }
}

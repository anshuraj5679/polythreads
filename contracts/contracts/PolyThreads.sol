// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title PolyThreads
 * @dev Main contract for storing post metadata on Polygon Amoy
 */
contract PolyThreads is Ownable {
    struct Post {
        address user;
        string ipfsHash;
        uint256 timestamp;
        uint256 parentId;
        uint256 likes;
    }

    mapping(uint256 => Post) public posts;
    mapping(uint256 => mapping(address => bool)) public hasLiked;
    uint256 public postCount;

    address public rewardsContract;

    event PostCreated(uint256 indexed postId, address indexed user, string ipfsHash, uint256 parentId);
    event PostLiked(uint256 indexed postId, address indexed user);

    constructor() Ownable(msg.sender) {
        postCount = 0;
    }

    function setRewardsContract(address _rewardsContract) external onlyOwner {
        rewardsContract = _rewardsContract;
    }

    /**
     * @dev Create a new post
     * @param ipfsHash IPFS hash of the post content
     * @param parentId Parent post ID (0 for root posts)
     */
    function createPost(string memory ipfsHash, uint256 parentId) external returns (uint256) {
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");
        
        postCount++;
        posts[postCount] = Post({
            user: msg.sender,
            ipfsHash: ipfsHash,
            timestamp: block.timestamp,
            parentId: parentId,
            likes: 0
        });

        emit PostCreated(postCount, msg.sender, ipfsHash, parentId);

        // Notify rewards contract
        if (rewardsContract != address(0)) {
            (bool success, ) = rewardsContract.call(
                abi.encodeWithSignature("onPostCreated(address)", msg.sender)
            );
            require(success, "Reward notification failed");
        }

        return postCount;
    }

    /**
     * @dev Like a post
     * @param postId ID of the post to like
     */
    function likePost(uint256 postId) external {
        require(postId > 0 && postId <= postCount, "Invalid post ID");
        require(!hasLiked[postId][msg.sender], "Already liked");

        hasLiked[postId][msg.sender] = true;
        posts[postId].likes++;

        emit PostLiked(postId, msg.sender);

        // Notify rewards contract
        if (rewardsContract != address(0)) {
            address postOwner = posts[postId].user;
            (bool success, ) = rewardsContract.call(
                abi.encodeWithSignature("onPostLiked(address)", postOwner)
            );
            require(success, "Reward notification failed");
        }
    }

    /**
     * @dev Get post details
     * @param postId ID of the post
     */
    function getPost(uint256 postId) external view returns (
        address user,
        string memory ipfsHash,
        uint256 timestamp,
        uint256 parentId,
        uint256 likes
    ) {
        require(postId > 0 && postId <= postCount, "Invalid post ID");
        Post memory post = posts[postId];
        return (post.user, post.ipfsHash, post.timestamp, post.parentId, post.likes);
    }

    /**
     * @dev Check if user has liked a post
     */
    function userHasLiked(uint256 postId, address user) external view returns (bool) {
        return hasLiked[postId][user];
    }
}

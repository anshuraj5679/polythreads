export const POLYTHREADS_ABI = [
  "function createPost(string memory ipfsHash, uint256 parentId) external returns (uint256)",
  "function likePost(uint256 postId) external",
  "function getPost(uint256 postId) external view returns (address user, string memory ipfsHash, uint256 timestamp, uint256 parentId, uint256 likes)",
  "function postCount() external view returns (uint256)",
  "function userHasLiked(uint256 postId, address user) external view returns (bool)",
] as const;

export const POLYTOKEN_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function symbol() external view returns (string)",
  "function decimals() external view returns (uint8)",
] as const;

export const REWARDS_ABI = [
  "function postReward() external view returns (uint256)",
  "function likeReward() external view returns (uint256)",
] as const;

export const POLYTHREADS_ADDRESS = process.env.NEXT_PUBLIC_POLYTHREADS_CONTRACT as `0x${string}`;
export const POLYTOKEN_ADDRESS = process.env.NEXT_PUBLIC_POLYTOKEN_CONTRACT as `0x${string}`;
export const REWARDS_ADDRESS = process.env.NEXT_PUBLIC_REWARDS_CONTRACT as `0x${string}`;

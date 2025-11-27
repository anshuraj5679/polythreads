const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying PolyThreads contracts to Polygon Amoy...\n");

  // Deploy PolyToken
  console.log("📝 Deploying PolyToken...");
  const PolyToken = await hre.ethers.getContractFactory("PolyToken");
  const polyToken = await PolyToken.deploy();
  await polyToken.waitForDeployment();
  const tokenAddress = await polyToken.getAddress();
  console.log("✅ PolyToken deployed to:", tokenAddress);

  // Deploy Rewards
  console.log("\n📝 Deploying Rewards...");
  const Rewards = await hre.ethers.getContractFactory("Rewards");
  const rewards = await Rewards.deploy(tokenAddress);
  await rewards.waitForDeployment();
  const rewardsAddress = await rewards.getAddress();
  console.log("✅ Rewards deployed to:", rewardsAddress);

  // Deploy PolyThreads
  console.log("\n📝 Deploying PolyThreads...");
  const PolyThreads = await hre.ethers.getContractFactory("PolyThreads");
  const polyThreads = await PolyThreads.deploy();
  await polyThreads.waitForDeployment();
  const polyThreadsAddress = await polyThreads.getAddress();
  console.log("✅ PolyThreads deployed to:", polyThreadsAddress);

  // Setup connections
  console.log("\n🔗 Setting up contract connections...");
  
  // Add Rewards as minter for PolyToken
  await polyToken.addMinter(rewardsAddress);
  console.log("✅ Rewards contract added as minter");

  // Set Rewards contract in PolyThreads
  await polyThreads.setRewardsContract(rewardsAddress);
  console.log("✅ Rewards contract linked to PolyThreads");

  console.log("\n🎉 Deployment complete!\n");
  console.log("📋 Contract Addresses:");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("PolyToken:    ", tokenAddress);
  console.log("Rewards:      ", rewardsAddress);
  console.log("PolyThreads:  ", polyThreadsAddress);
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
  console.log("📝 Add these to your .env file:");
  console.log(`NEXT_PUBLIC_POLYTOKEN_CONTRACT=${tokenAddress}`);
  console.log(`NEXT_PUBLIC_REWARDS_CONTRACT=${rewardsAddress}`);
  console.log(`NEXT_PUBLIC_POLYTHREADS_CONTRACT=${polyThreadsAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

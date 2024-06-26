import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // Get the deployed contract to interact with it after deploying.
  const usdcAddr = await (await hre.ethers.getContract<Contract>("USDC", deployer)).getAddress();

  const attestationRegistryAddr = await (
    await hre.ethers.getContract<Contract>("AttestationRegistry", deployer)
  ).getAddress();

  // remember to await for getAddress() on usdc
  await deploy("MerkleTreeAttestor", {
    from: deployer,
    // Contract constructor arguments
    args: [
      attestationRegistryAddr,
      usdcAddr,
      1000000,
      "0x3fd0f248e71ec3b5269842a46a4f850d5d77f27efcb98d23635a353b7004ffbd",
    ],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["MerkleTreeAttestor"];

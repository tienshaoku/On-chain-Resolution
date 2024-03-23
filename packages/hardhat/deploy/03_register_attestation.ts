import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const register: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();

  const merkleTreeAttestorAddr = await (
    await hre.ethers.getContract<Contract>("MerkleTreeAttestor", deployer)
  ).getAddress();

  // Get the deployed contract to interact with it after deploying.
  const attestationRegistry = await hre.ethers.getContract<Contract>("AttestationRegistry", deployer);

  await attestationRegistry.register(
    merkleTreeAttestorAddr,
    100,
    100,
    100,
    "Quit Twitter in 3 weeks!",
    "ShitcoinTraderJoe",
  );

  await attestationRegistry.register(
    "0x0000000000000000000000000000000000000001",
    100,
    100,
    100,
    "Donate to EF for no reason",
    "FinaciallyFreeAlice",
  );
};

export default register;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
register.tags = ["MerkleTreeAttestor"];

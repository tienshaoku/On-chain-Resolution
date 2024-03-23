//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IAttestationStruct } from "../interface/IAttestationStruct.sol";
import { AttestationRegistry } from "./AttestationRegistry.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract MerkleTreeAttestor {
	uint256 attestationId;
	address attestationRegistry;
	address erc20;
	uint256 downPayment;
	uint256 totalDeposit;
	bytes32 merkleRoot;

	mapping(address => User) public userMap;

	struct User {
		address addr;
		uint256 amount;
		bool result;
	}

	constructor(
		address attestationRegistryArg,
		address erc20Arg,
		uint256 downPaymentArg,
		bytes32 merkleRootArg
	) {
		attestationRegistry = attestationRegistryArg;
		erc20 = erc20Arg;
		downPayment = downPaymentArg;
		merkleRoot = merkleRootArg;
	}

	function signUp() public {
		IAttestationStruct.Attestation memory attestation = AttestationRegistry(
			attestationRegistry
		).getAttestationById(attestationId);
		require(
			block.timestamp >= attestation.registration &&
				block.timestamp <= attestation.start
		);
		address userAddr = msg.sender;
		require(
			IERC20(erc20).transferFrom(userAddr, address(this), downPayment),
			"Transfer failed"
		);

		totalDeposit += downPayment;
		userMap[userAddr] = User(userAddr, downPayment, false);
	}

	function attest(
		address attestee,
		bytes32[] memory proof,
		bytes32 leaf
	) public {
		require(merkleRoot != bytes32(0));
		bool result = MerkleProof.verify(proof, merkleRoot, leaf);
		if (result) userMap[attestee].result = true;
	}

	function updateCurrentAttestationId(uint256 id) public {
		attestationId = id;
	}

	function generateLeafHash(
		address from,
		uint256 amount
	) external pure returns (bytes32) {
		return keccak256(bytes.concat(keccak256(abi.encode(from, amount))));
	}
}

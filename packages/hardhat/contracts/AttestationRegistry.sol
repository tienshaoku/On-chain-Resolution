//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

import { IAttestationStruct } from "../interface/IAttestationStruct.sol";

contract AttestationRegistry {
	IAttestationStruct.Attestation[] public attestationArray;
	mapping(address => IAttestationStruct.Attestation) attestationCreatorMap;

	function register(
		address attestor,
		uint256 registration,
		uint256 start,
		uint256 end,
		uint256 challengeTime,
		string memory description
	) public {
		require(attestor != address(0) && challengeTime >= end);
		address creator = msg.sender;
		IAttestationStruct.Attestation memory attestation = IAttestationStruct
			.Attestation(
				attestationArray.length,
				attestor,
				registration,
				start,
				end,
				challengeTime,
				description,
				creator,
				false
			);

		attestationArray.push(attestation);
		attestationCreatorMap[creator] = attestation;
	}

	function getAttestationById(
		uint256 id
	) external view returns (IAttestationStruct.Attestation memory) {
		return attestationArray[id];
	}
}

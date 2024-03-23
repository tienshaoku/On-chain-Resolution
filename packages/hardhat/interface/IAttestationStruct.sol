// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0 <0.9.0;

interface IAttestationStruct {
	struct Attestation {
		uint256 id;
		address attestor;
		uint256 registration;
		uint256 start;
		uint256 end;
		uint256 challengeTime;
		string description;
		address creator;
	}
}

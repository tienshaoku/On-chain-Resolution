//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { IAttestationStruct } from "../interface/IAttestationStruct.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Attestor {
	address erc20;
	uint256 downPayment;
	uint256 totalDeposit;
	mapping(address => User) public userMap;

	struct User {
		address addr;
		uint256 amount;
		bool result;
	}

	constructor(address erc20Arg, uint256 downPaymentArg) {
		erc20 = erc20Arg;
		downPayment = downPaymentArg;
	}

	function signUp(IAttestationStruct.Attestation memory attestation) public {
		require(
			attestation.registration >= block.timestamp &&
				attestation.start >= block.timestamp
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
		IAttestationStruct.Attestation memory attestation
	) public virtual checkValidity(attestation) {}

	modifier checkValidity(IAttestationStruct.Attestation memory attestation) {
		require(
			attestation.start <= block.timestamp &&
				attestation.end >= block.timestamp &&
				!attestation.isRevoked
		);
		_;
	}
}

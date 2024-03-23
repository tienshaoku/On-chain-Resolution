"use client";

import Image from "next/image";
import usdcIcon from "../../../components/assets/usd-icon.png";
import { useAccount } from "wagmi";
// import { ContractReadMethods } from "~~/app/debug/_components/contract/ContractReadMethods";
// import { ContractVariables } from "~~/app/debug/_components/contract/ContractVariables";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export function RegistryContract() {
  const { address } = useAccount();

  const { data: userMapResult } = useScaffoldContractRead({
    contractName: "MerkleTreeAttestor",
    functionName: "userMap",
    args: [address],
  });

  const { data: attestationIdResult } = useScaffoldContractRead({
    contractName: "MerkleTreeAttestor",
    functionName: "attestationId",
    args: undefined,
  });

  const { data: registryResult } = useScaffoldContractRead({
    contractName: "AttestationRegistry",
    functionName: "getAttestationById",
    args: [attestationIdResult],
  });

  console.log(registryResult);

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
      <div className={`grid grid-cols-1 lg:grid-cols-6 px-6 lg:px-10 lg:gap-12 w-full max-w-7xl my-0`}>
        <div className="col-span-5 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="col-span-1 flex flex-col">
            <div className="bg-base-100 border-base-300 border shadow-md shadow-secondary rounded-3xl px-6 lg:px-8 mb-6 space-y-1 py-4">
              <div className="flex">
                <div className="flex flex-col gap-1">
                  <Address address={address} />
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-sm">USDC Balance:</span>
                    <Balance address={address} usdMode={true} className="px-0 h-1.5 min-h-[0.375rem]" />
                    <Image alt="USDC Icon" src={usdcIcon} width={20} height={20} />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-base-300 rounded-3xl px-6 lg:px-8 py-4 shadow-lg shadow-base-300">
              <div className="space-y-1 pb-2">
                <div className="flex items-center">
                  <h3 className="font-medium text-lg mb-0 break-all">Your Resolution History</h3>
                </div>
                {userMapResult?.[0] === ZERO_ADDRESS ? (
                  <p className="text-md mt-14">No history yet!</p>
                ) : (
                  <div className="flex flex-col gap-1 items-center">
                    <div className="text-sm">Attestation Id: {Number(registryResult?.id)}</div>
                    <div className="text-sm">Topic: {registryResult?.description}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
            <div className="z-10">
              <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
                <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="my-0 text-sm">Read</p>
                  </div>
                </div>
                {/* <div className="p-5 divide-y divide-base-300">
                <ContractReadMethods deployedContractData={deployedContractData} />
              </div> */}
              </div>
            </div>
            <div className="z-10">
              <div className="bg-base-100 rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
                <div className="h-[5rem] w-[5.5rem] bg-base-300 absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="my-0 text-sm">Write</p>
                  </div>
                </div>
                {/* <div className="p-5 divide-y divide-base-300">
                <ContractWriteMethods
                  deployedContractData={deployedContractData}
                  onChange={triggerRefreshDisplayVariables}
                />
              </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
  const { data: result } = useScaffoldContractRead({
    contractName: "AttestationRegistry",
    functionName: "getAllAttestation",
    args: undefined,
  });

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-16">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">On-chain Resolution 🫡 </span>
          </h1>
          <div className="text-center text-lg w-3/5 mx-auto">
            <div className="text-base max-w-full break-words break-all">1️⃣ Decide on a New Goal</div>
            <p className="italic max-w-full text-sm mt-1 mb-1">(verifiable on-chain or with merkle proofs)</p>
            <p className="text-base max-w-full break-words break-all">2️⃣ Pay for the Cost of Failure</p>
            <p className="text-base max-w-full break-words break-all">3️⃣ Stick to your goal!</p>
          </div>
          {/* <p className="text-center text-lg w-3/5 mx-auto">
            Inspired by two concepts{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              skin in the game
            </code>
            {" & "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              social accountability theory,
            </code>
          </p> */}
        </div>

        <div className="flex-grow bg-base-300 w-full mt-8 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              <p>
                <Link href="/registry" passHref className="link">
                  Declare your New Goal now!
                </Link>{" "}
                🚀
              </p>
            </div>
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center max-w-xs rounded-3xl">
              {"Explore Goals 👇"}
              {result?.map((data, i) => (
                <div key={i}>
                  <span>{`"${data.description}" by `}</span>
                  <span className="italic">{data.creatorNickname}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

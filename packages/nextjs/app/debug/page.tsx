import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";

const Debug: NextPage = () => {
  return (
    <>
      <DebugContracts />
      {/* the bigger footer of the Debug Contracts page */}
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Debug Contracts</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / debug / page.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default Debug;

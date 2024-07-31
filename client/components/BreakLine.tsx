import React from "react";

interface IBreakLine {
  error?: boolean;
}

const BreakLine: React.FC<IBreakLine> = ({ error }) => {
  return (
    <div className="flex min-h-[1px]">
      <div
        className={`w-1/4 ${
          error
            ? "bg-[radial-gradient(circle,red,rgba(255,255,255,0)_90%,rgba(255,255,255,1)_100%)]"
            : "bg-[radial-gradient(circle,rgba(51,51,51,0.4)_40%,rgba(255,255,255,0)_90%,rgba(255,255,255,1)_100%)]"
        }`}
      ></div>
      <div
        className={`w-full ${
          error
            ? "bg-[radial-gradient(circle,red,rgba(255,255,255,0)_90%,rgba(255,255,255,1)_100%)]"
            : "bg-[radial-gradient(circle,rgba(51,51,51,0.4)_40%,rgba(255,255,255,0)_90%,rgba(255,255,255,1)_100%)]"
        }`}
      ></div>
    </div>
  );
};

export default BreakLine;

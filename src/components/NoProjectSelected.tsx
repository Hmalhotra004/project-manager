"use client";

import Image from "next/image";
import { Button } from "./ui/button";

const NoProjectSelected = () => {
  return (
    <div className="mt-24 text-center w-2/3">
      <Image
        src="/icon.png"
        alt="An empty task List"
        className="w-16 h-16 object-contain mx-auto"
        width={100}
        height={100}
      />

      <h2 className="text-xl font-bold text-stone-500 my-4">
        No Project Selected
      </h2>

      <p className="text-stone-400 mb-4">
        Select a project or get started with a new one
      </p>
      <Button>Create new project</Button>
    </div>
  );
};

export default NoProjectSelected;

"use client";
import { projectActions } from "@/store/store";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import Button from "./Button";

const NoProjectSelected = () => {
  const dispatch = useDispatch();

  function handleClick() {
    dispatch(projectActions.StartAddProject());
  }

  return (
    <div className="mt-24 text-center w-2/3">
      <motion.img
        src="/project.png"
        alt="An empty task List"
        className="w-16 h-16 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-stone-500 my-4">No Project Selected</h2>
      <p className="text-stone-400 mb-4">Select a project or get started with a new one</p>
      <p className="mt-8">
        <Button onClick={handleClick}>Create new project</Button>
      </p>
    </div>
  );
};

export default NoProjectSelected;

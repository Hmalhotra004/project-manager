"use client";
import Input from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { ModalHandle } from "./Modal";

const NewProject = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const despRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const modal = useRef<ModalHandle>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const desp = despRef.current?.value;
    const date = dateRef.current?.value || "";

    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    try {
      const response = await axios.post("/api/newproject", { title, desp, date: formattedDate });
      const id = response.data.project.projectId;
      router.refresh();
      router.push(`/${id}`);
    } catch (err) {
      console.log(err);
    }
  };

  function handleModalClose() {
    modal.current?.close();
  }

  return (
    <React.Fragment>
      <form
        className="w-[35rem] mt-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold text-stone-800">New Project</h2>
        <menu className="flex items-center justify-end gap-4 my-2">
          <li>
            <button
              type="button"
              onClick={handleModalClose}
              className="text-stone-800 hover:text-stone-950 transition-colors"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 transition-colors "
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input
            ref={titleRef}
            textArea={false}
            label="Title"
            type="text"
            required
          />
          <Input
            ref={despRef}
            textArea={true}
            label="Description"
            type="text"
            required
          />
          <Input
            ref={dateRef}
            textArea={false}
            label="Due Date"
            type="date"
            required
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewProject;

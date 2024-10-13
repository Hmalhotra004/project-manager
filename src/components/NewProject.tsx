import { projectActions } from "@/store/projectSlice";
import { Project } from "@/types";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import Modal, { ModalHandle } from "./Modal";

const NewProject = () => {
  const [loading, setLoading] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const despRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const modal = useRef<ModalHandle>(null);

  const dispatch = useDispatch();

  function handleCancelAddProject() {
    dispatch(projectActions.CancelAddProject());
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const title = titleRef.current?.value;
    const desp = despRef.current?.value;
    const date = dateRef.current?.value;

    if (!title?.trim() || !desp?.trim() || !date?.trim()) {
      modal.current?.open();
      return;
    }

    const response = await axios.post("/api/projects/new", {
      title,
      desp,
      date,
    });

    const project: Project = response.data.project;
    dispatch(projectActions.AddProject(project));

    setLoading(false);
  };

  return (
    <>
      <Modal
        ref={modal}
        btnCap="Close"
      >
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops... looks like you forgot to enter a value.</p>
        <p className="text-stone-600 mb-4">Please make sure you provide a valid entry for every input field.</p>
      </Modal>

      <form
        className="w-[35rem] mt-16"
        onSubmit={handleSubmit}
      >
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              type="button"
              onClick={handleCancelAddProject}
              className="text-stone-800 hover:text-stone-950 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 transition-colors"
              disabled={loading}
            >
              {loading ? <div className="spinner" /> : <span>Save</span>}
            </button>
          </li>
        </menu>
        <div>
          <Input
            ref={titleRef}
            textArea={false}
            label="Title"
            type="text"
          />
          <Input
            ref={despRef}
            textArea={true}
            label="Description"
            type="text"
          />
          <Input
            ref={dateRef}
            textArea={false}
            label="Due Date"
            type="date"
          />
        </div>
      </form>
    </>
  );
};

export default NewProject;

import { projectActions } from "@/store/projectSlice";
import { Project, RootState } from "@/types";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "./Input";
import Modal, { ModalHandle } from "./Modal";

const NewProject = () => {
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const despRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const modal = useRef<ModalHandle>(null);

  const projects = useSelector((state: RootState) => state.projects);
  const dispatch = useDispatch();

  function handleCancelAddProject() {
    dispatch(projectActions.CancelAddProject());
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const title = titleRef.current?.value
      ?.split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const desp = despRef.current?.value;
    const date = dateRef.current?.value;

    if (!title?.trim() || !desp?.trim() || !date?.trim()) {
      setModalMessage("Oops... looks like you forgot to enter a value.");
      modal.current?.open();
      setLoading(false);
      return;
    }

    const duplicateProject = projects.find((project: Project) => project.name.toLowerCase() === title.toLowerCase());

    if (duplicateProject) {
      setModalMessage("A project with this name already exists.");
      modal.current?.open();
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/projects/new", {
        title,
        desp,
        date,
      });

      dispatch(projectActions.AddProject(response.data.project));
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        ref={modal}
        btnCap="Close"
      >
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">{modalMessage}</p>
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

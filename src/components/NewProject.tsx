import { Project } from "@/lib/models";
import { projectActions } from "@/store/store";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import Input from "./Input";
import Modal, { ModalHandle } from "./Modal";

const NewProject = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const despRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const modal = useRef<ModalHandle>(null);

  const dispatch = useDispatch();

  function handleCancelAddProject() {
    dispatch(projectActions.CancelAddProject());
  }

  function handleAddProject(data: Project) {
    dispatch(projectActions.AddProject({ id: data.id, title: data.title, desp: data.desp, date: data.date }));
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const desp = despRef.current?.value;
    const date = dateRef.current?.value || "";

    // if (title?.trim() === "" || date?.trim() === "" || desp?.trim() === "") {
    //   modal.current?.open();
    //   return;
    // }

    const id = Math.random();
    handleAddProject({
      id,
      title,
      desp,
      date,
    });
  };

  return (
    <>
      <Modal
        ref={modal}
        btnCap="Close"
      >
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">Oops... looks like your forgot to enter a value. </p>
        <p className="text-stone-600 mb-4">Please make sure sure you provide a valid entry for every input field.</p>
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

import { ProjectData } from "@/app/page";
import { useRef } from "react";
import Input from "./Input";

type Props = {
  onAdd: ({ title, desp, date }: ProjectData) => void;
};

const NewProject = ({ onAdd }: Props) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const despRef = useRef<HTMLTextAreaElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const title = titleRef.current?.value;
    const desp = despRef.current?.value;
    const date = dateRef.current?.value;

    onAdd({
      title,
      desp,
      date,
    });
  };

  return (
    <form
      className="w-[35rem] mt-16"
      onSubmit={handleSubmit}
    >
      <menu className="flex items-center justify-end gap-4 my-4">
        <li>
          <button className="text-stone-800 hover:text-stone-950 transition-colors">Cancel</button>
        </li>
        <li>
          <button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950 transition-colors ">Save</button>
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
  );
};

export default NewProject;

import { forwardRef } from "react";

type Props = {
  textArea: boolean;
  label: string;
} & React.ComponentPropsWithoutRef<"input"> &
  React.ComponentPropsWithoutRef<"textarea">;

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(function Input({ label, textArea, ...props }, ref) {
  const cssClass = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";

  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">{label}</label>
      {textArea ? (
        <textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          className={cssClass}
          {...props}
        />
      ) : (
        <input
          ref={ref as React.Ref<HTMLInputElement>}
          className={cssClass}
          {...props}
        />
      )}
    </p>
  );
});

export default Input;

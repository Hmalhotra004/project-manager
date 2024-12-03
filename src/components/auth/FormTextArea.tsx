import { cn } from "@/lib/utils";
import { ControllerFieldState } from "react-hook-form";
import { Textarea } from "../ui/textarea";

interface FormTextAreaProps {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: any;
  disabled?: boolean;
  fieldState?: ControllerFieldState;
}

const FormTextArea = ({
  type,
  field,
  disabled,
  fieldState,
}: FormTextAreaProps) => {
  return (
    <Textarea
      className={cn(
        `form-input block w-full border-0 py-1.5 text-gray-900 shadow-sm 
          ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-visible:ring-2
        focus-visible:ring-inset focus-visible:ring-stone-700 sm:text-sm sm:leading-6 focus-visible:ring-offset-0`,
        disabled && "opacity-50 cursor-default",
        fieldState?.error && "focus-visible:ring-red-900"
      )}
      type={type}
      disabled={disabled}
      autoComplete="off"
      {...field}
    />
  );
};

export default FormTextArea;

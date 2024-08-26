import { forwardRef, useImperativeHandle, useRef } from "react";
import Button from "./Button";

type Props = {
  children: React.ReactNode;
  btnCap: string;
};

export type ModalHandle = {
  open: () => void;
};

const Modal = forwardRef<ModalHandle, Props>(function Modal({ children, btnCap }, ref) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  return (
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form
        method="dialog"
        className="mt-4 text-right"
      >
        <Button>{btnCap}</Button>
      </form>
    </dialog>
  );
});

export default Modal;

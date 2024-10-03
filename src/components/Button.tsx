import { ReactNode } from "react";

type Props = {
  children: string| ReactNode;
  onClick?: () => void;
};

const Button = ({ children, onClick, ...props }: Props) => {
  return (
    <button
      className={`px-4 py-2 text-xs rounded-md bg-stone-700 text-stone-400 md:text-base
                    hover:bg-stone-600 hover:text-stone-100 transition-colors`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

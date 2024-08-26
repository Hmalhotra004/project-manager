type Props = {
  children: string;
};

const Button = ({ children, ...props }: Props) => {
  return (
    <button
      className={`px-4 py-2 text-xs rounded-md bg-stone-700 text-stone-400 md:text-base
                    hover:bg-stone-600 hover:text-stone-100 transition-colors`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

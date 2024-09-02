import Link from "next/link";

const SideBarBottom = () => {
  return (
    <div className="flex items-center justify-end mt-auto">
      <button className="transition-colors text-stone-200 hover:text-stone-400 ml-2 mr-auto">
        <Link href="Login">Login </Link>
      </button>

      <button className="mr-2 transition-colors text-stone-200 hover:text-stone-400">
        <Link href="Signup">Signup</Link>
      </button>
    </div>
  );
};

export default SideBarBottom;

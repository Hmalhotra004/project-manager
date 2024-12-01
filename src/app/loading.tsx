import Loader from "@/components/Loader";

export default function loading() {
  return (
    <div className="flex justify-center items-center h-dvh bg-stone-100">
      <Loader />
    </div>
  );
}

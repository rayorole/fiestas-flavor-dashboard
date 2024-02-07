import ScaleLoader from "react-spinners/ScaleLoader";

export default function Loading() {
  return (
    <div className="w-full h-full flex my-40 items-center justify-center">
      <div className="dark:hidden">
        <ScaleLoader color="#0000" loading />
      </div>
      <div className="hidden dark:block">
        <ScaleLoader color="#fff" loading />
      </div>
    </div>
  );
}

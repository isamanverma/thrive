import { Cherry } from "lucide-react";

export default function Home() {
  return (
    <>
      <section className="mx-auto h-screen max-w-7xl items-center justify-center p-5">
        <div className="flex flex-row items-center">
          <div className="m-2 rounded-md bg-green-900 p-2 shadow-md">
            <Cherry color="white" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl">Thrive AI</h1>
        </div>
      </section>
    </>
  );
}

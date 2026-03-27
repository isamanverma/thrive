import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="px-5 py-32 sm:px-6 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-[clamp(2rem,4.2vw,3.2rem)] font-semibold leading-[1.04] tracking-tight text-zinc-900">
          your best week starts now
        </p>
        <p className="mx-auto mt-5 max-w-[48ch] text-[1.03rem] leading-relaxed text-zinc-600">
          Set your targets, choose your rhythm, and let Thrive handle the rest.
        </p>
        <Link
          href="/sign-up"
          className="mt-10 inline-flex rounded-full bg-orange-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          Build my first week — free
        </Link>
        <p className="mt-5 text-xs text-zinc-500">
          Takes ~3 minutes. No setup overhead.
        </p>
      </div>
    </section>
  );
}

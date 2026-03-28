"use client";

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-[100vh] w-full bg-[#fffaf5] flex">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_16%_9%,rgba(251,146,60,0.10),transparent_32%),radial-gradient(circle_at_84%_5%,rgba(251,191,36,0.08),transparent_30%)]" />

      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-8">
        <div className="relative w-full max-w-md aspect-square">
          <Image
            src="/thrive mascots/bgRemoved/saying hello Background Removed.png"
            alt="Thrive Mascot"
            fill
            sizes="(max-width: 1024px) 0px, 50vw"
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
        <div className="absolute bottom-12 left-12 right-12">
          <blockquote className="space-y-2">
            <p className="text-lg text-zinc-700 italic">
              "Thrive helped me discover a healthier relationship with food.
              Every meal feels intentional and nourishing."
            </p>
            <footer className="text-sm text-zinc-500 font-medium">
              — Sarah, Thrive User
            </footer>
          </blockquote>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="flex items-center gap-3 lg:hidden">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-xl border border-orange-200 bg-orange-50">
                <div className="h-2.5 w-2.5 rounded-full bg-orange-500" />
              </div>
              <span className="text-xl font-semibold tracking-tight text-zinc-900">
                Thrive
              </span>
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
              Welcome back
            </h1>
            <p className="text-zinc-600">
              Sign in to continue your wellness journey
            </p>
          </div>

          <div>
            <SignIn
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none bg-transparent",
                  headerTitle: "text-zinc-900 font-semibold",
                  headerSubtitle: "text-zinc-500",
                  socialButtonsBlockButton:
                    "border-orange-200 hover:bg-orange-50 text-zinc-700 hover:text-orange-700",
                  socialButtonsBlockButtonText: "font-medium",
                  formFieldLabel: "text-zinc-700 font-medium",
                  formFieldInput:
                    "border-orange-200 focus:border-orange-400 focus:ring-orange-100 rounded-lg",
                  formButtonSubmit:
                    "bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium",
                  footerActionLink:
                    "text-orange-600 hover:text-orange-700 font-medium",
                  dividerLine: "bg-orange-200",
                  dividerText: "text-zinc-500",
                  identityPreviewText: "text-zinc-600",
                  identityPreviewEditButton:
                    "text-orange-600 hover:text-orange-700",
                  formFieldInputShowPasswordButton:
                    "text-zinc-500 hover:text-zinc-700",
                  otpCodeFieldInput:
                    "border-orange-200 rounded-lg focus:border-orange-400 focus:ring-orange-100",
                },
              }}
            />
          </div>

          <p className="text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="font-medium text-orange-600 hover:text-orange-700"
            >
              Start free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

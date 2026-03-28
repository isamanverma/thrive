"use client";

import { AnimatePresence, motion } from "framer-motion";
import { clearPendingUserData, storePendingUserData } from "@/lib/user-sync";
import { useCallback, useEffect, useRef, useState } from "react";

import { SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Check } from "lucide-react";

type QuestionType = "number" | "single-choice" | "multi-choice";

interface Question {
  id: number;
  question: string;
  subtext?: string;
  name: keyof FormDataState;
  type: QuestionType;
  options?: string[];
  mascot?: string;
}

interface FormDataState {
  age?: number;
  weight?: number;
  height?: number;
  fitnessGoal?: string[];
  activityLevel?: string;
  dietType?: string[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How old are you?",
    subtext: "We use this to calculate your daily calorie needs",
    name: "age",
    type: "number",
    mascot: "/thrive mascots/bgRemoved/thinking Background Removed.png",
  },
  {
    id: 2,
    question: "What's your weight?",
    subtext: "In kilograms - this helps us personalize your meal plans",
    name: "weight",
    type: "number",
    mascot:
      "/thrive mascots/bgRemoved/looking at fridge Background Removed.png",
  },
  {
    id: 3,
    question: "How tall are you?",
    subtext: "In centimeters - needed to calculate your metabolism",
    name: "height",
    type: "number",
    mascot: "/thrive mascots/bgRemoved/running happily Background Removed.png",
  },
  {
    id: 4,
    question: "What are your fitness goals?",
    subtext: "Select all that apply",
    name: "fitnessGoal",
    type: "multi-choice",
    options: [
      "Lose Weight",
      "Build Muscle",
      "Improve Endurance",
      "Stay Healthy",
      "Gain Strength",
      "Improve Flexibility",
    ],
    mascot: "/thrive mascots/bgRemoved/jogging Background Removed.png",
  },
  {
    id: 5,
    question: "What's your activity level?",
    subtext: "Be honest - this affects your calorie recommendations",
    name: "activityLevel",
    type: "single-choice",
    options: [
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
      "Athlete",
    ],
    mascot: "/thrive mascots/bgRemoved/running happily Background Removed.png",
  },
  {
    id: 6,
    question: "What diets do you follow?",
    subtext: "Select all that apply - we'll customize recipes accordingly",
    name: "dietType",
    type: "multi-choice",
    options: [
      "None",
      "Vegetarian",
      "Vegan",
      "Pescatarian",
      "Keto",
      "Paleo",
      "Gluten-Free",
    ],
    mascot: "/thrive mascots/bgRemoved/eating salad Background Removed.png",
  },
];

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormDataState>({
    age: 25,
    fitnessGoal: [],
    dietType: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentQuestion = questions[step];
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      fetch(`/api/users?clerkId=${encodeURIComponent(user.id)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.id) {
            router.push("/dashboard");
          }
        })
        .catch(() => {});
    }
  }, [isLoaded, user, router]);

  const handleSubmit = useCallback(async () => {
    if (!user) {
      console.error("No user found");
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || user.firstName || "",
        age: formData.age,
        weight: formData.weight,
        goals: formData.fitnessGoal?.join(", "),
        diet_preference: formData.dietType?.join(", ") || "None",
        activityLevel: formData.activityLevel,
        height: formData.height,
      };

      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save user data");
      }

      const result = await response.json();

      if (result.fallback) {
        storePendingUserData(userData);
      } else {
        clearPendingUserData();
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to save user:", error);
      alert("Failed to save your information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [user, formData, router]);

  const handleNext = useCallback(() => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  }, [step, handleSubmit]);

  const handlePrev = useCallback(() => {
    if (step > 0) setStep(step - 1);
  }, [step]);

  const isAnswered = (q: Question): boolean => {
    const val = formData[q.name];
    if (q.type === "number") return typeof val === "number" && val > 0;
    if (q.type === "single-choice")
      return typeof val === "string" && val !== "";
    if (q.type === "multi-choice") return Array.isArray(val) && val.length > 0;
    return false;
  };

  useEffect(() => {
    if (currentQuestion.type === "number") {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [step, currentQuestion]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isSubmitting) return;

      const num = Number(e.key);

      if (
        (currentQuestion.type === "single-choice" ||
          currentQuestion.type === "multi-choice") &&
        Number.isInteger(num) &&
        num >= 1 &&
        num <= (currentQuestion.options?.length || 0)
      ) {
        const selectedOption = currentQuestion.options![num - 1];
        setFormData((prev) => {
          if (currentQuestion.type === "single-choice") {
            const already =
              prev[currentQuestion.name as keyof FormDataState] ===
              selectedOption;
            return {
              ...prev,
              [currentQuestion.name]: already ? undefined : selectedOption,
            };
          }
          if (currentQuestion.type === "multi-choice") {
            const arr =
              (prev[currentQuestion.name as keyof FormDataState] as string[]) ||
              [];
            const already = arr.includes(selectedOption);

            // Handle "None" option specially
            if (selectedOption === "None") {
              return {
                ...prev,
                [currentQuestion.name]: already ? [] : ["None"],
              };
            }

            // If selecting any other option, remove "None" first
            let newArr = arr.filter((v) => v !== "None");
            if (already) {
              newArr = newArr.filter((v) => v !== selectedOption);
            } else {
              newArr = [...newArr, selectedOption];
            }
            return {
              ...prev,
              [currentQuestion.name]: newArr,
            };
          }
          return prev;
        });
      }

      if (e.key === "Enter" || e.key === "NumpadEnter") {
        e.preventDefault();
        const val = formData[currentQuestion.name];
        let answered = false;
        if (currentQuestion.type === "number")
          answered = typeof val === "number" && val > 0;
        else if (currentQuestion.type === "single-choice")
          answered = typeof val === "string" && val !== "";
        else if (currentQuestion.type === "multi-choice")
          answered = Array.isArray(val) && val.length > 0;

        if (answered) handleNext();
      }

      if ((e.metaKey || e.ctrlKey) && e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [step, currentQuestion, formData, isSubmitting, handleNext, handlePrev]);

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-amber-50">
        <div className="relative w-48 h-48 mb-6">
          <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-20" />
          <Image
            src="/thrive mascots/bgRemoved/cooking Background Removed.png"
            alt="Setting up"
            fill
            sizes="192px"
            className="relative z-10 object-contain animate-bounce"
            style={{ animationDuration: "1.5s" }}
            priority
          />
        </div>
        <p className="text-zinc-600 font-medium animate-pulse">
          Setting up your profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Navbar */}
      <header className="flex justify-between items-center h-16 px-6 max-w-2xl mx-auto w-full">
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/logo.png"
            alt="Thrive Logo"
            width={36}
            height={36}
            className="object-contain rounded-lg"
            priority
          />
          <h1 className="text-xl font-bold text-orange-600">Thrive</h1>
        </div>
        <SignOutButton>
          <button className="text-sm text-muted-foreground hover:text-red-500 transition-colors font-medium">
            Sign Out
          </button>
        </SignOutButton>
      </header>

      {/* Progress Bar */}
      <div className="px-6 max-w-2xl mx-auto w-full mt-2">
        <div className="flex justify-between text-xs text-muted-foreground mb-2 font-medium">
          <span>
            Step {step + 1} of {questions.length}
          </span>
          <span>
            {Math.round(((step + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-orange-100 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="bg-orange-500 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md"
          >
            {/* Mascot */}
            <div className="flex justify-center mb-8">
              <div className="relative w-28 h-28">
                <Image
                  src={
                    currentQuestion.mascot ||
                    "/thrive mascots/bgRemoved/saying hello Background Removed.png"
                  }
                  alt="Mascot"
                  fill
                  sizes="112px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Question */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-zinc-900">
                {currentQuestion.question}
              </h2>
              {currentQuestion.subtext && (
                <p className="text-sm text-zinc-600 mt-2">
                  {currentQuestion.subtext}
                </p>
              )}
            </div>

            {/* Input based on type */}
            <div>
              {currentQuestion.type === "number" && (
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="number"
                    min={1}
                    className="w-full border-b-2 border-orange-200 bg-transparent py-3 px-2 focus:outline-none focus:border-orange-500 text-2xl text-center font-medium text-zinc-900"
                    value={
                      formData[currentQuestion.name as keyof FormDataState] ??
                      ""
                    }
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [currentQuestion.name]: e.target.value
                          ? Math.max(1, Number(e.target.value))
                          : undefined,
                      }))
                    }
                    placeholder="0"
                  />
                  <p className="text-center text-xs text-zinc-500 mt-4">
                    Press Enter to continue
                  </p>
                </div>
              )}

              {(currentQuestion.type === "single-choice" ||
                currentQuestion.type === "multi-choice") && (
                <div className="space-y-2">
                  {currentQuestion.options!.map((opt, idx) => {
                    const arr =
                      currentQuestion.type === "multi-choice"
                        ? (formData[
                            currentQuestion.name as keyof FormDataState
                          ] as string[]) || []
                        : [];
                    const isSelected =
                      currentQuestion.type === "single-choice"
                        ? formData[
                            currentQuestion.name as keyof FormDataState
                          ] === opt
                        : arr.includes(opt);

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          if (currentQuestion.type === "single-choice") {
                            setFormData((prev) => ({
                              ...prev,
                              [currentQuestion.name]: isSelected
                                ? undefined
                                : opt,
                            }));
                          } else {
                            setFormData((prev) => {
                              const arr =
                                (prev[
                                  currentQuestion.name as keyof FormDataState
                                ] as string[]) || [];
                              const already = arr.includes(opt);

                              // Handle "None" option specially - it should deselect everything else
                              if (opt === "None") {
                                return {
                                  ...prev,
                                  [currentQuestion.name]: already
                                    ? []
                                    : ["None"],
                                };
                              }

                              // If selecting any other option, remove "None" first
                              let newArr = arr.filter((v) => v !== "None");
                              if (already) {
                                newArr = newArr.filter((v) => v !== opt);
                              } else {
                                newArr = [...newArr, opt];
                              }
                              return {
                                ...prev,
                                [currentQuestion.name]: newArr,
                              };
                            });
                          }
                        }}
                        className={`w-full px-4 py-3 rounded-lg border text-left font-medium transition-colors flex items-center justify-between ${
                          isSelected
                            ? "border-orange-500 bg-orange-50 text-orange-700"
                            : "border-orange-100 hover:border-orange-300 hover:bg-orange-50/30 text-zinc-700"
                        }`}
                      >
                        <span>
                          <span className="text-orange-500 font-bold mr-2">
                            {idx + 1}.
                          </span>
                          {opt}
                        </span>
                        {isSelected && (
                          <Check className="w-4 h-4 text-orange-500" />
                        )}
                      </button>
                    );
                  })}
                  <p className="text-center text-xs text-zinc-500 mt-4">
                    Press 1-{currentQuestion.options!.length} to select • Enter
                    to continue
                  </p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-10">
              <button
                onClick={handlePrev}
                disabled={step === 0}
                className="px-6 py-2.5 rounded-lg border border-orange-200 text-orange-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-orange-50 font-medium transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isAnswered(currentQuestion)}
                className="px-8 py-2.5 rounded-lg bg-orange-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 font-medium transition-colors"
              >
                {step === questions.length - 1 ? "Complete" : "Continue"}
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer hint */}
      <div className="text-center pb-6">
        <p className="text-xs text-muted-foreground">
          ← → arrow keys to navigate
        </p>
      </div>
    </div>
  );
}

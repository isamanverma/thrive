"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Citrus } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

type QuestionType = "number" | "single-choice" | "multi-choice";

interface Question {
  id: number;
  question: string;
  name: keyof FormDataState;
  type: QuestionType;
  options?: string[];
}

interface FormDataState {
  age?: number;
  weight?: number;
  height?: number;
  fitnessGoal?: string;
  activityLevel?: string;
  dietaryRestrictions?: string[];
}

const questions: Question[] = [
  { id: 1, question: "What's your age?", name: "age", type: "number" },
  { id: 2, question: "What's your weight (kg)?", name: "weight", type: "number" },
  { id: 3, question: "What's your height (cm)?", name: "height", type: "number" },
  {
    id: 4,
    question: "What's your main fitness goal?",
    name: "fitnessGoal",
    type: "single-choice",
    options: ["Lose Weight", "Build Muscle", "Improve Endurance", "Stay Healthy"],
  },
  {
    id: 5,
    question: "What's your activity level?",
    name: "activityLevel",
    type: "single-choice",
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"],
  },
  {
    id: 6,
    question: "Do you have any dietary restrictions/allergies?",
    name: "dietaryRestrictions",
    type: "multi-choice",
    options: ["Vegetarian", "Vegan", "Gluten-Free", "Nut Allergy"],
  },
];

export default function ProfilePage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormDataState>({});
  const currentQuestion = questions[step];
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleNext = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else console.log("Form submitted:", formData);
  };

  const handlePrev = () => {
    if (step > 0) setStep(step - 1);
  };

  const isAnswered = (q: Question): boolean => {
    const val = formData[q.name];
    if (q.type === "number") return typeof val === "number" && val > 0;
    if (q.type === "single-choice") return typeof val === "string" && val !== "";
    if (q.type === "multi-choice") return Array.isArray(val) && val.length > 0;
    return false;
  };

  // ✅ Always focus numeric inputs after step change (with slight delay for animation)
  useEffect(() => {
    if (currentQuestion.type === "number") {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 350); // matches motion animation timing
      return () => clearTimeout(timer);
    }
  }, [step, currentQuestion]);

  // Global keyboard handling
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
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
            const already = prev[currentQuestion.name] === selectedOption;
            return {
              ...prev,
              [currentQuestion.name]: already ? undefined : selectedOption,
            };
          }
          const arr = (prev[currentQuestion.name] as string[]) || [];
          const already = arr.includes(selectedOption);
          return {
            ...prev,
            [currentQuestion.name]: already
              ? arr.filter((v) => v !== selectedOption)
              : [...arr, selectedOption],
          };
        });
      }

      if (e.key === "Enter" || e.key === "NumpadEnter") {
        e.preventDefault();
        if (isAnswered(currentQuestion)) handleNext();
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
  }, [step, currentQuestion, formData]);

  return (
    <section className="mx-auto min-h-screen max-w-7xl p-5 flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center h-16">
        <div className="flex flex-row items-center">
          <div className="m-2 rounded-md bg-green-600 p-1 shadow-md">
            <Citrus color="white" strokeWidth={1.5} />
          </div>
          <h1 className="text-xl font-semibold">Thrive AI</h1>
        </div>
        <SignOutButton>
          <button className="bg-red-500 text-white rounded-full px-4 py-2 text-sm hover:bg-red-600">
            Sign Out
          </button>
        </SignOutButton>
      </nav>

      {/* Progressive Form */}
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <h2 className="text-2xl font-semibold mb-6">
                {currentQuestion.question}
              </h2>

              {currentQuestion.type === "number" && (
                <input
                  ref={inputRef}
                  type="number"
                  min={1}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                  value={formData[currentQuestion.name] ?? ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      [currentQuestion.name]: e.target.value
                        ? Math.max(1, Number(e.target.value))
                        : undefined,
                    }))
                  }
                  placeholder="Enter a value"
                />
              )}

              {currentQuestion.type === "single-choice" && (
                <div className="flex flex-col gap-3">
                  {currentQuestion.options!.map((opt, idx) => (
                    <div
                      key={opt}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          [currentQuestion.name]:
                            prev[currentQuestion.name] === opt ? undefined : opt,
                        }))
                      }
                      className={`px-4 py-3 border rounded-lg cursor-pointer transition ${
                        formData[currentQuestion.name] === opt
                          ? "bg-green-600 text-white"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {idx + 1}. {opt}
                    </div>
                  ))}
                  <p className="text-sm text-gray-500 mt-2">
                    Press 1, 2, 3... to select/unselect. Press Enter to continue.
                  </p>
                </div>
              )}

              {currentQuestion.type === "multi-choice" && (
                <div className="flex flex-col gap-3">
                  {currentQuestion.options!.map((opt, idx) => {
                    const arr = (formData[currentQuestion.name] as string[]) || [];
                    return (
                      <div
                        key={opt}
                        onClick={() =>
                          setFormData((prev) => {
                            const already = arr.includes(opt);
                            return {
                              ...prev,
                              [currentQuestion.name]: already
                                ? arr.filter((v) => v !== opt)
                                : [...arr, opt],
                            };
                          })
                        }
                        className={`px-4 py-3 border rounded-lg cursor-pointer transition ${
                          arr.includes(opt)
                            ? "bg-green-600 text-white"
                            : "border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {idx + 1}. {opt}
                      </div>
                    );
                  })}
                  <p className="text-sm text-gray-500 mt-2">
                    Press 1, 2, 3... to toggle options. Press Enter to continue.
                  </p>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  disabled={step === 0}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isAnswered(currentQuestion)}
                  className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50"
                >
                  {step === questions.length - 1 ? "Submit" : "Next"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </section>
  );
}
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
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
  dietType?: string;
}

const questions: Question[] = [
  { id: 1, question: "What's your age?", name: "age", type: "number" },
  {
    id: 2,
    question: "What's your weight (kg)?",
    name: "weight",
    type: "number",
  },
  {
    id: 3,
    question: "What's your height (cm)?",
    name: "height",
    type: "number",
  },
  {
    id: 4,
    question: "What's your main fitness goal?",
    name: "fitnessGoal",
    type: "single-choice",
    options: [
      "Lose Weight",
      "Build Muscle",
      "Improve Endurance",
      "Stay Healthy",
    ],
  },
  {
    id: 5,
    question: "What's your activity level?",
    name: "activityLevel",
    type: "single-choice",
    options: [
      "Sedentary",
      "Lightly Active",
      "Moderately Active",
      "Very Active",
    ],
  },
  {
    id: 6,
    question: "What type of diet do you follow?",
    name: "dietType",
    type: "single-choice",
    options: ["Vegetarian", "Non-Vegetarian", "Vegan", "Pescatarian"],
  },
];

export default function OnboardingPage() {
  const { user } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormDataState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentQuestion = questions[step];
  const inputRef = useRef<HTMLInputElement | null>(null);

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
        goals: formData.fitnessGoal,
        allergies: [formData.dietType || "Non-Vegetarian"],
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
        throw new Error("Failed to save user data");
      }

      const savedUser = await response.json();
      console.log("User saved successfully:", savedUser);

      // Redirect to dashboard after successful save
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
      if (isSubmitting) return; // Disable keyboard during submission

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
          // Multi-choice logic commented out since we only have single-choice questions now
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">
            Setting up your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="mx-auto min-h-screen max-w-7xl p-5 flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
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

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>
            Step {step + 1} of {questions.length}
          </span>
          <span>
            {Math.round(((step + 1) / questions.length) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

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
              className="w-full bg-white rounded-lg shadow-lg p-8"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                {currentQuestion.question}
              </h2>

              {currentQuestion.type === "number" && (
                <input
                  ref={inputRef}
                  type="number"
                  min={1}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-600 text-lg"
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
                            prev[currentQuestion.name] === opt
                              ? undefined
                              : opt,
                        }))
                      }
                      className={`px-4 py-3 border rounded-lg cursor-pointer transition ${
                        formData[currentQuestion.name] === opt
                          ? "bg-green-600 text-white border-green-600"
                          : "border-gray-300 hover:bg-gray-50 hover:border-green-300"
                      }`}
                    >
                      {idx + 1}. {opt}
                    </div>
                  ))}
                  <p className="text-sm text-gray-500 mt-2">
                    Press 1, 2, 3... to select/unselect. Press Enter to
                    continue.
                  </p>
                </div>
              )}

              {/* Multi-choice logic commented out since we only have single-choice questions now
              {currentQuestion.type === "multi-choice" && (
                <div className="flex flex-col gap-3">
                  {currentQuestion.options!.map((opt, idx) => {
                    const arr =
                      (formData[currentQuestion.name] as string[]) || [];
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
                            ? "bg-green-600 text-white border-green-600"
                            : "border-gray-300 hover:bg-gray-50 hover:border-green-300"
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
              */}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrev}
                  disabled={step === 0}
                  className="px-6 py-2 rounded-lg border border-gray-300 text-gray-600 disabled:opacity-50 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isAnswered(currentQuestion)}
                  className="px-6 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50 hover:bg-green-700 font-medium"
                >
                  {step === questions.length - 1 ? "Complete Setup" : "Next"}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </section>
  );
}

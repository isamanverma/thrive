import React from "react";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-[var(--text-primary)] mb-4">
          How Thrive Works
        </h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto mb-12">
          Thrive simplifies meal planning with a few easy steps, ensuring you
          enjoy delicious and healthy meals every day.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card p-8 text-center border-none shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[var(--accent-color)] text-[var(--primary-color)]">
              <svg
                fill="currentColor"
                height="32"
                viewBox="0 0 256 256"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M88,48V16a8,8,0,0,1,16,0V48a8,8,0,0,1-16,0Zm40,8a8,8,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8,8,0,0,0,128,56Zm32,0a8,8,0,0,0,8-8V16a8,8,0,0,0-16,0V48A8,8,0,0,0,160,56Zm92.8,46.4L224,124v60a32,32,0,0,1-32,32H64a32,32,0,0,1-32-32V124L3.2,102.4a8,8,0,0,1,9.6-12.8L32,104V88A16,16,0,0,1,48,72H208a16,16,0,0,1,16,16v16l19.2-14.4a8,8,0,0,1,9.6,12.8ZM208,88H48v96a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Personalized Recommendations
            </h3>
            <p className="text-[var(--text-secondary)]">
              Tell us your dietary preferences, favorite cuisines, and any
              restrictions. Our AI will suggest recipes you&apos;ll love.
            </p>
          </div>
          <div className="card p-8 text-center border-none shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[var(--accent-color)] text-[var(--primary-color)]">
              <svg
                fill="currentColor"
                height="32"
                viewBox="0 0 256 256"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Automated Meal Plans
            </h3>
            <p className="text-[var(--text-secondary)]">
              Thrive generates weekly meal plans, complete with shopping lists,
              based on your preferences and schedule.
            </p>
          </div>
          <div className="card p-8 text-center border-none shadow-xl transform hover:-translate-y-2 transition-transform duration-300">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-[var(--accent-color)] text-[var(--primary-color)]">
              <svg
                fill="currentColor"
                height="32"
                viewBox="0 0 256 256"
                width="32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
              Stay Consistent
            </h3>
            <p className="text-[var(--text-secondary)]">
              Easily track your meals, discover new recipes, and maintain a
              healthy eating routine with our intuitive platform.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

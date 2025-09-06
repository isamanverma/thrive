import React from "react";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[600px] items-center justify-center bg-cover bg-center py-20 text-center"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFpoSG2anWI1JkCtQjnXIr2UIjQWiP0f6DdX5JlxYadiKIuC6954mHHPVZPyvmYZJ1dQdXEOUr7CWsYbmFOApTIwDWiUuya_8XInrGecaNFzFwgNantzKXn6D3PnFsnHr7AsrrJqEKTNAZhmx3YA2OCuEVFphFTSSNhpszJvSatJiTy-RjX2EWrFn3L5vxHXBXDlY30EKbst9UAzzrowtt7-SZTpgfabyZeZoDaumW6ILX77O_9IbiH3ScslZcu7X1G82C-I4AUCw")',
      }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-white text-5xl font-extrabold leading-tight tracking-tighter md:text-6xl">
          Discover Delicious, Personalized Meal Plans
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-200">
          Thrive uses AI to recommend recipes and create meal plans tailored to
          your taste and dietary preferences. Enjoy a variety of healthy,
          easy-to-make meals without the hassle of planning.
        </p>
        <button className="mt-8 button_primary text-lg font-bold px-8 py-4 rounded-xl">
          Get Started
        </button>
      </div>
    </section>
  );
}

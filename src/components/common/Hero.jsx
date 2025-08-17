import React from "react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-pink-500 to-orange-400" />

      {/* Rusty Texture Overlay (optional) */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/rust.png')",
        }}
      />

      {/* Hero Text */}
      <div className="relative z-10 text-center text-white">
        <h1 className="text-6xl font-extrabold drop-shadow-lg">
          Welcome to Anuj World
        </h1>
        <p className="mt-4 text-lg max-w-2xl mx-auto opacity-90">
          A <span className="text-green-300 underline">Coder</span> from Nagpur
        </p>
        <button
          onClick={() => {
            window.scrollTo({
              top:  window.innerHeight,
              behavior: "smooth", 
            });
          }}
          className="mt-6 px-6 py-3 bg-white/20 hover:bg-white/30 
                           backdrop-blur-lg rounded-2xl text-white font-semibold 
                           transition"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

'use client'
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import StarsCanvas from './components/StarBackground';
import { Cover } from './components/cover';


// Page component
function Page() {
  return ( <>
    <StarsCanvas />
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background with Asteroid Image */}
      <img
        src="/pngegg.png"
        alt="Asteroid"
        className="absolute top-1/2 left-0 transform -translate-y-1/2 w-[40%] h-auto"
      />

      {/* Sun Glow Effect */}
      <div className="absolute top-20 right-10 z-0">
        {/* Sun Core */}
        <div className="w-8 h-8 mr-10 mt-10 bg-yellow-100 rounded-full opacity-80 blur-[10px]"></div>

        {/* Inner Glow */}
        <div className="absolute top-0 right-0 w-[10rem] h-[10rem] bg-yellow-100 rounded-full opacity-50 blur-lg"></div>

        {/* Outer Glow */}
        <div className="absolute top-0 right-0 w-[15rem] h-[15rem] bg-white rounded-full opacity-40 blur-[40px]"></div>

        {/* Extended Glow */}
        <div className="absolute top-0 right-0 w-[30rem] h-[20rem] bg-white rounded-full opacity-20 blur-[70px]"></div>
      </div>

      {/* Stars Background */}
      <div className="absolute inset-0 z-0">
        {/* You can use a background or CSS to simulate stars */}
      </div>

      {/* Navigation Links */}
      <div className="absolute top-8 w-full flex justify-center space-x-12 text-xl text-white z-10">
        <a href="#" className="hover:text-gray-300">Community</a>
        <a href="#" className="hover:text-gray-300">Chat</a>
        <a href="#" className="hover:text-gray-300">Simulation</a>
      </div>

      {/* Main Text */}
      <div className="absolute flex flex-col items-center justify-center w-full h-full text-white z-20">
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Universe <br /> At 
        </h1>

        <h2 className="text-7xl font-bold tracking-wide">
          <Cover>
          H a n d
          </Cover>
        </h2>
      </div>
    </div>
    </>
  );
}

export default Page;

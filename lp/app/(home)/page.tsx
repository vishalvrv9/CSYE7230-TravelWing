import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import { GlobeDemo } from './components/GlobeDemo';

export default function page() {
  return (
    <div className='min-h-screen bg-black'>
      <div className='dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2]'>
      <div className='max-w-7xl mx-auto sm:p-5 '>
        <Navbar />
        {/* <HeroSection /> */}
      </div>
      
        <GlobeDemo />
      </div>


    </div>
  );
}

"use client";

import Image from "next/image";
import { Download, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

const Hero = ({
  pageTitle,
  description,
  aboutButtonText,
  scrollIndicatorText,
  imageUrl,
  imageAlt,
}) => {
  const [isScrolling, setIsScrolling] = useState(false);

  const handleDownloadResume = () => {
    // Create a link to download the resume
    const link = document.createElement('a');
    link.href = '/Latest-resume-Amritpal.pdf';
    link.download = 'Amritpal-Singh-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleScrollToNext = () => {
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleDownloadResume();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      setTimeout(() => setIsScrolling(false), 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full min-h-screen px-6 md:px-12 py-12 pt-16 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side - Image */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start w-full lg:w-2/5">
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-full lg:h-[500px] group">
              {/* Enhanced image container with better styling */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-yellow-300 to-yellow-500 rounded-3xl shadow-lg transform"></div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-md">
                <Image
                  src="/image-new.png"
                  alt={imageAlt}
                  fill
                  className="object-cover h-auto w-full"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 space-y-8 w-full lg:w-3/5">
            {/* Enhanced Main Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight font-heading">
                  {pageTitle}
              </h1>

            {/* Enhanced Description */}
            <p className="text-md md:text-lg text-black leading-relaxed max-w-2xl font-light">
              {description}
            </p>

            {/* Enhanced Action Buttons */}
            {/* <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button
                className="group bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 flex items-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                onClick={handleDownloadResume}
                onKeyDown={handleKeyDown}
                tabIndex="0"
                aria-label="Download Resume"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                <span>Download Resume</span>
              </button>

              <button
                onClick={handleScrollToNext}
                className="flex flex-col items-center space-y-3 group cursor-pointer"
                aria-label="Scroll to next section"
              >
                <div className={`w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center group-hover:border-blue-500 transition-all duration-300 ${isScrolling ? 'animate-pulse' : ''}`}>
                  <ChevronDown className={`w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-all duration-300 ${isScrolling ? 'animate-bounce' : ''}`} />
                </div>
                <span className="text-sm text-gray-500 group-hover:text-blue-500 transition-colors duration-300 font-medium">
                  {scrollIndicatorText}
                </span>
              </button>
            </div> */}

            {/* Enhanced Stats/Highlights */}
            <div className="flex flex-wrap gap-14 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">9+</div>
                <div className="text-md text-gray-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">150+</div>
                <div className="text-md text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">100%</div>
                <div className="text-md text-gray-600">Client Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

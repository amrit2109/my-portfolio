"use client";

import { useState, useEffect, useRef } from "react";

const WorkingProcessTabsSection = ({ heading, tabs }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);
  const contentRefs = useRef([]);

  // Scroll-triggered tab activation using Intersection Observer
  useEffect(() => {
    const observers = contentRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveTab(index);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "-20% 0px -20% 0px"
        }
      );
      
      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
    contentRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(index);
    }
  };

  return (
    <section className="w-full bg-black py-28  px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <h2 className="text-6xl font-extrabold font-heading text-white mb-20 uppercase tracking-tight text-center">
          {heading}
        </h2>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-white/20">
            {/* Animated Progress Line */}
            <div 
              className="absolute top-0 w-full bg-blue-600 transition-all duration-1000 ease-in-out"
              style={{
                height: `${(activeTab / (tabs.length - 1)) * 100}%`
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-20">
            {tabs.map((tab, index) => (
              <div key={tab.id} className="relative">
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black z-10 transition-all duration-500 ${
                    index <= activeTab 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'bg-white border-white'
                  }`}
                />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Tab Headers */}
                  <div className="lg:pr-12">
                    <button
                      ref={(el) => (tabRefs.current[index] = el)}
                      onClick={() => handleTabClick(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`text-left w-full p-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        index === activeTab
                          ? 'bg-blue-600/10'
                          : 'hover:bg-white/5'
                      }`}
                      tabIndex="0"
                      aria-label={`${tab.title} - Step ${tab.number}`}
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold text-gray-400">
                          {tab.number}
                        </span>
                        <h3 
                          className={`text-4xl font-bold font-heading transition-colors duration-300 ${
                            index === activeTab 
                              ? 'text-blue-400' 
                              : 'text-white'
                          }`}
                        >
                          {tab.title}
                        </h3>
                      </div>
                    </button>
                  </div>

                  {/* Right Side - Tab Content */}
                  <div 
                    ref={(el) => (contentRefs.current[index] = el)}
                    className={`lg:pl-12 transition-all duration-500 ${
                      index === activeTab 
                        ? 'opacity-100 transform translate-x-0' 
                        : 'opacity-60 transform translate-x-4'
                    }`}
                  >
                    <p className="text-lg text-gray-300 leading-7">
                      {tab.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkingProcessTabsSection;

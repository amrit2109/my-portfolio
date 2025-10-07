"use client";

import { useState, useEffect, useRef } from "react";
import { Calendar, MapPin, Building2 } from "lucide-react";

const ExperienceSection = ({ heading, experiences }) => {
  const [activeExperience, setActiveExperience] = useState(0);
  const experienceRefs = useRef([]);
  const contentRefs = useRef([]);

  // Scroll-triggered experience activation using Intersection Observer
  useEffect(() => {
    const observers = contentRefs.current.map((ref, index) => {
      if (!ref) return null;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveExperience(index);
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

  const handleExperienceClick = (index) => {
    setActiveExperience(index);
    contentRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleExperienceClick(index);
    }
  };

  return (
    <section className="w-full bg-black py-28 px-6 md:px-12">
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
                height: `${(activeExperience / (experiences.length - 1)) * 100}%`
              }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-20">
            {experiences.map((experience, index) => (
              <div key={experience.id} className="relative">
                {/* Timeline Dot */}
                <div 
                  className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-black z-10 transition-all duration-500 ${
                    index <= activeExperience 
                      ? 'bg-blue-600 border-blue-600' 
                      : 'bg-white border-white'
                  }`}
                />

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Experience Headers */}
                  <div className={`lg:pr-12 ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                    <button
                      ref={(el) => (experienceRefs.current[index] = el)}
                      onClick={() => handleExperienceClick(index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className={`text-left w-full p-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        index === activeExperience
                          ? 'bg-blue-600/10'
                          : 'hover:bg-white/5'
                      }`}
                      tabIndex="0"
                      aria-label={`${experience.company} - ${experience.position}`}
                    >
                      {/* Company Logo Placeholder */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 
                            className={`text-4xl font-bold font-heading transition-colors duration-300 ${
                              index === activeExperience 
                                ? 'text-blue-400' 
                                : 'text-white'
                            }`}
                          >
                            {experience.company}
                          </h3>
                          <p className="text-gray-300 font-medium">
                            {experience.position}
                          </p>
                        </div>
                      </div>

                      {/* Duration and Location */}
                      <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{experience.duration}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4" />
                          <span>{experience.location}</span>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Right Side - Experience Content */}
                  <div 
                    ref={(el) => (contentRefs.current[index] = el)}
                    className={`lg:pl-12 transition-all duration-500 ${
                      index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'
                    } ${
                      index === activeExperience 
                        ? 'opacity-100 transform translate-x-0' 
                        : 'opacity-60 transform translate-x-4'
                    }`}
                  >
                    <div className="bg-transparent">
                      {/* Key Achievements */}
                      <div className="mb-6">
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Key Achievements & Responsibilities
                        </h4>
                        <ul className="space-y-3">
                          {experience.achievements.map((achievement, achievementIndex) => (
                            <li
                              key={achievementIndex}
                              className="text-gray-300 flex items-start"
                            >
                              <span className="text-blue-400 mr-3 mt-1 text-lg">•</span>
                              <span className="leading-relaxed">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies Used */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-4">
                          Technologies & Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium border border-blue-600/30"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Summary */}
        <div className="mt-20 text-center">
          <div className="bg-transparent max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4 font-heading">
              Professional Journey Summary
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              With over 9 years of hands-on experience across multiple organizations, I've consistently delivered 
              high-quality full-stack solutions, from startup environments to enterprise-level applications. 
              My journey reflects a commitment to continuous learning, technical excellence, and client satisfaction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

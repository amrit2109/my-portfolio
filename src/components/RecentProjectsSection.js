"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const RecentProjectsSection = ({
  heading,
  projects,
}) => {
  const handleBrowseClick = () => {
    // Handle browse all button click
    console.log("Browse all projects clicked");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleBrowseClick();
    }
  };

  const handleCaseStudyClick = (link) => {
    // Handle case study link click
    console.log(`Case study clicked: ${link}`);
  };

  const handleCaseStudyKeyDown = (e, link) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCaseStudyClick(link);
    }
  };

  return (
    <section className="w-full  py-28 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16">
          {/* Main Heading */}
          <h2 className="text-6xl md:text-5xl font-extrabold font-heading text-black mb-6 md:mb-0 uppercase tracking-tight">
            {heading}
          </h2>

        </div>

        {/* Projects Grid - 2 columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                {/* Project Content - Left Side */}
                <div className="flex-1 p-6">
                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-black mb-3">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                    {project.description}
                  </p>

                  {/* Case Study Link */}
                  <button
                    className="text-black font-medium hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded flex items-center space-x-1"
                    onClick={() => handleCaseStudyClick(project.case_study_link)}
                    onKeyDown={(e) => handleCaseStudyKeyDown(e, project.case_study_link)}
                    tabIndex="0"
                    aria-label={`View case study for ${project.title}`}
                  >
                    <span>Case Study</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Project Image - Right Side */}
                <div className="relative w-full md:w-48 h-48 md:h-auto">
                  <Image
                    src={project.image_url}
                    alt={`${project.title} project screenshot`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentProjectsSection;

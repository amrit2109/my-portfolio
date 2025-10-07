"use client";

import { ArrowRight } from "lucide-react";

const Header = ({ logoText, navItems, contactButtonText }) => {
  const handleContactClick = () => {
    // Handle contact button click
    console.log("Contact button clicked");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleContactClick();
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    
    // If it's an anchor link, scroll to the section
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <>
    <header className="w-full px-6 py-4 md:px-12 md:py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight">
            {logoText}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-14">
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className={`text-base font-regular transition-colors duration-200 cursor-pointer ${
                item.text === "Home"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.text}
            </a>
          ))}
        </nav>

        {/* Contact Button */}
        <a href="mailto:amritpal8772@gmail.com"
          className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label={contactButtonText}
        >
          {contactButtonText}
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400"
          aria-label="Open mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </header>
    
    {/* Fixed Download Resume Button */}
    <a 
      href="https://drive.google.com/file/d/14Hj4L1OYd9NfM2_eR1k3T63vAo4E4B9Y/view?usp=sharing" 
      target="_blank" 
      className="fixed top-1/2 right-[-56px] transform -translate-y-1/2 bg-[#1b95ff] text-white px-4 py-2 text-sm font-medium hover:bg-[#0d7ae5] transition-colors duration-200 cursor-pointer z-50 rounded-t-md"
      style={{ transform: 'translateY(-50%) rotate(-90deg)' }}
    >
      Download Resume
    </a>
    </>
  );
};

export default Header;

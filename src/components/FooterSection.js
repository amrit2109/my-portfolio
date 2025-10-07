"use client";

export default function FooterSection({ 
  callToActionHeading = "INTERESTED IN WORKING TOGETHER?",
  emailPrompt = "Drop me an email:",
  emailAddress = "moskuralam07@gmail.com",
  copyrightText = "Copyright © 2023 Moskur Alam",
  socialLinks = [],
  backToTopText = "Back to Top ↑",
  backToTopHref = "#top"
}) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full  py-28 pb-10 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Call to Action Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold font-heading text-[var(--color-dark-text)] mb-6 leading-tight lg:max-w-4xl mx-auto">
            {callToActionHeading}
          </h2>
          <div className="text-lg text-[var(--color-dark-text)] mb-2">
            {emailPrompt}
          </div>
          <div className="text-xl md:text-2xl font-bold text-[var(--color-dark-text)]">
            {emailAddress}
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-[var(--color-gray-text)] mb-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-sm text-[var(--color-gray-text)] order-2 md:order-1">
            {copyrightText}
          </div>

          {/* Social Media Buttons */}
          <div className="flex items-center gap-3 order-1 md:order-2">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-4 py-2 rounded-md font-medium text-sm transition-colors duration-200 ${
                  social.platform === 'GitHub' 
                    ? 'bg-[var(--color-primary-blue)] text-white hover:bg-blue-600' 
                    : 'bg-white border border-gray-300 text-[var(--color-dark-text)] hover:bg-gray-50'
                }`}
              >
                {social.platform} →
              </a>
            ))}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="text-sm text-[var(--color-gray-text)] hover:text-[var(--color-primary-blue)] transition-colors duration-200 order-3 flex items-center gap-1"
          >
            {backToTopText}
          </button>
        </div>
      </div>
    </footer>
  );
}

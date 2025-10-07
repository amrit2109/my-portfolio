"use client";

import { 
  Code, 
  Globe, 
  FileText, 
  Server, 
  Zap, 
  Database, 
  HardDrive, 
  Cloud, 
  Layers, 
  Flame 
} from "lucide-react";

export default function AnimatedTechnologiesBanner({ 
  technologies = []
}) {
  // Map technology names to their corresponding icons
  const getTechnologyIcon = (techName) => {
    const iconMap = {
      'React.js': Code,
      'Next.js': Globe,
      'TypeScript': FileText,
      'Node.js': Server,
      'Express': Zap,
      'MongoDB': Database,
      'PostgreSQL': HardDrive,
      'AWS': Cloud,
      'Vercel': Layers,
      'Firebase': Flame
    };
    
    return iconMap[techName] || Code; // Default to Code icon if not found
  };

  // Duplicate technologies array to ensure seamless looping
  const duplicatedTechnologies = [...technologies, ...technologies];

  return (
    <section className="relative w-full h-44">
      {/* Diagonal Banner Container */}
        {/* Black background layers */}
          <div className="w-[101%] h-28 bg-black -mx-[9px] rotate-[4deg]"></div>
          

        {/* Coral Red Banner */}
        <div className="-mx-[9px] w-[101%] absolute top-0 bottom-0 left-0 right-0 h-28 md:h-28 lg:h-28 bg-[var(--color-coral-red)] flex items-center z-10" style={{ transform: "rotate(-3deg)" }}>
          {/* Animated Technologies Container */}
          <div className="flex items-center space-x-6 md:space-x-8 lg:space-x-12 animate-scroll">
            {duplicatedTechnologies.map((tech, index) => {
              const IconComponent = getTechnologyIcon(tech.name);
              return (
                <div key={index} className="flex items-center space-x-3 md:space-x-4 flex-shrink-0">
                  {/* Technology Icon */}
                  <IconComponent 
                    className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-white flex-shrink-0" 
                  />
                  
                  {/* Technology Name */}
                  <span className="text-white font-semibold text-sm md:text-base lg:text-3xl whitespace-nowrap">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      
      {/* CSS Animation Styles */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

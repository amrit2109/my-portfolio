"use client";

import { 
  Atom, 
  FileText, 
  Type, 
  Palette,
  Server, 
  Database, 
  Cloud, 
  Zap,
  Globe,
  Flame,
  Container
} from "lucide-react";

const AboutMeSection = ({
  heading,
  paragraphs,
  skillColumns,
}) => {
  // Icon mapping for technologies
  const getTechnologyIcon = (technology) => {
    const iconMap = {
      "React.js": Atom,
      "Next.js": FileText,
      "TypeScript": Type,
      "Tailwind CSS": Palette,
      "Node.js": Server,
      "Express": Database,
      "MongoDB": Database,
      "PostgreSQL": Database,
      "AWS": Cloud,
      "Vercel": Zap,
      "Firebase": Flame,
      "Docker": Container
    };
    
    return iconMap[technology] || Globe; // Default icon if not found
  };
  return (
    <section className="w-full py-20  px-6 md:px-12">
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Heading */}
        <h2 className="text-6xl font-extrabold text-black mb-8 uppercase tracking-tight font-heading">
          {heading}
        </h2>
        <div className="pl-16">

          {/* Paragraphs */}
          <div className="space-y-8 mb-20">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                 className="text-md md:text-lg text-black leading-relaxed font-light"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Skills Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {skillColumns.map((column, index) => (
              <div key={index}>
                {/* Column Title */}
                <h3 className="text-2xl font-bold text-black mb-6">
                  {column.title}
                </h3>

                {/* Column Items */}
                <ul className="space-y-4">
                  {column.items.map((item, itemIndex) => {
                    const IconComponent = getTechnologyIcon(item);
                    return (
                      <li
                        key={itemIndex}
                        className="text-lg text-gray-700 flex items-start"
                      >
                        <IconComponent className="text-gray-500 mr-4 mt-0.5 w-5 h-5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMeSection;

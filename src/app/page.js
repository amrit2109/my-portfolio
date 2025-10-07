"use client";

import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutMeSection from "../components/AboutMeSection";
import ExperienceSection from "../components/ExperienceSection";
import WorkingProcessTabsSection from "../components/WorkingProcessTabsSection";
import RecentProjectsSection from "../components/RecentProjectsSection";
import StatisticsBarSection from "../components/StatisticsBarSection";
import LatestNewsSection from "../components/LatestNewsSection";
import AnimatedTechnologiesBanner from "../components/AnimatedTechnologiesBanner";
import FooterSection from "../components/FooterSection";

export default function HomePage() {
  const headerProps = {
    logoText: "AMRIT.",
    navItems: [
      { text: "Home", href: "#hero" },
      { text: "About", href: "#about" },
      { text: "Experience", href: "#experience" },
      { text: "Projects", href: "#projects" },
      { text: "News", href: "#news" },
    ],
    contactButtonText: "Contact Me",
  };

  const heroProps = {
    pageTitle: "SENIOR FULL STACK DEVELOPER",
    description:
      "I'm Amritpal Singh, a Senior Full Stack Developer with over 9 years of hands-on experience in building high-performance, scalable web and mobile applications. I specialize in React.js, Next.js, Node.js, and modern UI frameworks, delivering pixel-perfect designs with optimized backend performance.",
    aboutButtonText: "Download Resume",
    scrollIndicatorText: "Keep Scrolling",
    imageUrl: "https://picsum.photos/400/400?random=1",
    imageAlt: "Amritpal Singh - Senior Full Stack Developer",
  };

  const aboutMeProps = {
    heading: "ABOUT ME",
    paragraphs: [
      "Hi there! I'm Amritpal Singh, a Senior Full Stack Developer with over 9 years of hands-on experience in building high-performance, scalable, and visually stunning web and mobile applications. I specialize in React.js, Next.js, Node.js, and modern UI frameworks — delivering pixel-perfect designs with optimized backend performance.",
      "Whether you need a fast, SEO-friendly Next.js web app, a dynamic React dashboard, a cross-platform React Native app, or a custom WordPress/Shopify site, I help businesses build reliable digital products with clean code and maintainable architecture. I approach each project with enthusiasm, creativity, and a focus on delivering high-quality solutions that exceed client expectations."
    ],
    skillColumns: [
      {
        title: "Frontend Development",
        items: [
          "React.js",
          "Next.js",
          "TypeScript",
          "Tailwind CSS"
        ]
      },
      {
        title: "Backend & Database",
        items: [
          "Node.js",
          "Express",
          "MongoDB",
          "PostgreSQL"
        ]
      },
      {
        title: "Cloud & DevOps",
        items: [
          "AWS",
          "Vercel",
          "Firebase",
          "Docker"
        ]
      }
    ]
  };

  const experienceProps = {
    heading: "PROFESSIONAL EXPERIENCE",
    experiences: [
      {
        id: "orion-esolutions",
        company: "Orion eSolutions Pvt. Ltd.",
        position: "Senior Full Stack Developer",
        duration: "2022 - Present",
        location: "Remote",
        achievements: [
          "Led development of scalable web applications serving 50,000+ users with React.js, Next.js, and Node.js",
          "Implemented responsive UI components using Tailwind CSS and TypeScript, improving user engagement by 40%",
          "Architected and deployed cloud-based solutions on AWS, reducing infrastructure costs by 30%",
          "Mentored junior developers and established coding standards, resulting in 25% faster project delivery"
        ],
        technologies: [
          "React.js", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB",
          "PostgreSQL", "AWS", "Tailwind CSS", "Firebase", "Docker"
        ]
      },
      {
        id: "gsquare-technologies",
        company: "GSquare Technologies Pvt. Ltd.",
        position: "Full Stack Developer",
        duration: "2019 - 2022",
        location: "Punjab, India",
        achievements: [
          "Developed cross-platform React Native applications with 4.8+ app store ratings",
          "Built custom WordPress and Shopify e-commerce solutions, increasing client sales by 60%",
          "Optimized backend APIs and database queries, improving application performance by 50%",
          "Collaborated with design teams to implement pixel-perfect, responsive web interfaces"
        ],
        technologies: [
          "React.js", "React Native", "Node.js", "WordPress", "Shopify",
          "MySQL", "SCSS", "Bootstrap", "Firebase", "Supabase"
        ]
      },
      {
        id: "logique-technologies",
        company: "Logique Technologies Pvt. Ltd.",
        position: "Full Stack Developer",
        duration: "2017 - 2019",
        location: "Punjab, India",
        achievements: [
          "Built dynamic web applications using React.js and modern JavaScript frameworks",
          "Developed RESTful APIs and integrated third-party services for seamless user experiences",
          "Implemented responsive designs with CSS3 and Bootstrap, ensuring cross-browser compatibility",
          "Participated in agile development processes and delivered projects within tight deadlines"
        ],
        technologies: [
          "React.js", "JavaScript", "Node.js", "Express", "MongoDB",
          "HTML5", "CSS3", "Bootstrap", "jQuery", "Git"
        ]
      }
    ]
  };

  const workingProcessProps = {
    heading: "MY DEVELOPMENT PROCESS",
    tabs: [
      {
        id: "discovery",
        number: "01.",
        title: "Discovery & Planning",
        content: "I start by thoroughly researching and understanding your business needs, goals, and technical requirements. This includes architecture planning, technology stack selection, and creating a detailed project roadmap."
      },
      {
        id: "development",
        number: "02.",
        title: "Development & Testing",
        content: "I implement clean, maintainable code using modern development practices. This includes comprehensive testing, performance optimization, and ensuring cross-browser compatibility and responsive design."
      },
      {
        id: "deployment",
        number: "03.",
        title: "Deployment & Support",
        content: "I handle seamless deployment using CI/CD pipelines, cloud infrastructure setup, and provide ongoing support and maintenance to ensure your application runs smoothly."
      }
    ]
  };

  const recentProjectsProps = {
    heading: "FEATURED PROJECTS",
    projects: [
      {
        title: "AI Dashboard",
        description: "Real-time analytics dashboard for AI automation systems with secure Firebase backend, dynamic charts, and modular architecture built with Next.js and ShadCN UI.",
        case_study_link: "/projects/ai-dashboard-case-study",
        image_url: "https://picsum.photos/seed/ai-dashboard/300/200"
      },
      {
        title: "E-Commerce Store",
        description: "Fully responsive headless e-commerce storefront using Shopify Storefront API with fast navigation and SEO-optimized performance.",
        case_study_link: "/projects/ecommerce-store-case-study",
        image_url: "https://picsum.photos/seed/ecommerce/300/200"
      },
      {
        title: "Mobile Delivery App",
        description: "Cross-platform delivery management app built with React Native and Expo, featuring Firebase backend, push notifications, and OTP authentication.",
        case_study_link: "/projects/mobile-delivery-case-study",
        image_url: "https://picsum.photos/seed/mobile-app/300/200"
      },
      {
        title: "Corporate Website",
        description: "SEO-optimized and performance-driven corporate website with custom post types, Gutenberg compatibility, and Elementor integration.",
        case_study_link: "/projects/corporate-website-case-study",
        image_url: "https://picsum.photos/seed/corporate/300/200"
      },
      {
        title: "Admin Panel System",
        description: "Full-featured admin dashboard with role-based permissions, analytics graphs, and activity logs built with React, Node.js, and MongoDB.",
        case_study_link: "/projects/admin-panel-case-study",
        image_url: "https://picsum.photos/seed/admin-panel/300/200"
      },
      {
        title: "Portfolio Website",
        description: "Modern, responsive portfolio website showcasing professional work with Next.js, Tailwind CSS, and optimized performance.",
        case_study_link: "/projects/portfolio-case-study",
        image_url: "https://picsum.photos/seed/portfolio/300/200"
      }
    ]
  };

  const statisticsProps = {
    stats: [
      {
        value: "150+",
        label: "Completed Projects"
      },
      {
        value: "100%",
        label: "Client Satisfaction"
      },
      {
        value: "9+",
        label: "Years Experience"
      }
    ]
  };

  const latestNewsProps = {
    heading: "LATEST TECH INSIGHTS",
    browseButtonText: "Browse All →",
    browseButtonLink: "/news",
    // Articles will be fetched dynamically from NewsAPI.org
    articles: []
  };

  const animatedTechnologiesProps = {
    technologies: [
      { name: "React.js", icon_shape: "hexagon" },
      { name: "Next.js", icon_shape: "hexagon" },
      { name: "TypeScript", icon_shape: "hexagon" },
      { name: "Node.js", icon_shape: "hexagon" },
      { name: "Express", icon_shape: "hexagon" },
      { name: "MongoDB", icon_shape: "hexagon" },
      { name: "PostgreSQL", icon_shape: "hexagon" },
      { name: "AWS", icon_shape: "hexagon" },
      { name: "Vercel", icon_shape: "hexagon" },
      { name: "Firebase", icon_shape: "hexagon" }
    ]
  };

  const footerProps = {
    callToActionHeading: "READY TO BUILD YOUR NEXT PROJECT?",
    emailPrompt: "Drop me an email:",
    emailAddress: "amritpal8772@gmail.com",
    copyrightText: "Copyright © 2024 Amritpal Singh Tiwana",
    socialLinks: [
      {
        platform: "GitHub",
        href: "https://github.com/amritpal-singh",
        icon: "github"
      },
      {
        platform: "LinkedIn",
        href: "https://linkedin.com/in/amritpal-singh-tiwana",
        icon: "linkedin"
      }
    ],
    backToTopText: "Back to Top ↑",
    backToTopHref: "#top"
  };

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden">
      <Header {...headerProps} />
      <section id="hero">
        <Hero {...heroProps} />
      </section>
      <AnimatedTechnologiesBanner {...animatedTechnologiesProps} />
      <section id="about">
        <AboutMeSection {...aboutMeProps} />
      </section>
      <section id="experience">
        <ExperienceSection {...experienceProps} />
      </section>
      {/* <WorkingProcessTabsSection {...workingProcessProps} /> */}
      <section id="projects">
        <RecentProjectsSection {...recentProjectsProps} />
      </section>
      <StatisticsBarSection {...statisticsProps} />
      <section id="news">
        <LatestNewsSection {...latestNewsProps} />
      </section>
      <AnimatedTechnologiesBanner {...animatedTechnologiesProps} />
      <FooterSection {...footerProps} />
    </div>
  );
}

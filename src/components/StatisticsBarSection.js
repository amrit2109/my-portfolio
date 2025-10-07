"use client";

export default function StatisticsBarSection({ stats = [] }) {
  return (
    <section className="w-full bg-[var(--color-coral-red)] py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left"
            >
              <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-none">
                {stat.value}
              </span>
              <span className="text-sm md:text-base lg:text-lg text-gray-200 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

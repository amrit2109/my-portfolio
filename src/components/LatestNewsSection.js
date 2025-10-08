"use client";

import { useState, useEffect } from 'react';
import { fetchTechNewsWithCache } from '../utils/newsApi';

export default function LatestNewsSection({ 
  heading = "LATEST NEWS FROM THE IT INDUSTRY",
  browseButtonText = "Browse All →",
  browseButtonLink = "/news", 
  articles: fallbackArticles = []
}) {
  const [articles, setArticles] = useState(fallbackArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const newsArticles = await fetchTechNewsWithCache(3); // Fetch 3 articles
        setArticles(newsArticles);
      } catch (err) {
        console.error('Failed to load news:', err);
        setError('Failed to load latest news. Showing cached content.');
        // Keep fallback articles if API fails
        setArticles(fallbackArticles);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [fallbackArticles]);

  return (
    <section className="w-full py-28 pb-32 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <h2 className="text-6xl md:text-4xl lg:text-6xl font-extrabold font-heading text-[var(--color-dark-text)] mb-4 md:mb-0 leading-tight">
            {heading}
          </h2>
          <a 
            href={browseButtonLink}
            className="flex items-center gap-2 bg-[var(--color-primary-blue)] text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            {browseButtonText}
          </a>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              ⚠️ {error}
            </p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Articles Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article 
                key={article.id || index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                {/* Article Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={article.image_url} 
                    alt={article.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = `https://picsum.photos/seed/tech-${index}/400/300`;
                    }}
                  />
                </div>
                
                {/* Article Content */}
                <div className="p-6">
                  {/* Date and Read Time */}
                  <div className="text-sm text-[var(--color-gray-text)] mb-4 flex items-center gap-2">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span>{article.read_time}</span>
                  </div>
                  
                  {/* Article Title */}
                  <h3 className="text-xl font-bold text-[var(--color-dark-text)] mb-4 leading-tight line-clamp-2">
                    {article.title}
                  </h3>
                  
                  {/* Article Description */}
                  {article.description && (
                    <p className="text-[var(--color-gray-text)] mb-4 line-clamp-3 text-sm">
                      {article.description}
                    </p>
                  )}
                  
                  {/* Read More Link */}
                  <a 
                    href={article.read_more_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[var(--color-primary-blue)] hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    Read More 
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No Articles State */}
        {!loading && articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-gray-text)] text-lg">
              No articles available at the moment. Please try again later.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

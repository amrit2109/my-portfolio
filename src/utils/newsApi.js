/**
 * NewsAPI.org service for fetching technology news articles
 * API Documentation: https://newsapi.org/docs
 */

const NEWS_API_KEY = '2297bc52ee3943c8bea8407ea1720799';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

/**
 * Calculate reading time based on article content
 * Assumes average reading speed of 200 words per minute
 * @param {string} content - Article content or description
 * @returns {string} - Formatted reading time
 */
function calculateReadingTime(content) {
  if (!content) return '2 Min Read';
  
  const wordsPerMinute = 200;
  const wordCount = content.split(' ').length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  return `${readingTime} Min Read`;
}

/**
 * Format date to a readable format
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Check if article is relevant to IT industry and AI
 * @param {Object} article - Article object from API
 * @returns {boolean} - True if article is IT/AI relevant
 */
function isITIndustryRelevant(article) {
  const title = (article.title || '').toLowerCase();
  const description = (article.description || '').toLowerCase();
  const content = (article.content || '').toLowerCase();
  
  // Keywords that indicate IT industry and AI content
  const itKeywords = [
    'artificial intelligence', 'ai', 'machine learning', 'ml', 'deep learning',
    'software development', 'programming', 'coding', 'developer', 'programmer',
    'web development', 'frontend', 'backend', 'full stack', 'react', 'angular', 'vue',
    'javascript', 'python', 'java', 'typescript', 'node.js', 'next.js',
    'cloud computing', 'aws', 'azure', 'google cloud', 'docker', 'kubernetes',
    'cybersecurity', 'data science', 'big data', 'database', 'sql', 'nosql',
    'devops', 'ci/cd', 'git', 'github', 'gitlab', 'agile', 'scrum',
    'mobile development', 'ios', 'android', 'flutter', 'react native',
    'blockchain', 'cryptocurrency', 'bitcoin', 'ethereum', 'web3',
    'iot', 'internet of things', 'automation', 'robotics',
    'tech startup', 'software company', 'tech industry', 'it industry',
    'api', 'microservices', 'serverless', 'edge computing',
    'quantum computing', 'neural network', 'computer vision', 'nlp'
  ];
  
  // Keywords to exclude (YouTube, sports, entertainment, etc.)
  const excludeKeywords = [
    'youtube', 'sports', 'football', 'basketball', 'soccer', 'cricket',
    'entertainment', 'celebrity', 'movie', 'music', 'gaming', 'video game',
    'politics', 'election', 'government', 'economy', 'stock market',
    'health', 'medical', 'covid', 'vaccine', 'fitness', 'diet',
    'travel', 'tourism', 'food', 'recipe', 'cooking', 'restaurant',
    'fashion', 'beauty', 'lifestyle', 'relationship', 'dating'
  ];
  
  const fullText = `${title} ${description} ${content}`;
  
  // Check for exclusion keywords first
  const hasExcludeKeyword = excludeKeywords.some(keyword => fullText.includes(keyword));
  if (hasExcludeKeyword) {
    return false;
  }
  
  // Check for IT/AI keywords
  const hasITKeyword = itKeywords.some(keyword => fullText.includes(keyword));
  return hasITKeyword;
}

/**
 * Fetch IT industry and AI news articles from NewsAPI.org
 * @param {number} pageSize - Number of articles to fetch (default: 5)
 * @returns {Promise<Array>} - Array of formatted article objects
 */
export async function fetchTechNews(pageSize = 5) {
  try {
    // Fetch more articles than needed to filter for IT/AI content
    const fetchSize = Math.max(pageSize * 3, 15);
    
    // Try multiple queries to get diverse IT/AI content
    const queries = [
      'artificial intelligence OR AI OR machine learning',
      'software development OR programming OR coding',
      'web development OR frontend OR backend',
      'cybersecurity OR cloud computing OR devops',
      'tech startup OR software company OR IT industry'
    ];
    
    let allArticles = [];
    
    // Fetch from different queries
    for (const query of queries) {
      try {
        const url = `${NEWS_API_BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&pageSize=5&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status === 'ok' && data.articles) {
            allArticles = allArticles.concat(data.articles);
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch from query "${query}":`, err);
      }
    }
    
    // If everything endpoint fails, fallback to technology category
    if (allArticles.length === 0) {
      const url = `${NEWS_API_BASE_URL}/top-headlines?category=technology&language=en&pageSize=${fetchSize}&apiKey=${NEWS_API_KEY}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`NewsAPI request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status !== 'ok') {
        throw new Error(`NewsAPI error: ${data.message || 'Unknown error'}`);
      }
      
      allArticles = data.articles || [];
    }

    // Filter articles for IT industry relevance
    const filteredArticles = allArticles.filter(isITIndustryRelevant);
    
    // Remove duplicates based on title
    const uniqueArticles = filteredArticles.filter((article, index, self) => 
      index === self.findIndex(a => a.title === article.title)
    );
    
    // Take only the requested number of articles
    const selectedArticles = uniqueArticles.slice(0, pageSize);

    // Transform the API response to match our component's expected format
    const articles = selectedArticles.map((article, index) => ({
      id: `article-${index}`,
      title: article.title || 'No title available',
      description: article.description || article.content || 'No description available',
      image_url: article.urlToImage || `https://picsum.photos/seed/tech-${index}/400/300`,
      date: formatDate(article.publishedAt),
      read_time: calculateReadingTime(article.description || article.content),
      read_more_link: article.url || '#',
      source: article.source?.name || 'Unknown Source',
      author: article.author || 'Unknown Author'
    }));

    // If we don't have enough filtered articles, supplement with fallback
    if (articles.length < pageSize) {
      const fallbackArticles = getFallbackArticles();
      const needed = pageSize - articles.length;
      articles.push(...fallbackArticles.slice(0, needed));
    }

    return articles;
  } catch (error) {
    console.error('Error fetching tech news:', error);
    
    // Return fallback articles in case of API failure
    return getFallbackArticles().slice(0, pageSize);
  }
}

/**
 * Fallback articles to display when API fails
 * @returns {Array} - Array of fallback article objects
 */
function getFallbackArticles() {
  return [
    {
      id: 'fallback-1',
      title: 'AI Revolution in Software Development',
      description: 'Artificial Intelligence is transforming how developers write code, with tools like GitHub Copilot and ChatGPT revolutionizing the programming landscape.',
      image_url: 'https://picsum.photos/seed/ai-development/400/300',
      date: formatDate(new Date().toISOString()),
      read_time: '6 Min Read',
      read_more_link: '#',
      source: 'AI Tech News',
      author: 'AI Research Team'
    },
    {
      id: 'fallback-2',
      title: 'Cloud Computing Trends 2024',
      description: 'Explore the latest trends in cloud computing, including serverless architectures, edge computing, and multi-cloud strategies shaping the IT industry.',
      image_url: 'https://picsum.photos/seed/cloud-computing/400/300',
      date: formatDate(new Date(Date.now() - 86400000).toISOString()), // Yesterday
      read_time: '7 Min Read',
      read_more_link: '#',
      source: 'Cloud Weekly',
      author: 'Cloud Architect'
    },
    {
      id: 'fallback-3',
      title: 'Cybersecurity in the AI Era',
      description: 'How artificial intelligence is both enhancing cybersecurity defenses and creating new attack vectors that IT professionals must understand.',
      image_url: 'https://picsum.photos/seed/cybersecurity-ai/400/300',
      date: formatDate(new Date(Date.now() - 172800000).toISOString()), // 2 days ago
      read_time: '8 Min Read',
      read_more_link: '#',
      source: 'Security Today',
      author: 'Security Expert'
    },
    {
      id: 'fallback-4',
      title: 'Machine Learning in DevOps',
      description: 'Discover how machine learning algorithms are automating deployment pipelines, monitoring systems, and improving software reliability.',
      image_url: 'https://picsum.photos/seed/ml-devops/400/300',
      date: formatDate(new Date(Date.now() - 259200000).toISOString()), // 3 days ago
      read_time: '5 Min Read',
      read_more_link: '#',
      source: 'DevOps Journal',
      author: 'ML Engineer'
    },
    {
      id: 'fallback-5',
      title: 'The Future of Web Development',
      description: 'Exploring emerging technologies like WebAssembly, Progressive Web Apps, and AI-powered development tools that are reshaping web development.',
      image_url: 'https://picsum.photos/seed/web-future/400/300',
      date: formatDate(new Date(Date.now() - 345600000).toISOString()), // 4 days ago
      read_time: '9 Min Read',
      read_more_link: '#',
      source: 'Web Dev Insights',
      author: 'Frontend Specialist'
    }
  ];
}

/**
 * Fetch news with caching to avoid hitting API limits
 * @param {number} pageSize - Number of articles to fetch
 * @returns {Promise<Array>} - Array of article objects
 */
export async function fetchTechNewsWithCache(pageSize = 5) {
  const cacheKey = `tech-news-${pageSize}`;
  const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  
  // Check if we have cached data
  if (typeof window !== 'undefined') {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < cacheExpiry) {
        return data;
      }
    }
  }
  
  // Fetch fresh data
  const articles = await fetchTechNews(pageSize);
  
  // Cache the data
  if (typeof window !== 'undefined') {
    localStorage.setItem(cacheKey, JSON.stringify({
      data: articles,
      timestamp: Date.now()
    }));
  }
  
  return articles;
}




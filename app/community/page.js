'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
export default function Page() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchArticles = async () => {
    try {
      console.log("Fetching articles...");  // Log before request

      const response = await axios.get('http://127.0.0.1:8000/api/articles/').then(
        (response) => {
        console.log(response.data);
        setArticles(response.data);
        setLoading(false);
      }
    ).catch((error) => {
        console.error('Error fetching articles:', error);  // Log error
    });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Data fetched:", data);  // Log fetched data
      
      setArticles(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);  // Log error
    }
  };

  fetchArticles();
}, []);
// Empty dependency array to fetch once

  return (
    <div style={styles.container}>
      <h1>Community Articles About Space</h1>
      <Link href="/community/create-article">
      <h1>
        Create an Article
      </h1>
      </Link>

      {loading ? (
        <p>Loading...</p>  // Show loading state while fetching
      ) : (
        <div>
          <h2>Published Articles</h2>
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} style={styles.article}>
                <h3>{article.title}</h3>
                <p>{article.content}</p>
                <small>Posted on {article.created_at}</small>
              </div>
            ))
          ) : (
            <p>No articles have been published yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  article: {
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
  },
};

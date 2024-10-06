'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import StarsCanvas from '../components/StarBackground'; // Import the StarsCanvas component

export default function Page() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        console.log("Fetching articles...");  // Log before request

        const response = await axios.get('http://127.0.0.1:8000/api/articles/');
        console.log(response.data);
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);  // Log error
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  // Empty dependency array to fetch once

  return (
    <>
      <StarsCanvas />
      <div style={styles.container}>
        <h1 style={styles.title}>Community Articles About Space</h1>
        <Link href="/community/create-article" style={styles.createArticle}>
          Create an Article
        </Link>

        {loading ? (
          <p style={styles.loading}>Loading...</p>  // Show loading state while fetching
        ) : (
          <div>
            <h2 style={styles.subtitle}>Published Articles</h2>
            {articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.id} style={styles.article}>
                  <h3 style={styles.articleTitle}>{article.title}</h3>
                  <p style={styles.articleContent}>{article.content}</p>
                  <small style={styles.articleDate}>Posted on {article.created_at}</small>
                </div>
              ))
            ) : (
              <p style={styles.noArticles}>No articles have been published yet.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'transparent', // Transparent background to show the star canvas
    color: '#FFFFFF', // Light text color
    minHeight: '100vh',
    position: 'relative', // Ensure the container is above the star canvas
    zIndex: 10, // Higher z-index to ensure it's above the star canvas
  },
  title: {
    fontSize: '2.5em',
    color: '#FFFFFF', // White text color
    textAlign: 'center',
    marginBottom: '20px',
    textShadow: '2px 2px 4px #000000', // Text shadow for better readability
  },
  createArticle: {
    fontSize: '1.5em',
    color: '#FFFFFF', // White text color
    textAlign: 'center',
    marginBottom: '40px',
    cursor: 'pointer',
    textShadow: '2px 2px 4px #000000', // Text shadow for better readability
    display: 'block', // Ensure the link is block-level for better clickability
    zIndex: 20, // Higher z-index to ensure it's above the star canvas
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: '#FFFFFF', // White text color
    textShadow: '2px 2px 4px #000000', // Text shadow for better readability
  },
  subtitle: {
    fontSize: '2em',
    color: '#FFFFFF', // White text color
    marginBottom: '20px',
    textShadow: '2px 2px 4px #000000', // Text shadow for better readability
  },
  article: {
    border: '1px solid #FFFFFF', // White border
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '10px',
    backgroundColor: 'rgba(31, 27, 36, 0.8)', // Slightly transparent dark background
  },
  articleTitle: {
    fontSize: '1.5em',
    color: '#FFFFFF', // White text color
    marginBottom: '10px',
  },
  articleContent: {
    fontSize: '1em',
    color: '#FFFFFF', // White text color
    marginBottom: '10px',
  },
  articleDate: {
    fontSize: '0.8em',
    color: '#FFFFFF', // White text color
  },
  noArticles: {
    textAlign: 'center',
    fontSize: '1.5em',
    color: '#FFFFFF', // White text color
    textShadow: '2px 2px 4px #000000', // Text shadow for better readability
  },
};
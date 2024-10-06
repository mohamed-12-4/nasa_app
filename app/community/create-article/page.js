'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateArticle() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);  // State to handle error messages
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();  // useRouter hook for client-side navigation

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Ensure title and content are not empty
      if (!title || !content) {
        setError("Title and content must be provided.");
        return;
      }

      // Add article to the server
      setLoading(true);
      await axios.post('http://127.0.0.1:8000/api/articles/', {
        title: title,
        content: content,
      });

      setLoading(false);
      setError(null);  // Clear error if successful

      // Redirect to community page after successful submission
      router.push('/community');

    } catch (error) {
      setLoading(false);
      console.error('Error adding article: ', error);
      setError('Failed to add the article. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Create an Article About Space</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <textarea
          placeholder="Write your article here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={styles.textarea}
          required
        ></textarea>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Posting...' : 'Post Article'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  form: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    height: '200px',
    padding: '10px',
    marginBottom: '10px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};
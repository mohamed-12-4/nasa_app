'use client'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import markdownit from "markdown-it";
import DOMPurify from 'dompurify';

const md = markdownit({});

export default function Home() {
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const searchParams = useSearchParams();
  const asteroidID = searchParams.get('id');
  const asteroidName = searchParams.get('name');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const f = (text) => {
    const htmlcontent = md.render(text);
    const sanitized = DOMPurify.sanitize(htmlcontent)
    return sanitized;
  }

  useEffect(() => {
    const fetchAsteroidData = async () => {
      try {
        const res = await axios.get(`https://api.nasa.gov/neo/rest/v1/neo/${asteroidID}?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`);
        setData(res.data);
      } catch (error) {
        console.error('Error fetching asteroid data:', error);
        setError('Failed to fetch asteroid data. Please try again later.');
      }
    };

    if (asteroidID) {
      fetchAsteroidData();
    }
  }, [asteroidID]);

  useEffect(() => {
    if (asteroidName) {
      const initialMessage = `Tell me about the asteroid named ${asteroidName}. Include its size, orbit, potential impact risk, and any known characteristics.`;
      setChatHistory([{ role: 'user', content: initialMessage }]);
    }
  }, [asteroidName]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === '') return;

    const newHistory = [...chatHistory, { role: 'user', content: input }];

    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: input,
        data: data,
        asteroidName: asteroidName,
        history: newHistory,
      }),
    });

    const responseData = await response.json();

    if (responseData.error) {
      alert('Error: ' + responseData.error);
      return;
    }

    setChatHistory([...newHistory, { role: 'ai', content: responseData.output }]);
    setInput('');
  };

  return (
    <>
    <div style={styles.container}>
      <h1 style={styles.title}>Asteroid Information Chat</h1>
      
      <div style={styles.chatBox}>
        {chatHistory.map((message, index) => (
          <div key={index} style={message.role === 'user' ? styles.userMessage : styles.aiMessage}>
            <strong>{message.role === 'user' ? 'You: ' : 'AI: '}</strong>
            
            <div dangerouslySetInnerHTML={{ __html: f(message.content) }} />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about an asteroid..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
    </>
  );
}

// Inline styles
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f4f4f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  chatBox: {
    maxHeight: '400px',
    overflowY: 'auto',
    border: '1px solid #ccc',
    padding: '10px',
    marginBottom: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
  },
  userMessage: {
    backgroundColor: '#d1e7dd',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',
    color: '#0f5132',
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#cff4fc',
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '10px',
    color: '#055160',
    alignSelf: 'flex-start',
  },
  form: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    marginRight: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    borderRadius: '10px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
};
import React, { useState } from 'react';
import { Zap, TrendingUp, PlayCircle } from 'lucide-react';

export default function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    try {
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `Berikan 3 hook viral dan 1 skrip video pendek untuk topik: ${topic}` }] }]
        })
      });
      const data = await response.json();
      setResult(data.candidates[0].content.parts[0].text);
    } catch (err) {
      alert("Pastikan API Key sudah terpasang di Vercel!");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = { backgroundColor: '#f0f4f8', minHeight: '100vh', display: 'flex', fontFamily: 'Arial, sans-serif' };
  const sidebarStyle = { width: '240px', backgroundColor: 'white', borderRight: '1px solid #d1d5db', padding: '20px' };
  const mainStyle = { flex: 1, padding: '40px' };
  const cardStyle = { backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto' };

  return (
    <div style={containerStyle}>
      <aside style={sidebarStyle}>
        <h1 style={{ color: '#4f46e5', fontSize: '24px', fontWeight: 'bold' }}>CreatorHub</h1>
      </aside>
      <main style={mainStyle}>
        <div style={cardStyle}>
          <h2>Viral Labs AI</h2>
          <textarea 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '10px' }} 
            rows="3" placeholder="Contoh: Tips masak nasi goreng..." 
            value={topic} onChange={(e) => setTopic(e.target.value)} 
          />
          <button 
            onClick={handleGenerate} 
            style={{ width: '100%', padding: '12px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', marginTop: '15px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {loading ? "Sedang Berpikir..." : "Bikin Konten Viral"}
          </button>
        </div>
        {result && (
          <div style={{ ...cardStyle, marginTop: '20px', backgroundColor: '#eef2ff' }}>
            <p style={{ whiteSpace: 'pre-wrap' }}>{result}</p>
          </div>
        )}
      </main>
    </div>
  );
}
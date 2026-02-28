import React, { useState } from 'react';
import { Zap, TrendingUp, PlayCircle, Loader2 } from 'lucide-react';

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

  return (
    <div style={{ backgroundColor: '#f0f4f8', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', backgroundColor: 'white', borderRight: '1px solid #d1d5db', padding: '20px' }}>
        <h1 style={{ color: '#4f46e5', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Zap style={{ marginRight: '10px' }} /> CreatorHub
        </h1>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ display: 'flex', alignItems: 'center' }}>
            <TrendingUp style={{ marginRight: '10px', color: '#4f46e5' }} /> Viral Labs AI
          </h2>
          <textarea 
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc', marginTop: '10px', boxSizing: 'border-box' }} 
            rows="3" 
            placeholder="Contoh: Tips masak nasi goreng..." 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)} 
          />
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            style={{ width: '100%', padding: '12px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', marginTop: '15px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {loading ? <Loader2 style={{ animation: 'spin 1s linear infinite', marginRight: '10px' }} /> : <PlayCircle style={{ marginRight: '10px' }} />}
            {loading ? "Sedang Berpikir..." : "Bikin Konten Viral"}
          </button>
        </div>

        {/* Result Area */}
        {result && (
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '15px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', maxWidth: '600px', margin: '20px auto', borderLeft: '5px solid #4f46e5' }}>
            <p style={{ whiteSpace: 'pre-wrap', color: '#374151', lineHeight: '1.6' }}>{result}</p>
          </div>
        )}
      </main>
    </div>
  );
}
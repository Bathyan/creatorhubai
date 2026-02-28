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
      alert("Cek koneksi atau API Key di Vercel Settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '240px', backgroundColor: 'white', borderRight: '1px solid #e2e8f0', padding: '20px' }}>
        <h1 style={{ color: '#4f46e5', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <Zap size={20} style={{ marginRight: '8px' }} /> CreatorHub
        </h1>
      </aside>
      <main style={{ flex: 1, padding: '40px' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
             <TrendingUp size={24} style={{ marginRight: '10px', color: '#4f46e5' }} /> Viral Labs AI
          </h2>
          <textarea 
            style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none' }} 
            placeholder="Topik konten Anda..." 
            value={topic} 
            onChange={(e) => setTopic(e.target.value)}
          />
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            style={{ width: '100%', marginTop: '20px', padding: '15px', backgroundColor: '#4f46e5', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {loading ? <Loader2 style={{ animation: 'spin 1s linear infinite', marginRight: '8px' }} size={18} /> : <PlayCircle style={{ marginRight: '8px' }} size={18} />}
            {loading ? "Memproses..." : "Bikin Konten Viral"}
          </button>
        </div>
        {result && (
          <div style={{ maxWidth: '600px', margin: '20px auto', padding: '20px', backgroundColor: '#eff6ff', borderRadius: '15px', borderLeft: '5px solid #4f46e5' }}>
            <p style={{ whiteSpace: 'pre-wrap', color: '#1e293b' }}>{result}</p>
          </div>
        )}
      </main>
    </div>
  );
}
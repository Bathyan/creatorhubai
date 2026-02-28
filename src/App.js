import React, { useState } from 'react';
import { Zap, TrendingUp, PlayCircle, Loader2, Copy, CheckCircle } from 'lucide-react';

export default function App() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setResult(null);
    setCopied(false);
    
    try {
      // Mengambil API Key dari Environment Variable Vercel
      const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ 
            parts: [{ 
              text: `Berikan 3 hook viral dan 1 skrip video pendek untuk topik: ${topic}. Format dengan poin-poin yang jelas.` 
            }] 
          }]
        })
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        throw new Error("Format API tidak sesuai");
      }
    } catch (err) {
      alert("Error: Cek kembali API Key di Vercel Settings dan pastikan sudah di-Redeploy.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: '260px', backgroundColor: 'white', borderRight: '1px solid #e2e8f0', padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#4f46e5', fontSize: '22px', fontWeight: 'bold', display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
          <Zap size={24} style={{ marginRight: '10px' }} fill="#4f46e5" /> CreatorHub AI
        </h1>
        <nav style={{ color: '#64748b', fontSize: '14px' }}>
          <p style={{ fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Menu Utama</p>
          <div style={{ display: 'flex', alignItems: 'center', color: '#4f46e5', backgroundColor: '#eef2ff', padding: '10px', borderRadius: '8px', marginBottom: '10px' }}>
            <TrendingUp size={18} style={{ marginRight: '10px' }} /> Viral Generator
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '50px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ backgroundColor: 'white', padding: '35px', borderRadius: '24px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>Viral Labs AI 🚀</h2>
            <p style={{ color: '#64748b', marginBottom: '25px' }}>Masukkan topik konten Anda dan biarkan AI bekerja.</p>
            
            <textarea 
              style={{ width: '100%', padding: '15px', borderRadius: '14px', border: '2px solid #e2e8f0', fontSize: '16px', minHeight: '120px', outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box' }} 
              placeholder="Contoh: Tips diet tanpa olahraga, Cara jualan laris di TikTok..." 
              value={topic} 
              onChange={(e) => setTopic(e.target.value)} 
            />

            <button 
              onClick={handleGenerate} 
              disabled={loading || !topic}
              style={{ width: '100%', padding: '16px', backgroundColor: loading ? '#94a3b8' : '#4f46e5', color: 'white', border: 'none', borderRadius: '14px', marginTop: '20px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s' }}
            >
              {loading ? (
                <>
                  <Loader2 style={{ animation: 'spin 1s linear infinite', marginRight: '10px' }} size={20} />
                  Sedang Meracik Konten...
                </>
              ) : (
                <>
                  <PlayCircle style={{ marginRight: '10px' }} size={20} />
                  Bikin Konten Viral
                </>
              )}
            </button>
          </div>

          {/* Result Area */}
          {result && (
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginTop: '30px', border: '1px solid #e2e8f0', position: 'relative' }}>
              <button 
                onClick={copyToClipboard}
                style={{ position: 'absolute', top: '20px', right: '20px', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', fontSize: '12px', color: '#64748b' }}
              >
                {copied ? <CheckCircle size={14} style={{ color: '#10b981', marginRight: '5px' }} /> : <Copy size={14} style={{ marginRight: '5px' }} />}
                {copied ? 'Tersalin!' : 'Salin Teks'}
              </button>
              <h3 style={{ fontSize: '18px', color: '#1e293b', marginBottom: '15px' }}>Hasil Generasi AI:</h3>
              <div style={{ whiteSpace: 'pre-wrap', color: '#334155', lineHeight: '1.8', fontSize: '15px' }}>
                {result}
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* CSS untuk animasi loading */}
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
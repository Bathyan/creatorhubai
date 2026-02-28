const handleGenerate = async () => {
  if (!topic.trim()) return;
  
  // Ambil API Key
  const apiKey = process.env.REACT_APP_GEMINI_API_KEY;

  // CEK APAKAH KEY TERBACA (Diagnosis)
  if (!apiKey) {
    alert("Kritikal: Vercel tidak bisa membaca REACT_APP_GEMINI_API_KEY. Pastikan sudah di-save di Environment Variables.");
    return;
  }

  setLoading(true);
  try {
    // Pastikan URL menggunakan apiKey yang benar
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Berikan 3 hook viral dan 1 skrip video pendek untuk topik: ${topic}` }] }]
      })
    });

    if (response.status === 404) {
      throw new Error("API Key tidak valid atau salah URL (Error 404)");
    }

    const data = await response.json();
    if (data.candidates) {
      setResult(data.candidates[0].content.parts[0].text);
    } else {
      setResult("Maaf, AI gagal memberikan respon. Coba lagi.");
    }
  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};
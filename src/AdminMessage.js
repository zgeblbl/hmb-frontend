import React, { useState, useEffect } from 'react';

function AdminMessage() {
  const [messages, setMessages] = useState([]); // Mesajları tutacak state
  const [loading, setLoading] = useState(true); // Yüklenme durumu
  const [error, setError] = useState(null); // Hata durumu

  // Mesajları backend'den almak için useEffect kullanıyoruz
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:9090/api/messages/getMessages'); // Backend'deki mesajları alma API'si
        if (!response.ok) {
          throw new Error('Mesajlar alınamadı');
        }
        const data = await response.json();
        setMessages(data); // Mesajları state'e kaydet
        setLoading(false); // Yüklenme bitti
      } catch (error) {
        setError(error.message); // Hata mesajını kaydet
        setLoading(false);
      }
    };

    fetchMessages(); // Fonksiyonu çağır
  }, []); // Boş dependency array, sadece component mount edildiğinde çalışır

  // Mesajları en yeni tarihten en eskiye doğru sıralama
  const sortedMessages = messages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  return (
    <div style={styles.container}>
      <h2>Admin Mesaj Paneli</h2>
      <div style={styles.panel}>
        {sortedMessages.length === 0 ? (
          <p>Henüz paylaşılmış bir mesaj yok.</p>
        ) : (
          sortedMessages.map((message) => (
            <div key={message.id} style={styles.messageBox}>
              <p><strong>İsim:</strong> {message.userName}</p>
              <p><strong>Email:</strong> {message.userEmail}</p>
              <p><strong>Mesaj:</strong> {message.userMessage}</p>
              <p><strong>Tarih:</strong> {new Date(message.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Stil ayarları
const styles = {
  container: {
    padding: '20px',
  },
  panel: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  messageBox: {
    marginBottom: '20px',
    padding: '15px',
    borderBottom: '1px solid #ccc',
  },
};

export default AdminMessage;

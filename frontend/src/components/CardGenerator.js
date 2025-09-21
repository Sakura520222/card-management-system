import React, { useState } from 'react';
import { generateCard } from '../api';
import './CardGenerator.css';

const CardGenerator = ({ username }) => {
  const [generatedCard, setGeneratedCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateCard = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await generateCard();
      setGeneratedCard(response.data);
    } catch (err) {
      setError('生成卡密失败: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card-generator">
      <h2>生成新卡密</h2>
      <div className="user-info">
        <p>当前用户: <strong>{username}</strong></p>
      </div>
      <button 
        onClick={handleGenerateCard} 
        disabled={loading}
        className="generate-button"
      >
        {loading ? '生成中...' : '生成卡密'}
      </button>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {generatedCard && (
        <div className="generated-card">
          <h3>生成的卡密:</h3>
          <div className="card-code">
            <strong>{generatedCard.card.card_code}</strong>
          </div>
          <div className="card-details">
            <p>生成日期: {generatedCard.card.generated_date}</p>
            <p>使用状态: {generatedCard.card.is_used ? '已使用' : '未使用'}</p>
            <p>所属用户: {username}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardGenerator;

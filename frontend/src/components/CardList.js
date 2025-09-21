import React, { useState, useEffect } from 'react';
import { getAllCards } from '../api';
import './CardList.css';

const CardList = ({ username }) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCards = async (pageNum) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getAllCards(pageNum, 10);
      setCards(response.data.cards);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      setError('获取卡密列表失败: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards(page);
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="card-list">
      <h2>卡密列表</h2>
      <div className="user-info">
        <p>当前用户: <strong>{username}</strong></p>
      </div>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="loading">加载中...</div>
      ) : (
        <>
          <div className="cards-table">
            <table>
              <thead>
                <tr>
                  <th>卡密代码</th>
                  <th>生成日期</th>
                  <th>使用状态</th>
                </tr>
              </thead>
              <tbody>
                {cards.map((card) => (
                  <tr key={card.id}>
                    <td>{card.card_code}</td>
                    <td>{card.generated_date}</td>
                    <td>{card.is_used ? '已使用' : '未使用'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pagination">
            <button 
              onClick={handlePrevPage} 
              disabled={page === 1}
            >
              上一页
            </button>
            <span>第 {page} 页，共 {totalPages} 页</span>
            <button 
              onClick={handleNextPage} 
              disabled={page === totalPages}
            >
              下一页
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CardList;

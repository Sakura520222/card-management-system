import React, { useState } from 'react';
import './App.css';
import CardGenerator from './components/CardGenerator';
import CardList from './components/CardList';

function App() {
  const [activeTab, setActiveTab] = useState('generate');
  const username = 'Sakura520222';

  return (
    <div className="App">
      <header className="App-header">
        <h1>卡密生成与管理系统</h1>
        <div className="user-context">
          <span>当前用户: {username}</span>
        </div>
      </header>
      
      <nav className="App-nav">
        <button 
          className={activeTab === 'generate' ? 'active' : ''}
          onClick={() => setActiveTab('generate')}
        >
          生成卡密
        </button>
        <button 
          className={activeTab === 'list' ? 'active' : ''}
          onClick={() => setActiveTab('list')}
        >
          卡密列表
        </button>
      </nav>
      
      <main className="App-main">
        {activeTab === 'generate' && <CardGenerator username={username} />}
        {activeTab === 'list' && <CardList username={username} />}
      </main>
      
      <footer className="App-footer">
        <p>© 2025 卡密生成与管理系统</p>
      </footer>
    </div>
  );
}

export default App;

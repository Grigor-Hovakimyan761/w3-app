import { useState } from 'react';
import PostCard from '../components/postcard/PostCard';
import './Profile.css';
import { IoSettingsOutline } from "react-icons/io5";
import { FaCopy } from "react-icons/fa";
import { SiSparkpost } from "react-icons/si";
import { BsBookmark } from "react-icons/bs";
import { IoPeopleSharp } from "react-icons/io5";



const Profile = () => {
  // Ստեղծում ենք վիճակներ (State) անջատիչի և տաբերի համար
  const [isConnectionsOpen, setIsConnectionsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="profile-container">

      {/* 1. Վերևի նավիգացիա */}
      <div className="profile-top-bar">
        <h2>@Grigor_Dev</h2>
        <button className="settings-icon-btn">
          <IoSettingsOutline />
        </button>
      </div>

      {/* 2. Օգտատիրոջ ինֆո */}
      <div className="user-details-section">
        <div className="avatar-circle">
          <span className="avatar-placeholder">👤</span>
        </div>
        <div className="user-academic-info">
          <span className="info-label">Ֆակուլտետ</span>
          <span className="info-value">Ինֆորմատիկա և Կիրառական Մաթեմատիկա</span>
          <span className="info-label">Կուրս</span>
          <span className="info-value">Ծրագրավորման հիմունքներ</span>
        </div>
      </div>

      {/* 3. Web3 ID */}
      <div className="web3-section">
        <span className="section-label">Web3 ID</span>
        <div className="web3-input-box">
          <span className="web3-address">0x3F8...B9a1</span>
          <button className="copy-btn">
            <FaCopy />
          </button>
        </div>
      </div>

      {/* 4. Ծանոթությունների կարգավորում (Toggle) */}
      <div className="connections-card">
        <div className="heart-icon-wrapper">
          <span>💖</span>
        </div>
        <div className="connections-text">
          <h4>Բաց է ծանոթությունների համար</h4>
          <p>Թույլ տալ մյուսներին ուղարկել հայտեր</p>
        </div>
        {/* Անջատիչի կոճակը, որը սեղմելիս փոխում է վիճակը */}
        <div
          className={`toggle-switch ${isConnectionsOpen ? 'active' : ''}`}
          onClick={() => setIsConnectionsOpen(!isConnectionsOpen)}
        >
          <div className="toggle-circle"></div>
        </div>
      </div>

      {/* 5. Վիճակագրություն (Stats) */}
      <div className="stats-row">
        <div className="stat-item">
          <span className="stat-number">475</span>
          <span className="stat-title">ռեյտինգ</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">4</span>
          <span className="stat-title">Նյութեր</span>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <span className="stat-number">12</span>
          <span className="stat-title">Կապեր</span>
        </div>
      </div>

      {/* 6. Տաբեր (Tabs) */}
      <div className="tabs-container">
        <button
          className={`tab-btn ${activeTab === 'posts' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          <SiSparkpost className="tab-icon" />
          Իմ Նյութերը
        </button>
        <button
          className={`tab-btn ${activeTab === 'saved' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('saved')}
        >
          <BsBookmark className="tab-icon" />
          Պահպանված
        </button>
        <button
          className={`tab-btn ${activeTab === 'requests' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <IoPeopleSharp className="tab-icon" />
          Հայտեր <span className="notification-dot"></span>
        </button>
      </div>

      {/* 7. Նյութերի ցանկ */}
      <div className="posts-feed">
        <PostCard
          title="React hooks and state management"
          authorNickname="Grigor_Dev"
          subjectTag="CompSci"
          initialLikes={89}
          initialDislikes={12}
        />
        <PostCard
          title="Advanced Calculus notes"
          authorNickname="Grigor_Dev"
          subjectTag="Math"
          initialLikes={9}
          initialDislikes={52}
        />
      </div>

    </div>
  );
};

export default Profile;
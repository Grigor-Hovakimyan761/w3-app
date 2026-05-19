import './PostDetail.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilePdf } from 'react-icons/fa';
import { BsDownload } from 'react-icons/bs';
import { FaHandPointUp } from "react-icons/fa6";
import { FaHandPointDown } from "react-icons/fa6";

const PostDetail = () => {
  return (
    <div className="post-detail-wrapper">
      
      {/* 1. Վերևի նավիգացիա */}
      <div className="detail-header">
        <IoArrowBack className="back-icon" />
        <span className="header-title">Գրառում</span>
      </div>

      {/* 2. Գլխավոր կոնտենտ */}
      <div className="post-main-card">
        <div className="post-title-row">
          <h1 className="post-large-title">Թերմոդինամիկա. Էնտրոպիա և Թերմոդինամիկայի երկրորդ օրենք</h1>
          <span className="subject-tag-badge">Physics</span>
        </div>

        <div className="post-author-row">
          <span className="author-handle">@QuantumLearner</span>
        </div>

        {/* Քվեարկության կոճակներ */}
        <div className="detail-vote-section">
          <button className="vote-btn upvote">
            <FaHandPointUp className="vote-icon" />
          </button>
          <span className="vote-num">42</span>
          <button className="vote-btn downvote">
            <FaHandPointDown className="vote-icon" />
          </button>
        </div>

        {/* 3. Նկարագրություն */}
        <div className="section-block">
          <h3 className="section-label">Նկարագրություն</h3>
          <p className="description-p">
            Այստեղ հավաքել եմ թերմոդինամիկայի իմ կոնսպեկտները, հատկապես կենտրոնանալով էնտրոպիայի և թերմոդինամիկայի երկրորդ օրենքի վրա: 
            PDF-ը ներառում է մանրամասն բանաձևեր, իրական օրինակներ և լուծված խնդիրներ: Հուսով եմ կօգնի քննության նախապատրաստման ժամանակ:
          </p>
          <ul className="key-topics-list">
            <li>Էնտրոպիայի սահմանումը և մաթեմատիկական բանաձևերը</li>
            <li>Դարձելի և ոչ դարձելի պրոցեսներ</li>
            <li>Ջերմային շարժիչներ և Կառնոյի ցիկլը</li>
          </ul>
        </div>

        {/* 4. Կցված ֆայլ */}
        <div className="section-block">
          <h3 className="section-label">Կցված Ֆայլ</h3>
          <div className="attachment-card">
            <div className="pdf-icon-box">
              <FaFilePdf />
            </div>
            <div className="file-info">
              <span className="file-name">Thermodynamics_Notes.pdf</span>
              <span className="file-meta">PDF Փաստաթուղթ • 2.4 MB • 24 էջ</span>
              
              {/* Ներբեռնման և Դիտման կոճակները կողք կողքի */}
              <div className="file-actions">
                <button className="preview-link">Դիտել նախապես</button>
                <button className="download-btn">
                  <BsDownload className="download-icon" /> Ներբեռնել
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Մեկնաբանություններ */}
        <div className="section-block">
          <h3 className="section-label">Մեկնաբանություններ (3)</h3>
          
          <div className="comment-card-box">
            <div className="comment-user-info">
              <span className="c-user">@PhysicsNerd99</span>
              <span className="c-time">2 ժամ առաջ</span>
            </div>
            <p className="c-text">Այս բացատրությունը ինձ շատ օգնեց լավ հասկանալ թեման: Շնորհակալություն կիսվելու համար:</p>
          </div>

          <div className="comment-card-box">
            <div className="comment-user-info">
              <span className="c-user">@StudyBuddy</span>
              <span className="c-time">1 ժամ առաջ</span>
            </div>
            <p className="c-text">Կարո՞ղ ես նաև բացատրել, թե ինչպես է սա կիրառվում երկրորդ օրենքի խնդիրներում:</p>
          </div>

          <div className="comment-card-box">
            <div className="comment-user-info">
              <span className="c-user">@MathWhiz</span>
              <span className="c-time">45 րոպե առաջ</span>
            </div>
            <p className="c-text">PDF-ի լուծումները շատ պարզ և հասկանալի են։ Հիանալի ռեսուրս է։</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default PostDetail;
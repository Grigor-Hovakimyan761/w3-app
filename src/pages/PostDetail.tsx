import './PostDetail.css';
import { IoArrowBack } from 'react-icons/io5';
import { FaFilePdf } from 'react-icons/fa';
import { BsDownload } from 'react-icons/bs';
import { FaHandPointUp } from "react-icons/fa6";
import { FaHandPointDown } from "react-icons/fa6";
import { useNavigate, useParams } from 'react-router-dom';
import { mockPosts, subjectLabelByValue } from '../data/mockPosts';

const formatFileSize = (size: number) => {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = mockPosts.find((mockPost) => mockPost.id === id);

  if (!post) {
    return (
      <div className="post-detail-wrapper">
        <div className="detail-header">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>
            <IoArrowBack className="back-icon" />
          </button>
          <span className="header-title">Գրառում</span>
        </div>
        <div className="post-main-card">
          <h1 className="post-large-title">Գրառումը չի գտնվել</h1>
          <p className="description-p">Այս նյութը դեռ չկա կամ հղումը սխալ է։</p>
        </div>
      </div>
    );
  }

  return (
    <div className="post-detail-wrapper">
      
      {/* 1. Վերևի նավիգացիա */}
      <div className="detail-header">
        <button className="back-button" type="button" onClick={() => navigate(-1)}>
          <IoArrowBack className="back-icon" />
        </button>
        <span className="header-title">Գրառում</span>
      </div>

      {/* 2. Գլխավոր կոնտենտ */}
      <div className="post-main-card">
        <div className="post-title-row">
          <h1 className="post-large-title">{post.title}</h1>
          <span className="subject-tag-badge">{subjectLabelByValue[post.subject]}</span>
        </div>

        <div className="post-author-row">
          <span className="author-handle">@{post.author_username}</span>
        </div>

        {/* Քվեարկության կոճակներ */}
        <div className="detail-vote-section">
          <button className="vote-btn upvote" type="button">
            <FaHandPointUp className="vote-icon" />
          </button>
          <span className="vote-num">{post.vote_score}</span>
          <button className="vote-btn downvote" type="button">
            <FaHandPointDown className="vote-icon" />
          </button>
        </div>

        {/* 3. Նկարագրություն */}
        <div className="section-block">
          <h3 className="section-label">Նկարագրություն</h3>
          <p className="description-p">{post.description}</p>
        </div>

        {/* 4. Կցված ֆայլ */}
        <div className="section-block">
          <h3 className="section-label">Կցված Ֆայլ</h3>
          {post.files.length > 0 ? (
            post.files.map((file) => (
              <div className="attachment-card" key={file.id}>
                <div className="pdf-icon-box">
                  <FaFilePdf />
                </div>
                <div className="file-info">
                  <span className="file-name">{file.file_name}</span>
                  <span className="file-meta">
                    {file.mime_type} • {formatFileSize(file.size_bytes)} • {file.ipfs_cid}
                  </span>
                  
                  <div className="file-actions">
                    <a className="preview-link" href={file.gateway_url} target="_blank" rel="noreferrer">
                      Դիտել նախապես
                    </a>
                    <a className="download-btn" href={file.gateway_url} target="_blank" rel="noreferrer">
                      <BsDownload className="download-icon" /> Ներբեռնել
                    </a>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="description-p">Այս գրառմանը ֆայլ դեռ կցված չէ։</p>
          )}
        </div>

        {/* 5. Մեկնաբանություններ */}
        <div className="section-block">
          <h3 className="section-label">Մեկնաբանություններ ({post.comment_count})</h3>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div className="comment-card-box" key={comment.id}>
                <div className="comment-user-info">
                  <span className="c-user">@{comment.author_username}</span>
                  <span className="c-time">{comment.created_at_label}</span>
                </div>
                <p className="c-text">{comment.body}</p>
              </div>
            ))
          ) : (
            <p className="description-p">Մեկնաբանություններ դեռ չկան։</p>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default PostDetail;

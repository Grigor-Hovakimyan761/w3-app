import './postCard.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaHandshake, FaHandPointDown, FaHandPointUp } from 'react-icons/fa6';
import { subjectLabelByValue } from '../../data/mockPosts';
import type { PostSubject } from '../../types/database';

export interface PostCardProps {
  id: string;
  author_username: string;
  title: string;
  description: string;
  vote_score: number;
  subject: PostSubject;
}

const tagClassBySubject: Record<PostSubject, string> = {
  math: 'tag-math',
  physics: 'tag-physics',
  chemistry: 'tag-general',
  programming: 'tag-cs',
  biology: 'tag-biology',
  general: 'tag-general',
};

const PostCard = ({ id, author_username, title, description, vote_score, subject }: PostCardProps) => {
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [score, setScore] = useState<number>(vote_score);
  const [isSaved, setIsSaved] = useState(false);

  const handleUpvote = () => {
    if (voteStatus === 'up') {
      setVoteStatus(null);
      setScore(score - 1);
    } else if (voteStatus === 'down') {
      setVoteStatus('up');
      setScore(score + 2);
    } else {
      setVoteStatus('up');
      setScore(score + 1);
    }
  };

  const handleDownvote = () => {
    if (voteStatus === 'down') {
      setVoteStatus(null);
      setScore(score + 1);
    } else if (voteStatus === 'up') {
      setVoteStatus('down');
      setScore(score - 2);
    } else {
      setVoteStatus('down');
      setScore(score - 1);
    }
  };

  return (
    <div className="post-card-container">
      <div className="post-top">
        <div className="post-info">
          <Link to={`/post/${id}`} className="post-title-link">
            <h3 className="post-title">{title}</h3>
          </Link>
          <span className="author-nickname">@{author_username}</span>
        </div>
        <span className={`subject-tag ${tagClassBySubject[subject]}`}>
          {subjectLabelByValue[subject]}
        </span>
      </div>

      <p className="post-content">{description}</p>

      <div className="divider" />

      <div className="post-bottom">
        <div className="vote-section">
          <div className="vote-item">
            <button 
              className={`upvote-btn ${voteStatus === 'up' ? 'active-up' : ''}`}
              onClick={handleUpvote}
              type="button"
              aria-label="Upvote post"
            >
              <FaHandPointUp />
            </button>
            <span className="vote-count">{score}</span>
            <button 
              className={`downvote-btn ${voteStatus === 'down' ? 'active-down' : ''}`}
              onClick={handleDownvote}
              type="button"
              aria-label="Downvote post"
            >
              <FaHandPointDown />
            </button>
          </div>
        </div>

        <div className="post-actions">
          <button className="connect-btn" type="button">
            <FaHandshake />
            <span>Connect</span>
          </button>
          <button
            className={`save-btn ${isSaved ? 'saved' : ''}`}
            type="button"
            aria-pressed={isSaved}
            aria-label={isSaved ? 'Remove saved post' : 'Save post'}
            onClick={() => setIsSaved((current) => !current)}
          >
            <FaBookmark />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

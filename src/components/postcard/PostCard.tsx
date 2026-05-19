import { useState } from 'react';
import './postCard.css';
import { FaHandPointUp, FaHandPointDown } from "react-icons/fa6";

interface PostCardProps {
  title: string;
  authorNickname: string;
  subjectTag: string;
  upvotes: number;
}

const PostCard = ({ title, authorNickname, subjectTag, upvotes }: PostCardProps) => {
  // Ստեղծում ենք state-ներ քվեարկության կարգավիճակի և թվի համար
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  const [votesCount, setVotesCount] = useState<number>(upvotes);

  // Upvote տրամաբանություն
  const handleUpvote = () => {
    if (voteStatus === 'up') {
      setVoteStatus(null); 
      setVotesCount(votesCount - 1);
    } else {
      setVoteStatus('up');
      setVotesCount(voteStatus === 'down' ? votesCount + 2 : votesCount + 1);
    }
  };

  // Downvote տրամաբանություն
  const handleDownvote = () => {
    if (voteStatus === 'down') {
      setVoteStatus(null);
      setVotesCount(votesCount + 1);
    } else {
      setVoteStatus('down');
      setVotesCount(voteStatus === 'up' ? votesCount - 2 : votesCount - 1);
    }
  };

  return (
    <div className="post-card-container">
      
      {/* Վերևի հատված՝ վերնագիր, հեղինակ և պիտակ (Tag) */}
      <div className="post-top">
        <div className="post-info">
          <h3 className="post-title">{title}</h3>
          <span className="author-nickname">@{authorNickname}</span>
        </div>
        {/* Պիտակը աջ կողմում */}
        <span className="subject-tag">{subjectTag}</span>
      </div>

      {/* Բաժանարար նուրբ գիծ նկարի նման */}
      <div className="divider"></div>

      {/* Ներքևի հատված՝ Գնահատականներ (Հորիզոնական) */}
      <div className="post-bottom">
        <div className="vote-section">
          {/* Ավելացրել ենք դինամիկ կլաս և onClick */}
          <button 
            className={`upvote-btn ${voteStatus === 'up' ? 'active-up' : ''}`}
            onClick={handleUpvote}
          >
            <FaHandPointUp />
          </button>
          
          <span className="vote-count">{votesCount}</span>
          
          {/* Ավելացրել ենք դինամիկ կլաս և onClick */}
          <button 
            className={`downvote-btn ${voteStatus === 'down' ? 'active-down' : ''}`}
            onClick={handleDownvote}
          >
            <FaHandPointDown />
          </button>
        </div>
      </div>

    </div>
  );
};

export default PostCard;
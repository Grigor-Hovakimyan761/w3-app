import { useState } from 'react';
import './postCard.css';
import { FaHandPointUp, FaHandPointDown } from "react-icons/fa6";

interface PostCardProps {
  title: string;
  authorNickname: string;
  subjectTag: string;
  initialLikes: number;    // Նախկին upvotes-ի փոխարեն
  initialDislikes: number; // Ավելացրել ենք դիսլայքերի սկզբնական թիվը
}

const PostCard = ({ title, authorNickname, subjectTag, initialLikes, initialDislikes }: PostCardProps) => {
  // Պահում ենք օգտատիրոջ ընտրությունը ('up', 'down', կամ null)
  const [voteStatus, setVoteStatus] = useState<'up' | 'down' | null>(null);
  
  // Պահում ենք երկու առանձին թվեր
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);

  const handleUpvote = () => {
    if (voteStatus === 'up') {
      // Եթե արդեն լայքել էր, հանում ենք լայքը (չեղարկում)
      setVoteStatus(null);
      setLikes(likes - 1);
    } else if (voteStatus === 'down') {
      // Եթե դիսլայք էր արել ու հիմա լայքում է՝ դիսլայքը հանում ենք, լայքը ավելացնում
      setVoteStatus('up');
      setDislikes(dislikes - 1);
      setLikes(likes + 1);
    } else {
      // Եթե ոչինչ չէր արել, պարզապես լայքում է
      setVoteStatus('up');
      setLikes(likes + 1);
    }
  };

  const handleDownvote = () => {
    if (voteStatus === 'down') {
      // Եթե արդեն դիսլայքել էր, հանում ենք դիսլայքը (չեղարկում)
      setVoteStatus(null);
      setDislikes(dislikes - 1);
    } else if (voteStatus === 'up') {
      // Եթե լայքել էր ու հիմա դիսլայքում է՝ լայքը հանում ենք, դիսլայքը ավելացնում
      setVoteStatus('down');
      setLikes(likes - 1);
      setDislikes(dislikes + 1);
    } else {
      // Եթե ոչինչ չէր արել, պարզապես դիսլայքում է
      setVoteStatus('down');
      setDislikes(dislikes + 1);
    }
  };

  return (
    <div className="post-card-container">
      
      <div className="post-top">
        <div className="post-info">
          <h3 className="post-title">{title}</h3>
          <span className="author-nickname">@{authorNickname}</span>
        </div>
        <span className="subject-tag">{subjectTag}</span>
      </div>

      <div className="divider"></div>

      <div className="post-bottom">
        <div className="vote-section">
          
          {/* ԼԱՅՔԵՐԻ ԲԼՈԿ */}
          <div className="vote-item">
            <button 
              className={`upvote-btn ${voteStatus === 'up' ? 'active-up' : ''}`}
              onClick={handleUpvote}
            >
              <FaHandPointUp />
            </button>
            <span className="vote-count">{likes}</span>
          </div>

          {/* ԴԻՍԼԱՅՔԵՐԻ ԲԼՈԿ */}
          <div className="vote-item">
            <button 
              className={`downvote-btn ${voteStatus === 'down' ? 'active-down' : ''}`}
              onClick={handleDownvote}
            >
              <FaHandPointDown />
            </button>
            <span className="vote-count">{dislikes}</span>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PostCard;
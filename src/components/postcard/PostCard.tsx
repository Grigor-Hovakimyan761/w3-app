import './postCard.css';
import { FaHandPointUp } from "react-icons/fa6";
import { FaHandPointDown } from "react-icons/fa6";



interface PostCardProps {
  title: string;
  authorNickname: string;
  subjectTag: string;
  upvotes: number;
}

const PostCard = ({ title, authorNickname, subjectTag, upvotes }: PostCardProps) => {
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
          <button className="upvote-btn">
            <FaHandPointUp />
          </button>
          <span className="vote-count">{upvotes}</span>
          <button className="downvote-btn">
            <FaHandPointDown />
          </button>
        </div>
      </div>

    </div>
  );
};

export default PostCard;
import SearchBar from '../components/SearchBar/SearchBar'
import PostCard from '../components/postcard/PostCard'
import { mockPosts } from '../data/mockPosts'
import './MainFeed.css'

function MainFeed() {
  return (
    <div className="main-feed">
      <SearchBar />
      <div className="main-feed-list">
        {mockPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  )
}

export default MainFeed

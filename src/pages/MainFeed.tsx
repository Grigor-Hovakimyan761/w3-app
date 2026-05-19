import SearchBar from '../components/SearchBar/SearchBar'
import PostCard from '../components/postcard/PostCard'

function MainFeed() {

  return (
   <div>
    <SearchBar />
    <div>
      {/* Կանչում ենք մեր կոմպոնենտը և փոխանցում ենք տվյալները */}
      <PostCard 
        title="Անալիտիկ երկրաչափության միջանկյալի հարցերը" 
        authorNickname="Tiko99" 
        subjectTag="Math" 
        upvotes={15} 
      />

      {/* Կարող ենք կանչել ևս մեկը՝ ուրիշ տվյալներով */}
      <PostCard 
        title="Ֆիզիկայի լաբորատոր աշխատանք №3" 
        authorNickname="Anna_Phys" 
        subjectTag="Physics" 
        upvotes={8} 
      />
    </div>
   </div>
  )
}

export default MainFeed

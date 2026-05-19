 import './searchBar.css'
 import { FaSearch } from "react-icons/fa";
import { BsSliders } from "react-icons/bs";




const SearchBar = () => {
  return (

    <div className="searchbar-container">

     <div className="searchbar">
         <button className="searchbar-button">
      <FaSearch />
      </button> 
      <input 
        type="text" 
        placeholder="Որոնել  նյութեր կամ թեմաներ... "  
        className="searchbar-input" 
      />
      </div>

      <button className='filter-button'>
        <BsSliders />
      </button>
     
    </div>
  );
};

export default SearchBar;
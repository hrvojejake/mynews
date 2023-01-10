import '../styles/Search.scss';
import { useMyNews } from '../context/MyNewsContext';

const Search = () => {
    const { searchTerm, setSearchTerm } = useMyNews();
    return(
        <div className='l-search-wrap'>
            <button className='mynews-Search c-search-icon-btn'></button>
            <input type='text' placeholder='Search news' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className='l-search' />
            <button className='c-search-btn'>Search</button>
        </div>
    )
}

export default Search;
import '../styles/Search.scss';

const Search = () => {
    return(
        <div className='l-search-wrap'>
            <button className='mynews-Search c-search-icon-btn'></button>
            <input type='text' placeholder='Search news' className='l-search' />
            <button className='c-search-btn'>Search</button>
        </div>
    )
}

export default Search;
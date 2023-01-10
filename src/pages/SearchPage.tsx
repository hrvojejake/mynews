import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from "@tanstack/react-query";
import '../styles/SearchPage.scss';
import { useMyNews } from '../context/MyNewsContext';


const SearchPage = ()=>{
   // const query = useParams()
    const { searchTerm, setSearchTerm } = useMyNews();
    console.log(searchTerm)
    const {data, isLoading, isError, refetch} = useQuery(['search',searchTerm],
    ()=>{
        return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&fq=headline:${searchTerm}&page=2&api-key=HfixMdACUwIoA3mza7zUOCw7XOjDsT4X`).then(res=>res.data)
    }, { staleTime: 6000,  enabled: false}
    )
    if(searchTerm.length >0){
   //if(isLoading)return <h1>Loading...</h1>
   if(isError)return <h1>Error...</h1>
   console.log(data)
}
console.log(searchTerm)

return (
    <>
    <h1>Search  {searchTerm} Search  {}</h1>
    <button onClick={() => refetch()}>Search</button>
    </>
)
}

export default SearchPage;
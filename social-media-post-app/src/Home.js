import React from 'react'
import Feed from './Feed'
import { useContext } from 'react'
import DataContext from "./Context/DataContext"
const Home = () => {
  const{fetchError,isLoading,searchResults}=useContext(DataContext)
  return (
    <main className='Home'>
      {isLoading&& <p className='statusMsg'>Loading posts...</p>}
      {!isLoading&&fetchError&& <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
      {!isLoading&&!fetchError&&(searchResults.length?<Feed searchResults={searchResults}/>:<p className='statusMsg'> No Posts to Display!!</p>)}
    </main>
  )
}

export default Home
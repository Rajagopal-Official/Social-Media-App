import Header from './Header'
import Nav from './Nav'
import Home from './Home'
import NewPost from './NewPost'
import Postpage from './Postpage'
import About from './About'
import Missing from './Missing'
import Footer from './Footer'
import {useEffect, useState} from 'react'
import Post from './Post'
import { Routes,Route, useNavigate } from 'react-router-dom'
import PostLayout from './PostLayout'
import {format} from "date-fns"
import api from './api/posts'
import Editpost from './Editpost'
import useWindowSize from "./hooks/useWindowSize"
import useAxiosFetch from './hooks/useAxiosFetch'
import { DataProvider } from './Context/DataContext'
function App() {
  const [posts,setPosts]=useState([])
  const[search,setSearch]=useState('')
  const[searchResults,setSearchResults]=useState([])
  const {width}=useWindowSize()
  useEffect(()=>{
    const filteredresults=posts.filter((post)=>
      ((post.body).toLowerCase()).includes(search.toLowerCase())||
      ((post.title).toLowerCase()).includes(search.toLowerCase()))
      setSearchResults(filteredresults.reverse())


  },[posts,search])
 
  const[postTitle,setPostTitle]=useState('')
  const[postBody,setPostBody]=useState('')
  const[editTitle,setEditTitle]=useState('')
  const[editBody,setEditBody]=useState('')
  const navigate=useNavigate()// Usenavigatehook is used for  navigate after performing a particular action.
  const{data,fetchError,isLoading}=useAxiosFetch("http://localhost:3500/posts")
  useEffect(()=>{setPosts(data)},[data])
  // useEffect(()=>{
  //   const fetchposts=async()=>{
  //     try{
  //       const response=await api.get('/posts')
  //       setPosts(response.data)
  //     }catch(err){
  //       if(err.response){
  //         console.log(err.response.data)
  //         console.log(err.response.status)
  //         console.log(err.response.headers)
  //       }
  //       else{
  //         console.log(`Error:${err.message}`)
  //       }
  //     }
     

  //   }
  //   fetchposts();
  // },[])
  const handleSubmit=async (e)=>{e.preventDefault()
  const id=posts.length?posts[posts.length-1].id+1:1
  const datetime=format(new Date(),'MMMM dd,yyyy pp')
  const newPost={id,title:postTitle,datetime,body:postBody}
  const response=await api.post('/posts',newPost)
  try{
    const allPosts=[...posts,response.data]
    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate("/")
  }catch(err){
      console.log(`Error:${err.message}`)
    }
 
  }
  const handleDelete=async(id)=>{
    try{
      await api.delete(`/posts/${id}`)
      const postsList=posts.filter(post=>post.id!==id)
      setPosts(postsList)
      navigate("/")

    }catch(err){
      console.log(`Error:${err.message}`)
    }
  }
  
    const handleEdit=async(id)=>{
      const datetime=format(new Date(),'MMMM dd,yyyy pp')
      const updatedPost={id,title:editTitle,datetime,body:editBody}
      try{
        const response =await api.put(`/posts/${id}`,updatedPost)
        setPosts(posts.map(post=>post.id===id?{...response.data}:post))
        setEditTitle('')
        setEditBody('')
        navigate("/")

      }catch(err){
      console.log(`Error:${err.message}`)
    }

  }
  
    return (
    <div className="App">
      <DataProvider>
          <Header title="My Social Media App" />
          <Nav />
          <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/post">
            <Route index element={<NewPost //NewPost Component will be rendered default ly since index is used. index is used o specify default path
              />}/>
              <Route path=":id" element={<Postpage />}/>
              </Route>
              <Route path="/edit/:id" element={<Editpost />}/>
            
            
            
            {/* <Postpage /> */}
            <Route path="/about" element={<About />}/>
            <Route path="*" element={<Missing />}/>
          </Routes>
          <Footer /> 
      </DataProvider>
      
    </div>
  );
}


export default App;

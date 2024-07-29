import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import "./Home.css"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Home = () => {
  const[data, setData] = useState([])
  const[searchValue, setSearchValue] = useState("Pakistan")
  const[pageSize, setPageSize] = useState(20)
  const[infiniteScrool, setInfiniteScrool] = useState(false)

  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = `https://newsapi.org/v2/everything?`
  
  useEffect(() => {
    if(searchValue in localStorage & !infiniteScrool) {
      setData(JSON.parse(localStorage.getItem(searchValue)))
    } 
    
    else {
      axios.get(`${baseUrl}q=${searchValue}&pageSize=${pageSize}&apiKey=${apiKey}`)
        .then((res) => {
          setData(res.data.articles)
          localStorage.setItem(searchValue, JSON.stringify(res.data.articles))
          setInfiniteScrool(false)
        })
        .catch((err) => {
          console.log(err)
          toast.error(err.response? err.response.data.message: err.message)
        })
      }

    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = e.target.documentElement.scrollTop + window.innerHeight;
      if (currentHeight + 1 >= scrollHeight) {
        setPageSize(pageSize + 20);
        setInfiniteScrool(true)
      }
    }

    window.addEventListener("scroll", handleScroll);

  }, [searchValue, pageSize])

  return (
    <>
      <SearchBar setSearchValue={setSearchValue} setPageSize={setPageSize} />
      <div className='hero'>
        <h1><span>News That Matters, 24/7. Stay Connected <br/> With Insight.</span></h1>
      </div>
      <div className='card-grid'>
        {data.map((item, index) => (
            <Card key={index} item={item}/>
        ))}
      </div>
      <ToastContainer 
        position="top-center"
        autoClose={false} />
    </>
  )
}

export default Home
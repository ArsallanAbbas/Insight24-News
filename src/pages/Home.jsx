import React, {useEffect, useRef, useState} from 'react'
import axios from 'axios'
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import "./Home.css"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Home = () => {
  const[data, setData] = useState([])
  const[searchValue, setSearchValue] = useState("bitcoin")
  const[pageSize, setPageSize] = useState(20)
  const[infiniteScrool, setInfiniteScrool] = useState(false)
  
  useEffect(() => {
    if(searchValue in localStorage & !infiniteScrool) {
      setData(JSON.parse(localStorage.getItem(searchValue)))
    } else {
      axios.get(`https://newsapi.org/v2/everything?q=${searchValue}&pageSize=${pageSize}&apiKey=dda5454b0f6a4a09a8a4099848ce8cc6`)
        .then((res) => {
          console.log(res)
          setData(res.data.articles)
          localStorage.setItem(searchValue, JSON.stringify(res.data.articles))
          setInfiniteScrool(false)
          console.log(JSON.parse(localStorage.getItem(searchValue)).length)
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: false,
          })
        })}

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
        <h1>News That Matters, 24/7. Stay Connected <br/> with Insight.</h1>
      </div>
      <div className='card-grid'>
        {data.map((item, index) => (
            <Card key={index} item={item}/>
        ))}
      </div>
      <ToastContainer />
    </>
  )
}

export default Home
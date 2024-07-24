import React, {useEffect, useState} from 'react'
import axios from 'axios'
import SearchBar from "../components/SearchBar"
import Card from "../components/Card"
import "./Home.css"
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

const Home = () => {
  const[data, setData] = useState([])
  const[searchValue, setSearchValue] = useState("bitcoin")
  
  useEffect(() => {
    if(searchValue in localStorage) {
      setData(JSON.parse(localStorage.getItem(searchValue)))
    } else {
      axios.get(`https://newsapi.org/v2/everything?q=${searchValue}&pageSize=20&apiKey=dda5454b0f6a4a09a8a4099848ce8cc6`)
        .then((res) => {
          console.log(res)
          setData(res.data.articles)
          localStorage.setItem(searchValue, JSON.stringify(res.data.articles))
        })
        .catch((err) => {
          toast.error(err.response.data.message, {
            position: "top-center",
            autoClose: false,
          })
        })}
  }, [searchValue])

  return (
    <>
      <SearchBar setSearchValue={setSearchValue}/>
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
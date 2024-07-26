import React, {useState} from 'react'
import "./SearchBar.css"
import logo from "../assets/logo.png"

const SearchBar = ({setSearchValue, setPageSize}) => {
  const[input, setInput] = useState("");

  function handleSubmit (e) {
    e.preventDefault();
    setSearchValue(input);
    setInput("");
    setPageSize(input in localStorage? JSON.parse(localStorage.getItem(input)).length: 20)
  }
  
  return (
    <nav className='navbar'>
      <img className='logo' src={logo} alt="logo" />
      <form onSubmit={handleSubmit}>
        <input className='input-field' type="text" value={input} onChange={e => setInput(e.target.value)} placeholder='Search articles'/>
      </form>
    </nav>
  )
}

export default SearchBar
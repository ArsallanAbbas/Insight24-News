import React, {useState} from 'react'
import "./SearchBar.css"

const SearchBar = ({setSearchValue}) => {
  const[input, setInput] = useState("");

  function handleSubmit (e) {
    e.preventDefault();
    setSearchValue(input);
    setInput("");
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className='input-field' type="text" value={input} onChange={e => setInput(e.target.value)}/>
      </form>
    </>
  )
}

export default SearchBar
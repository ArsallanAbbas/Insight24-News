import React from 'react'
import "./Card.css"

const Card = ({item}) => {

  function handleClick () {
    window.open(item.url)
  }

  return (
    <>
      <div className='card' onClick={handleClick}>
        <h2>{item.title}</h2>
        <p className='title'>{item.description}</p>
        <button className='button'>Source: {item.source.name}</button>
        <button className='button'>Published Date: {new Date(item.publishedAt).toLocaleDateString()}</button>
      </div>
    </>
  )
} 

export default Card
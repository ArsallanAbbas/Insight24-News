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
        <p className='item'>Source: {item.source.name}</p>
        <p className='date'>Published Date: {new Date(item.publishedAt).toLocaleDateString()}</p>
      </div>
    </>
  )
} 

export default Card
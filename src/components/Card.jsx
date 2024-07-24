import React from 'react'
import "./Card.css"

const Card = ({item}) => {
  function handleClick () {
    window.open(item.url)
  }

  return (
    <>
      <div className='card' onClick={handleClick}>
        <img src={item.urlToImage} alt='atrticle image'/>
        <div className='container'>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.source.name}</p>
          <p>{new Date(item.publishedAt).toLocaleDateString()}</p>
        </div>  
      </div>
    </>
  )
}

export default Card
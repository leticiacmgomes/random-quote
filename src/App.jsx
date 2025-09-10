import { useState, useEffect } from 'react'
import axios from 'axios'

import iconRegroup from "./assets/resources/regroup.svg"
import iconLink from "./assets/resources/link.svg"

import './App.css'

function App() {

  const [quotes, setQuotes] = useState([])
  const [currentQuote, setCurrentQuote] = useState(null)

  const fetchApi = async () => {
    try {
      const response = await axios.get('https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json')
      setQuotes(response.data)
      
      const randomNum = Math.floor(Math.random() * response.data.length)
      setCurrentQuote(response.data[randomNum])
    } catch (error) {
      alert(error)
    }
  }

  const getRandomQuote = () => {
    const randomNum = Math.floor(Math.random() * quotes.length)
    setCurrentQuote(quotes[randomNum])
  }

  useEffect(() => {
    fetchApi()
  }, [])

  const copyQuote = () => {
    navigator.clipboard.writeText(currentQuote.quote)
    .then(() => alert('Copiado para a área de transferência!'))
    .catch(error => console.error(error))
  }

  return (
    <div className="App">
      { currentQuote?
        <>
          <div className="quote-box">
            <span className="author">
              {currentQuote.author}
            </span>
            <div className="tags">
              <span className='tag'>{currentQuote.tags[0]}</span>
              <span className='tag'>{currentQuote.tags[1]}</span>
            </div>
            <p className="quote">
              {currentQuote.quote}
            </p>
          </div>
          <div className="menu">
            <button onClick={getRandomQuote}>
              random
              <img src={iconRegroup} alt="Icon regroup" />
            </button>
            <button onClick={copyQuote}>
              share
              <img src={iconLink} alt="Icon link" />
            </button>
          </div>
        </> :
        <span className='loading'></span>
      }
    </div>
  )
}

export default App

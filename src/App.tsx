import { useCallback, useEffect, useState } from 'react'
import './App.css'
import wordList from './wordList.json'
import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing'
import HangmanWord from './components/HangmanWord/HangmanWord'
import Keyboard from './components/Keyboard/Keyboard'

function App() {

  const getNewWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)]
  }

  const [wordToGuess, setWordToGuess ] = useState(getNewWord)
  
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])
  const incorrectLetters = guessedLetters.filter( letter => !wordToGuess.includes(letter) ) 
  
  const addGuessedLetter = useCallback((letter:string) => {
    if(guessedLetters.includes(letter)) return
    setGuessedLetters(currentLetters => [...currentLetters, letter])
  }, [guessedLetters])

  const isWinner = wordToGuess.split('').every(letter => guessedLetters.includes(letter))
  const isLoser = incorrectLetters.length >= 6 //6 body parts / wrong guesses

  //useEffect for keypress when guessing the word
  useEffect(() => {
    const handlerForPressedKey = (e: KeyboardEvent) => {
      const key = e.key
      if (!key.match(/^[a-z]$/)) return
      e.preventDefault()
      addGuessedLetter(key)
    }
    
    (isWinner || isLoser) ?
      document.removeEventListener('keypress', handlerForPressedKey)
      :
      document.addEventListener('keypress', handlerForPressedKey)

    return () => {
      document.removeEventListener('keypress', handlerForPressedKey)
    }

  }, [guessedLetters])

  //useEffect for enter keypress (get new word)
  useEffect(() => {
    const handlerForEnter = (e: KeyboardEvent) => {
      const key = e.key
      if (key !== 'Enter') return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getNewWord())
    }
  
    document.addEventListener('keypress', handlerForEnter)

    return () => {
      document.removeEventListener('keypress', handlerForEnter)
    }
    
  }, [])
  

  return (
    <div id="mainDiv">
      <h1>Hangman game</h1>

      <div id='content'>
        {isWinner && 'Winner! You guessed the word - Refresh to try again'}
        {isLoser && 'Nice try! Better luck next time - Refresh to try again'}
      </div>

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />

      <HangmanWord reveal={isLoser} wordToGuess={wordToGuess} guessedLetters={guessedLetters} />

      <div style={{alignSelf: 'stretch'}}>
        <Keyboard activeLetters={guessedLetters.filter(letter => wordToGuess.includes(letter))}
        inactiveLetters={incorrectLetters}
        addGuessedLetter={addGuessedLetter}
        winnerOrLoser={isWinner || isLoser} />
      </div>

    </div>
  )
}

export default App

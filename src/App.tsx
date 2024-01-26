import { useCallback, useEffect, useState } from 'react'
import './App.css'
import wordList from './wordList.json'
import wordListESP from './wordListESP.json'
import HangmanDrawing from './components/HangmanDrawing/HangmanDrawing'
import HangmanWord from './components/HangmanWord/HangmanWord'
import Keyboard from './components/Keyboard/Keyboard'
import ConfettiExplosion from 'react-confetti-explosion';


function App() {

  const [language, setLanguage] = useState('en');

  const getNewWord = () => {
    return wordList[Math.floor(Math.random() * wordList.length)]
  }

  const getNewWordESP = () => {
    return wordListESP[Math.floor(Math.random() * wordListESP.length)]
  }

  const handleChangeLanguage = (lang:string) => {
    setLanguage(lang)
    setGuessedLetters([])
    lang === 'en' ? setWordToGuess(getNewWord()) : setWordToGuess(getNewWordESP())
  }

  const [wordToGuess, setWordToGuess ] = useState(language === 'en' ? getNewWord : getNewWordESP)
  
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
      language === 'en' ? setWordToGuess(getNewWord()) : setWordToGuess(getNewWordESP())
    }
  
    document.addEventListener('keypress', handlerForEnter)

    return () => {
      document.removeEventListener('keypress', handlerForEnter)
    }
    
  }, [])
  

  return (
    <div id="mainDiv">
      <h1 style={{marginBottom: '0'}}>Hangman game</h1>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <h5 onClick={() => handleChangeLanguage('en') } style={{marginRight: '10px', color: language === 'en' ? 'black' : 'grey', cursor: 'pointer', borderBottom: '2px solid'}}>ENGLISH</h5>
        <h5 onClick={() => handleChangeLanguage('es')} style={{color: language === 'es' ? 'black' : 'grey', cursor: 'pointer', borderBottom: '2px solid'}}>ESPAÑOL</h5>
      </div>
      {isWinner && <ConfettiExplosion duration={5000} particleCount={250} particleSize={20} width={window.innerWidth} />}

      <div id='content'>
        {isWinner && language === 'en' && 'Winner! You guessed the word - Press Enter to try again'}
        {isLoser && language === 'en' && 'Nice try! Better luck next time - Press Enter to try again'}

        {isWinner && language === 'es' && 'Ganador! - Presiona Enter para intentar de nuevo'}
        {isLoser && language === 'es' && 'Casi! Sigue probando - Presiona Enter para intentar de nuevo'}
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

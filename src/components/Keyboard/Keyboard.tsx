import './keyboard.css'

type KeyboardProps = {
  activeLetters: string[],
  inactiveLetters: string[],
  addGuessedLetter: (letter: string) => void,
  winnerOrLoser? : boolean
}

const Keyboard = ({activeLetters, inactiveLetters, addGuessedLetter, winnerOrLoser = false}: KeyboardProps) => {


  const KEYS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']


  return (
    <div id='keyboardDiv'>
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key)
        const isInactive = inactiveLetters.includes(key)

        return (
          <button key={key} onClick={winnerOrLoser ? () => {return} : () => addGuessedLetter(key)} className={`key ${isActive && 'active'} ${isInactive && 'inactive'} ${winnerOrLoser && 'inactive'}`}>{key}</button>
        )
      })}
    </div>
  )
}

export default Keyboard
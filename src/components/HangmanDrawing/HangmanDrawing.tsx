import './hangmanDrawing.css'

type HangManDrawingProps = {
  numberOfGuesses: number
}
const HangmanDrawing = ( {numberOfGuesses}: HangManDrawingProps) => {

  const HEAD = <div id='head'/>
  const BODY = <div id='body'/>
  const RIGHT_ARM = <div id='right-arm'/>
  const LEFT_ARM = <div id='left-arm'/>
  const RIGHT_LEG = <div id='right-leg'/>
  const LEFT_LEG = <div id='left-leg'/>

  const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];


  return (
    <div id='hangmanMainDiv'>
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div id='littleBar'/>
      <div id='topBar'/>
      <div id='bar'/>
      <div id='bottomBar'/>
    </div>
  )
}

export default HangmanDrawing
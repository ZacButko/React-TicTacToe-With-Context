import {useContext} from 'react'
import {GameProvider, GameContext} from './GameContext'
import TicTacToeBoard from './TicTacToeBoard'

const Reset = () => {
  const {reset} = useContext(GameContext)
  return (
    <button style={{margin: '0.5rem'}} onClick={reset}>
      Reset?
    </button>
  )
}

const Status = () => {
  const {gameState, winner, xIsNext} = useContext(GameContext)
  const statusText =
    gameState === 'START'
      ? 'Game Start'
      : gameState === 'WIN'
      ? `Winner: ${winner}`
      : gameState === 'TIE'
      ? `Scratch: Cat's game`
      : gameState === 'IN_PROGRESS'
      ? `Next player: ${xIsNext ? 'X' : '0'}`
      : 'Something went wrong...'

  return <div className="status">{statusText}</div>
}

const History = () => {
  const {history} = useContext(GameContext)
  if (!history.length) return null

  return history.map((hist) => <p key={hist}>{hist}</p>)
}

const Error = () => {
  const {error} = useContext(GameContext)
  if (!error) return null
  return <div style={{color: 'red'}}>{error}</div>
}

const Game = () => {
  return (
    <GameProvider>
      <div className="game">
        <div>
          <Reset />
          <Status />
          <TicTacToeBoard />
          <History />
          <Error />
        </div>
      </div>
    </GameProvider>
  )
}

export default Game

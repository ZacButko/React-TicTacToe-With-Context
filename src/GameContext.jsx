import {createContext, useState} from 'react'
import calculateWinner from './calculateWinner'

const dbs = {
  //defaultBoardState
  xIsNext: true,
  boardState: Array(9).fill(null),
  gameState: 'START',
  history: [],
  error: null,
  winner: null,
  winningLine: [],
  statusText: 'Game Start',
  selectSquare: () => undefined,
}

const GameContext = createContext(dbs)

const GameProvider = ({children}) => {
  // this is the only state being managed
  const [xIsNext, setXIsNext] = useState(dbs.xIsNext)
  const [boardState, setBoardState] = useState(dbs.boardState)
  const [history, setHistory] = useState(dbs.history)
  const [error, setError] = useState(dbs.error)

  // these are all the secndary states which are infered from primary
  const {winner, winningLine} = calculateWinner(boardState)

  const gameState =
    history.length === 0
      ? 'START'
      : winner
      ? 'WIN'
      : boardState.every(Boolean)
      ? 'TIE'
      : 'IN_PROGRESS'

  // actions
  const selectSquare = (index) => {
    if (gameState === 'TIE' || gameState === 'WIN') {
      setError('No more plays... game is already over')
    } else if (boardState[index] !== null) {
      setError("Can't play over another player!")
    } else {
      setError(null)
      const tempBoard = [...boardState]
      tempBoard[index] = xIsNext ? 'X' : '0'
      setBoardState(tempBoard)
      setHistory([...history, `${xIsNext ? 'X' : '0'} moves ${index}`])
      setXIsNext(!xIsNext)
    }
  }

  const reset = () => {
    setXIsNext(dbs.xIsNext)
    setBoardState(dbs.boardState)
    setHistory(dbs.history)
    setError(dbs.error)
  }

  const state = {
    xIsNext,
    boardState,
    gameState,
    history,
    error,
    winner,
    winningLine,
  }
  const actions = {selectSquare, reset}

  return (
    <GameContext.Provider value={{...state, ...actions}}>
      {children}
    </GameContext.Provider>
  )
}

export {GameProvider, GameContext}

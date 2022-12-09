import {useContext} from 'react'
import {GameContext} from './GameContext'

const Square = ({index}) => {
  const {boardState, selectSquare, winningLine} = useContext(GameContext)
  return (
    <button
      className="square"
      onClick={() => selectSquare(index)}
      style={{backgroundColor: winningLine.includes(index) ? 'yellow' : null}}
    >
      {boardState[index]}
    </button>
  )
}

const Board = () => {
  return [0, 1, 2].map((row) => (
    <div className="board-row" key={`row-${row}`}>
      {[0, 1, 2].map((col) => (
        <Square index={row * 3 + col} key={col} />
      ))}
    </div>
  ))
}

export default Board

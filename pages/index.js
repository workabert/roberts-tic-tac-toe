import { useState, useEffect } from 'react'

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
]

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [winner, setWinner] = useState(null)
  const [winLine, setWinLine] = useState([])
  const [isDraw, setIsDraw] = useState(false)

  useEffect(() => {
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a])
        setWinLine([a, b, c])
        return
      }
    }

    const empty = squares.includes(null);
    const xPossible = lines.some(([a, b, c]) => {
      const line = [squares[a], squares[b], squares[c]];
      return line.includes(null) && !line.includes('O');
    });
    const oPossible = lines.some(([a, b, c]) => {
      const line = [squares[a], squares[b], squares[c]];
      return line.includes(null) && !line.includes('X');
    });

    if (!winner && empty && !xPossible && !oPossible) {
      setIsDraw(true);
    }

    if (!winner && !empty) {
      setIsDraw(true);
    }
  }, [squares, winner])

  const handleClick = i => {
    if (squares[i] || winner || isDraw) return
    const next = squares.slice()
    next[i] = xIsNext ? 'X' : 'O'
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  const reset = () => {
    setSquares(Array(9).fill(null))
    setXIsNext(true)
    setWinner(null)
    setWinLine([])
    setIsDraw(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Robert's Tic Tac Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {squares.map((val, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 text-2xl font-bold border ${winLine.includes(i) ? 'bg-green-300' : 'bg-white'}`}
          >
            {val}
          </button>
        ))}
      </div>
      {(winner || isDraw) && (
        <div className="mt-4 text-center">
          <p className="text-xl font-semibold">
            {winner ? \`Winner: \${winner}\` : 'Draw!'}
          </p>
          <button
            onClick={reset}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

// pages/index.js
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const lines = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winLine, setWinLine] = useState([]);
  const [isDraw, setIsDraw] = useState(false);
  const [scores, setScores] = useState({ X: 0, O: 0, Draws: 0 });

  useEffect(() => {
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        setWinLine([a, b, c]);
        setScores(prev => ({ ...prev, [squares[a]]: prev[squares[a]] + 1 }));
        return;
      }
    }

    const empty = squares.includes(null);
    const xPossible = lines.some(([a, b, c]) => {
      const line = [squares[a], squares[b], squares[c]];
      return line.includes(null) && !line.includes('🥕');
    });
    const oPossible = lines.some(([a, b, c]) => {
      const line = [squares[a], squares[b], squares[c]];
      return line.includes(null) && !line.includes('🐰');
    });

    if (!winner && empty && !xPossible && !oPossible) {
      setIsDraw(true);
      setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
    }

    if (!winner && !empty) {
      setIsDraw(true);
      setScores(prev => ({ ...prev, Draws: prev.Draws + 1 }));
    }
  }, [squares]);

  const handleClick = i => {
    if (squares[i] || winner || isDraw) return;
    const next = squares.slice();
    next[i] = xIsNext ? '🐰' : '🥕';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  const reset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinLine([]);
    setIsDraw(false);
  };

  const resetAll = () => {
    reset();
    setScores({ X: 0, O: 0, Draws: 0 });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Robert's Tic Tac Toe</h1>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-5xl">
        {/* Game Board */}
        <div className="flex flex-col items-center gap-4 flex-1">
          <div className="grid grid-cols-3 gap-2">
            {squares.map((val, i) => (
              <button
                key={i}
                onClick={() => handleClick(i)}
                className={`w-20 h-20 text-2xl font-bold border rounded ${
                  winLine.includes(i) ? 'bg-green-300' : 'bg-white'
                }`}
              >
                {val}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <Button onClick={reset}>New Game</Button>
            <Button variant="destructive" onClick={resetAll}>Reset All</Button>
          </div>
        </div>

        {/* Status and Scoreboard */}
        <div className="flex flex-col gap-4 w-full md:w-64">
          <Card>
            <CardContent className="text-center p-4">
              <p className="text-lg font-semibold">
                {winner
                  ? `Winner: ${winner}`
                  : isDraw
                  ? 'Draw!'
                  : `Player ${xIsNext ? '🐰' : '🥕'}'s Turn`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center p-4">
              <h2 className="text-lg font-bold mb-2">Score Board</h2>
              <p>🐰 (Rabbit): {scores.X}</p>
              <p>🥕 (Carrot): {scores.O}</p>
              <p>Draws: {scores.Draws}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

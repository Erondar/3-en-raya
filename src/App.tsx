import { useState } from "react"
import Square from "./Components/Square"
import { TURNS } from "./Constants/Constantes"
import { setWinnerFunc } from "./Logic/Helpers"
import WinnerModal from "./Components/WinnerModal"

const App = () => {
  const [winner, setWinner] = useState<string | boolean | null>(null) //null no hay ganador y false empate

  const [board, setBoard] = useState<string[]>(() => {
    const local = localStorage.getItem("board")
    if (local) {
      const localBoard = JSON.parse(local)
      setWinnerFunc(localBoard, setWinner)

      return JSON.parse(local)
    } else return Array(9).fill(null)
  })
  const [turn, setTurn] = useState<string>(() => {
    const local = localStorage.getItem("turn")
    if (local) return local
    else return TURNS.X
  })

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    localStorage.removeItem("board")
    localStorage.removeItem("turn")
  }

  const updateBoard = (index: number) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    localStorage.setItem("board", JSON.stringify(newBoard))

    setWinnerFunc(newBoard, setWinner)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    localStorage.setItem("turn", newTurn)
  }

  return (
    <>
      <main className="board">
        <h1>3 en raya by Iván Vega</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className="game">
          {board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })}
        </section>

        <section className="turn">
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>
        <WinnerModal resetGame={resetGame} winner={winner} />
      </main>
    </>
  )
}

export default App

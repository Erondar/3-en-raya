import { WINNER_COMBOS } from "../Constants/Constantes"
import confetti from "canvas-confetti"

export const checkWinner = (boardToCheck: string[]) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    return null
  }

  export const checkEndGame = (newBoard: string[]) => {
    return newBoard.every((square) => square != null)
  }

export const setWinnerFunc = (newBoard: string[], setWinner: (newWinner: string | boolean | null) => void) => {
  const newWinner = checkWinner(newBoard)
  if (newWinner) {
    confetti()
    setWinner(newWinner)
  } else if (checkEndGame(newBoard)) {
    setWinner(false)
  }
}
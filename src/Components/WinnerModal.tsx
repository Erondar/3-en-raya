import Square from "./Square"

type Props = {
  winner: string | boolean | null
  resetGame: () => void
}

const WinnerModal: React.FC<Props> = ({ winner, resetGame }) => {
  {
    if (winner == null) return

    return (
      <section className="winner">
        <div className="text">
          <h2>{winner === false ? "Empate" : "Ganó: "}</h2>
          <header className="win">{winner && <Square>{winner}</Square>}</header>
          <footer>
            <button onClick={resetGame}>Empezar de nuevo</button>
          </footer>
        </div>
      </section>
    )
  }
}

export default WinnerModal

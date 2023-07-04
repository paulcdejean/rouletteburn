import RouletteCell from "./RouletteCell"

export interface GameState {
  predictedWinner: number,
  hasChip: boolean
}

function RouletteHelper() {
  const [gameState, setGameState] : [GameState, (gameState: GameState) => void] = React.useState({hasChip: false})

  function updateGameState(num: number) {
    setGameState({
      predictedWinner: num,
      hasChip: true,
    })
  }

  return (
    <>
      <p>
        Click on the table one time to indicate your bet. Click a second time to indicate the roulette result. Only numerical bets are supported.
      </p>
      <RouletteCell num={7} gameState={gameState} updateGameState={updateGameState}></RouletteCell>
    </>
  )
}

export default RouletteHelper

import RouletteCell from "./RouletteCell"

import cssInline from "./css/RouletteTable.module.css?inline"
import css from "./css/RouletteTable.module.css"

export interface GameState {
  predictedWinner: number,
  chipLocation: number,
}

function RouletteHelper() {
  const [gameState, setGameState] : [GameState, (gameState: GameState) => void] = React.useState({
    predictedWinner: -1,
    chipLocation: -1,
  })

  function updateGameState(num: number) {
    setGameState({
      predictedWinner: 7,
      chipLocation: num,
    })
  }

  return (
    <>
      <style>{cssInline}</style>
      <p>
        Click on the table one time to indicate your bet. Click a second time to indicate the roulette result. Only numerical bets are supported.
      </p>
      <table className={css.table}>
        <tr>
          <td className={`${css.cell} ${css.blank}`} />
          <RouletteCell num={3} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={6} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={9} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={12} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={15} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={18} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={21} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={24} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={27} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={30} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={33} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={36} className={`${css.cell} ${css.topmost}`} gameState={gameState} updateGameState={updateGameState} />
        </tr>
        <tr>
          <RouletteCell num={0} className={`${css.cell} ${css.leftmost} ${css.blank}`} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={2} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={5} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={8} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={11} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={14} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={17} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={20} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={23} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={26} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={29} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={32} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={35} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
        </tr>
        <tr>
          <td className={`${css.cell} ${css.blankbottom} ${css.blank}`} />
          <RouletteCell num={1} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={4} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={7} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={10} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={13} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={16} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={19} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={22} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={25} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={28} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={31} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
          <RouletteCell num={34} className={css.cell} gameState={gameState} updateGameState={updateGameState} />
        </tr>
      </table>
    </>
  )
}

export default RouletteHelper

import { GameState } from "./RouletteHelper"
import chipGraphic from "./svg/Militarypoker.svg"
import css from "./css/RouletteTable.module.css"

interface RouletteCellProps {
  num: number,
  gameState: GameState,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  updateGameState: Function,
  className: string,
}

const enum CellColor {
  Red = "red",
  Black = "black",
  Blue = "darkblue",
  Green = "limegreen"
}

function cellColor(props: RouletteCellProps) : CellColor {
  const redNumbers = new Set([32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3])
  const blackNumbers = new Set([15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26])

  if (props.gameState.playthrough.predictedWinner === props.num) {
    return CellColor.Green
  } else if (redNumbers.has(props.num)) {
    return CellColor.Red
  } else if (blackNumbers.has(props.num)) {
    return CellColor.Black
  } else {
    return CellColor.Blue
  }
}

function RouletteCell(props: RouletteCellProps) {
  return (
    <td className={props.className} style={{backgroundColor: cellColor(props)}} onClick={() => props.updateGameState(props.num)}>
      {props.num}<img className={css.chip} src={chipGraphic} style={{ display: props.gameState.chipLocation === props.num ? "block" : "none"}} />
    </td>
  )
}

export default RouletteCell

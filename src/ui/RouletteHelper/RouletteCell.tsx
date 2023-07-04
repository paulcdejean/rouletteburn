interface RouletteCellProps {
  num: number,
  winner: boolean,
  hasChip: boolean,
}

const enum CellColor {
  Red = "red",
  Black = "black",
  Blue = "darkblue",
  Green = "green"
}

function cellColor(props: RouletteCellProps) : CellColor {
  const redNumbers = new Set([32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3])
  const blackNumbers = new Set([15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26])

  if (props.winner) {
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
    <td style={{backgroundColor: cellColor(props)}}>
      {props.num}
    </td>
  )
}

export default RouletteCell

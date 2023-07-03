import cssInline from "./css/RouletteTable.module.css?inline"
import css from "./css/RouletteTable.module.css"

function RouletteTable() {

  return (
    <>
      <style>{cssInline}</style>
      <table className={css.table}>
        <tr>
          <td className={css.blankcell}></td>
          <td className={`${css.cell} ${css.red}`}>3</td>
          <td className={`${css.cell} ${css.black}`}>6</td>
          <td className={`${css.cell} ${css.red}`}>9</td>
          <td className={`${css.cell} ${css.red}`}>12</td>
          <td className={`${css.cell} ${css.black}`}>15</td>
          <td className={`${css.cell} ${css.red}`}>18</td>
          <td className={`${css.cell} ${css.red}`}>21</td>
          <td className={`${css.cell} ${css.black}`}>24</td>
          <td className={`${css.cell} ${css.red}`}>27</td>
          <td className={`${css.cell} ${css.red}`}>30</td>
          <td className={`${css.cell} ${css.black}`}>33</td>
          <td className={`${css.cell} ${css.red} ${css.rightmost}`}>36</td>
        </tr>
        <tr>
          <td className={`${css.cell} ${css.blue}`}>0</td>
          <td className={`${css.cell} ${css.black}`}>2</td>
          <td className={`${css.cell} ${css.red}`}>5</td>
          <td className={`${css.cell} ${css.black}`}>8</td>
          <td className={`${css.cell} ${css.black}`}>11</td>
          <td className={`${css.cell} ${css.red}`}>14</td>
          <td className={`${css.cell} ${css.black}`}>17</td>
          <td className={`${css.cell} ${css.black}`}>20</td>
          <td className={`${css.cell} ${css.red}`}>23</td>
          <td className={`${css.cell} ${css.black}`}>26</td>
          <td className={`${css.cell} ${css.black}`}>29</td>
          <td className={`${css.cell} ${css.red}`}>32</td>
          <td className={`${css.cell} ${css.black} ${css.rightmost}`}>35</td>
        </tr>
        <tr>
          <td className={`${css.blankcell} ${css.topmost}`}></td>
          <td className={`${css.cell} ${css.red} ${css.bottommost}`}>1</td>
          <td className={`${css.cell} ${css.black} ${css.bottommost}`}>4</td>
          <td className={`${css.cell} ${css.red} ${css.bottommost}`}>7</td>
          <td className={`${css.cell} ${css.black} ${css.bottommost}`}>10</td>
          <td className={`${css.cell} ${css.black} ${css.bottommost}`}>13</td>
          <td className={`${css.cell} ${css.red} ${css.bottommost}`}>16</td>
          <td className={`${css.cell} ${css.red} ${css.bottommost}`}>19</td>
          <td className={`${css.cell} ${css.black} ${css.bottommost}`}>22</td>
          <td className={`${css.cell} ${css.red} ${css.bottommost}`}>25</td>
          <td className={`${css.cell} ${css.black} ${css.bottommost}`}>28</td>
          <td className={`${css.cell} ${css.black} ${css.bottommost}`}>31</td>
          <td className={`${css.cell} ${css.red} ${css.bottommost} ${css.rightmost}`}>34</td>
        </tr>
      </table>
    </>
  )
}

export default RouletteTable

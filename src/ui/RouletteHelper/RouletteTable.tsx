import cssInline from "./css/RouletteTable.module.css?inline"
import css from "./css/RouletteTable.module.css"

function RouletteTable() {

  return (
    <>
      <style>{cssInline}</style>
      <table className={css.table}>
        <tr>
          <td className={`${css.cell}`}></td>
          <td className={`${css.cell} ${css.red} ${css.topmost}`}>3</td>
          <td className={`${css.cell} ${css.black} ${css.topmost}`}>6</td>
          <td className={`${css.cell} ${css.red} ${css.topmost}`}>9</td>
          <td className={`${css.cell} ${css.red} ${css.topmost}`}>12</td>
          <td className={`${css.cell} ${css.black} ${css.topmost}`}>15</td>
          <td className={`${css.cell} ${css.red} ${css.topmost}`}>18</td>
          <td className={`${css.cell} ${css.red} ${css.topmost}`}>21</td>
          <td className={`${css.cell} ${css.black} ${css.topmost}`}>24</td>
          <td className={`${css.cell} ${css.red} ${css.topmost}`}>27</td>
          <td className={`${css.cell} ${css.red} ${css.topmost}`}>30</td>
          <td className={`${css.cell} ${css.black} ${css.topmost}`}>33</td>
          <td className={`${css.cell} ${css.red} ${css.topmost}`}>36</td>
        </tr>
        <tr>
          <td className={`${css.cell} ${css.blue} ${css.leftmost}`}>0</td>
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
          <td className={`${css.cell} ${css.black}`}>35</td>
        </tr>
        <tr>
          <td className={`${css.cell} ${css.blankbottom}`}></td>
          <td className={`${css.cell} ${css.red}`}>1</td>
          <td className={`${css.cell} ${css.black}`}>4</td>
          <td className={`${css.cell} ${css.red}`}>7</td>
          <td className={`${css.cell} ${css.black}`}>10</td>
          <td className={`${css.cell} ${css.black}`}>13</td>
          <td className={`${css.cell} ${css.red}`}>16</td>
          <td className={`${css.cell} ${css.red}`}>19</td>
          <td className={`${css.cell} ${css.black}`}>22</td>
          <td className={`${css.cell} ${css.red}`}>25</td>
          <td className={`${css.cell} ${css.black}`}>28</td>
          <td className={`${css.cell} ${css.black}`}>31</td>
          <td className={`${css.cell} ${css.red}`}>34</td>
        </tr>
      </table>
    </>
  )
}

export default RouletteTable

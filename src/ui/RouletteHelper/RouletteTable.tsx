function RouletteTable() {

  return (
    <table className="table">
      <tr>
        <td className="blankcell"></td>
        <td className="cell red">3</td>
        <td className="cell black">6</td>
        <td className="cell red">9</td>
        <td className="cell red">12</td>
        <td className="cell black">15</td>
        <td className="cell red">18</td>
        <td className="cell red">21</td>
        <td className="cell black">24</td>
        <td className="cell red">27</td>
        <td className="cell red">30</td>
        <td className="cell black">33</td>
        <td className="cell red rightmost">36</td>
      </tr>
      <tr>
        <td className="cell blue">0</td>
        <td className="cell black">2</td>
        <td className="cell red">5</td>
        <td className="cell black">8</td>
        <td className="cell black">11</td>
        <td className="cell red">14</td>
        <td className="cell black">17</td>
        <td className="cell black">20</td>
        <td className="cell red">23</td>
        <td className="cell black">26</td>
        <td className="cell black">29</td>
        <td className="cell red">32</td>
        <td className="cell black rightmost">35</td>
      </tr>
      <tr>
        <td className="blankcell topmost"></td>
        <td className="cell red bottommost">1</td>
        <td className="cell black bottommost">4</td>
        <td className="cell red bottommost">7</td>
        <td className="cell black bottommost">10</td>
        <td className="cell black bottommost">13</td>
        <td className="cell red bottommost">16</td>
        <td className="cell red bottommost">19</td>
        <td className="cell black bottommost">22</td>
        <td className="cell red bottommost">25</td>
        <td className="cell black bottommost">28</td>
        <td className="cell black bottommost">31</td>
        <td className="cell red bottommost rightmost">34</td>
      </tr>
    </table>
  )
}

export default RouletteTable

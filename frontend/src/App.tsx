import { useState } from 'react'
import './index.css'
import numberService from './services/numberService'

function App() {
  const [cells, setCells] = useState(Array(28).fill(Array(28).fill(0)))
  const [paint, setPaint] = useState(false)

  interface CellProps {
    value: number,
    row: number,
    column: number
  }

  interface InferenceProps {
    matrix: number[][]
  }


  function Cell ({value, row, column}: CellProps) {
    const intensity = 1 - value;
    const hex : string = '#' + Array(3).fill(0).map(() => Math.floor(255 * intensity).toString(16)).join('')
    const style = {
      'backgroundColor': hex,
    }

    const handleHower = () => {
      if (paint) {
        setCells(cells.map((vector : number[], i : number) => vector.map((val : number, j : number) => Math.abs(row - i) < 2 && Math.abs(column - j) < 2 ? 1 : val)))
      }
    }

    return (
      <button className="square" style={style} onMouseOver={handleHower}>
      </button>
    )
  }

  interface RowPorps {
    vector: number[],
    row: number,
  }

  function Row({vector, row}: RowPorps) {
    return (
      <div className="row">{vector.map((value, index) => <Cell value={value} row={row} column={index} key={`${row}-${index}`}/>)}</div>
    )
  }

  function Reset() {
    return (
      <button onClick={() => setCells(Array(28).fill(Array(28).fill(0)))}>Reset</button>
    )
  }

  function Infer({ matrix } : InferenceProps) {
    return (
      <button onClick={() => numberService.infer(matrix)}>Infer</button>
    )
  }

  return (
    <>
      <div 
        className="grid" 
        onMouseDown={()=> setPaint(true)} 
        onMouseUp={() => setPaint(false)} 
        onMouseLeave={() => setPaint(false)}
      >
        {cells.map((row, index) => {
          return <Row vector={row} key={`row-${index}`} row={index}/>
          })}
      </div>
      <Reset/>
      <Infer matrix={cells}/>
    </>
  )
}

export default App

import reactLogo from '@/ui/svgs/react.svg'
import viteLogo from '@/ui/svgs/vite.svg'

import examplecss from '@/ui/css/example.css?inline'

export const exampleCSS = examplecss


function Example() {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count: number) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p style={{color: "red"}}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Example

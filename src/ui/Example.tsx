import reactLogo from '@/ui/svgs/react.svg'
import viteLogo from '@/ui/svgs/vite.svg'

import exampleInline from "@/ui/css/example.module.css?inline"
import example from "@/ui/css/example.module.css"

function Example() {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <style>{exampleInline}</style>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className={example.logo} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className={`${example.logo} ${example.react}`} alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className={example.card}>
        <button onClick={() => setCount((count: number) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className={example.readTheDocs}>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Example

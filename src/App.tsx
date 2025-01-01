import { useState } from "react"
import "./App.css"
import DragAndDrop from "./components/DragnDrop"

function App() {
  const [loading, setLoading] = useState<boolean>(true)

  const loader = () => {
    return <div className="loader"></div>
  }

  setTimeout(() => {
    setLoading(false)
  }, 1000)

  return (
    <>
      <div>{loading ? loader() : <DragAndDrop />}</div>
    </>
  )
}

export default App

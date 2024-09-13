import { createBrowserRouter } from 'react-router-dom'
import './App.css'
import Navbar from './components/Shared/Navbar'

const approuter=createBrowserRouter()

function App() {
  return (
    <>
    <Navbar />
    </>
  )
}

export default App

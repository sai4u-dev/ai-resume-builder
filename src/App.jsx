import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Preview from './pages/Preview'
import Home from './pages/Home'
import Form from './pages/Form'
import NavBar from './components/NavBar'
import PreviewWraper from './components/PreviewWraper'

function App() {


  return (
    <>
      <BrowserRouter>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/userDetails" element={<Form />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>

      </BrowserRouter>

    </>
  )
}

export default App
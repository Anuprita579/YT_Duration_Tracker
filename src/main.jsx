import React from 'react'
import ReactDOM from 'react-dom/client'
import Header from "./Components/Header.jsx"
import Searchbar from './Components/Searchbar.jsx'
import Footer from './Components/Footer.jsx'
import './style.scss'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header />
    <Searchbar />
    <Footer />
  </React.StrictMode>,
)

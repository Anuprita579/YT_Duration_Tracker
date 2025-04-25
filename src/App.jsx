import React from "react";
import Header from "./components/Header";
import Searchbar from "./components/Searchbar";
import Footer from "./components/Footer";
import './style.scss'

const App = () => {
  return (
    <div>
      <Header />
      <Searchbar />
      <Footer />
    </div>
  );
};

export default App;

import Nav from './components/Nav'
import Home from "./components/Home";
import About from './components/About'
import Shop from './components/Shop'
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (  
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path='/about' element={ <About />} />
          <Route path='/shop' element={<Shop />} />
        </Routes>
      </div>    
  );
}

export default App;

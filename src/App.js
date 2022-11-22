import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Properties from "./components/Properties";
import Faq from './components/Faq';

function App() {

  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path='/properties' element={<Properties /> } />
      <Route path='/faq' element={<Faq />} />
      </Routes>
    </Router>
  );
}

export default App;

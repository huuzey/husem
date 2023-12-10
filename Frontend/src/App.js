import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ui from "./components/Ui";
import Thank from "./components/Thank";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Ui />} />
        <Route path="/thank" element={<Thank />} />
        <Route path="/:name" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

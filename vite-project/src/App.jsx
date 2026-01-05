import { Routes, Route } from "react-router-dom";
import Result from "./pages/Result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Result />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  );
}

export default App;

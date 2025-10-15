import Home from "./pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;

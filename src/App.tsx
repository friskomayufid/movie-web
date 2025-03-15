import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-3xl font-bold text-gray-800">Movie Database</h1>
          </div>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<MovieList />} />
            {/* Add movie detail route later */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

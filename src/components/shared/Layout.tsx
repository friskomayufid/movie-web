import { BrowserRouter as Router, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <NavLink to="/">
              <h1 className="text-3xl font-bold text-gray-800">
                Movie App
              </h1>
            </NavLink>
          </div>
        </header>
        <main>
          <Routes>{children}</Routes>
        </main>
      </div>
    </Router>
  );
}

export default Layout;

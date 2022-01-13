import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NotFound from "./components/NotFound/NotFound";
import BoardPage from "./pages/Board/Board";
import BoardProfilePage from "./pages/BoardProfile/BoardProfile";

function App() {
  return (
    <Router>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate replace to="/boards" />} />
          <Route path="/boards" element={<BoardPage />} />
          <Route path="/:id" element={<BoardProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

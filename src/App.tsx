import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useLayoutEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";


function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    requestAnimationFrame(resetScroll);
  }, [pathname, search, hash]);

  return null;
}

function App() {
  return (
    <Router basename="/">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useLayoutEffect } from "react";
import "./App.css";
import Seo from "./components/Seo";
import BusinessRoute from "./pages/BusinessRoute";
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
        <Route
          path="/"
          element={
            <>
              <Seo />
              <HomePage />
            </>
          }
        />
        <Route path="*" element={<BusinessRoute />} />
      </Routes>
    </Router>
  );
}

export default App;

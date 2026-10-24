import Header from "./components/Header";
import { Navigate, Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Experience from "./pages/Experience";
import SkillsEducation from "./pages/SkillsEducation";
import NotFound from "./pages/NotFound";
import SingleProject from "./pages/SingleProject";
import "./styles/animations.css";
import { useEffect, useRef, useState } from "react";

const pageOrder = ["/", "/projects", "/experience", "/skills-and-education"];
export default function App() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (previousPath.current === location.pathname) return;

    previousPath.current = location.pathname;
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [location.pathname]);

  const currentIndex = pageOrder.indexOf(location.pathname);
  const animatePage = currentIndex >= 0;
  const [transition, setTransition] = useState({
    pathname: location.pathname,
    pageIndex: currentIndex,
    slideFrom: "100vw",
  });

  if (transition.pathname !== location.pathname) {
    setTransition({
      pathname: location.pathname,
      pageIndex: animatePage ? currentIndex : transition.pageIndex,
      slideFrom:
        animatePage && currentIndex < transition.pageIndex ? "-100vw" : "100vw",
    });
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className={`page-width${location.pathname === "/" ? " home-page-width" : ""}`}
      >
        <div
          className="page-transition"
          style={{ "--slide-from": transition.slideFrom }}
          key={location.pathname}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<SingleProject />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills-and-education" element={<SkillsEducation />} />
            <Route path="/tech-stack" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

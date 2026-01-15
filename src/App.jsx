import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Auth from "./auth.tsx";
import Home from "./home.tsx";
import Resume from "./resume.tsx";
import { usePuterStore } from "./lib/puter";

export default function App() {
  const { init } = usePuterStore();

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    init();
    console.log("App mounted successfully");
  }, [init]);

  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/home" element={<Home />} />
      <Route path="/resume/:id" element={<Resume />} />
    </Routes>
  );
}

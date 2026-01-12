import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import bgSmall from "./assets/images/bg-small.svg";
import { resumes } from "./Constants";
import ResumeCard from "./Components/ResumeCard";
import { usePuterStore } from "./lib/puter";

export default function Dashboard() {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated && !isLoading) {
      navigate("/auth?next=/dashboard");
    }
  }, [auth.isAuthenticated, isLoading, navigate]);

  return (
    <main
      className="min-h-screen bg-cover bg-center px-6 sm:px-10 py-6"
      style={{ backgroundImage: `url(${bgSmall})` }}
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="flex justify-between items-center mb-10 w-full bg-white/70 backdrop-blur-xl shadow-xl p-2 rounded-full"
        >
          <span className="px-4 py-2 text-sm md:text-base font-medium bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
            RESUMIND
          </span>
          <button className="px-4 md:px-6 mr-2 md:mr-4 py-1 md:py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-sm font-medium transition-colors">
            Upload Resume
          </button>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight">
          <span className="bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
            Track Your Applications
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
            & Resume Ratings
          </span>
        </h1>

        <p className="text-center text-gray-500 mt-4 mb-10 text-base md:text-lg">
          Review your submissions and check Al-powered feedback.
        </p>

        {resumes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

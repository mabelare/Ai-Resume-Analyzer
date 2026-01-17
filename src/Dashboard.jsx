import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import resumescan from "./assets/images/resume-scan-2.gif";
import bgSmall from "./assets/images/bg-small.svg";
import ResumeCard from "./Components/ResumeCard";
import { usePuterStore } from "./lib/puter";

export default function Dashboard() {
  const { auth, isLoading, kv } = usePuterStore();

  const navigate = useNavigate();
  const location = useLocation();
  const [resumes, setResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated && !isLoading) {
      navigate("/auth?next=/dashboard");
    }
  }, [auth.isAuthenticated, isLoading, navigate]);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        setLoadingResumes(true);

        const resumesList = await kv.list("resume:*", true);
        console.log("Raw resumes from KV:", resumesList);

        const parsedResumes = resumesList
          ?.map((item) => {
            try {
              // When second param is true, kv.list returns the values directly
              const value = typeof item === "string" ? item : item.value;
              if (!value || value === "undefined") return null;
              return JSON.parse(value);
            } catch (e) {
              console.error("Failed to parse resume:", item, e);
              return null;
            }
          })
          .filter((resume) => resume !== null);

        console.log("parsedResumes", parsedResumes);
        setResumes(parsedResumes || []);
      } catch (error) {
        console.error("Error loading resumes:", error);
        setResumes([]);
      } finally {
        setLoadingResumes(false);
      }
    };

    if (auth.isAuthenticated) {
      loadResumes();
    }
  }, [auth.isAuthenticated, kv, location.key]);

  return (
    <main
      className="min-h-screen bg-cover bg-center px-6 sm:px-10 py-6"
      style={{ backgroundImage: `url(${bgSmall})` }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10 w-full bg-white/70 backdrop-blur-xl shadow-xl p-2 rounded-full">
          <span className="px-4 py-2 text-sm md:text-base font-medium bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
            RESUMIND
          </span>
          <button
            onClick={() => navigate("/home")}
            className="px-4 md:px-6 mr-2 md:mr-4 py-1 md:py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full text-sm font-medium transition-colors"
          >
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
          Review your submissions and check AI-powered feedback.
        </p>

        {loadingResumes && (
          <div className="text-center text-gray-500 text-lg">
            Loading resumes...
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">
            No resumes yet. Click "Upload Resume" to get started!
          </div>
        ) : (
          <p> Review your submissions and check AI-powered feedback.</p>
        )}

        {loadingResumes && (
          <div className="flex flex-col items-center justify-center">
            <img
              src={resumescan}
              alt="Loading resumes"
              className="w-[200px] "
            />
          </div>
        )}

        {!loadingResumes && resumes.length > 0 && (
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

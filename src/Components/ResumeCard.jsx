import { Link } from "react-router-dom";
import ScoreCircle from "./ScoreCircle";
import { usePuterStore } from "../lib/puter";
import { useEffect, useState } from "react";

const ResumeCard = ({ resume }) => {
  const { fs } = usePuterStore();
  const [resumeUrl, setResumeUrl] = useState("");
  const imagePath = resume.imagePath;

  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      let url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };

    loadResume();
  }, [imagePath, fs]);

  // Check if feedback exists and has the expected structure
  const hasFeedback =
    resume.feedback &&
    typeof resume.feedback === "object" &&
    resume.feedback.overallScore;

  return (
    <Link
      to={`/resume/${resume.id}`}
      className="block bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow animate-in fade-in duration-1000"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          {resume.companyName && (
            <h3 className="text-xl font-bold mb-2">{resume.companyName}</h3>
          )}
          {resume.jobTitle && (
            <p className="text-gray-600 mb-4">{resume.jobTitle}</p>
          )}
          {!resume.companyName && !resume.jobTitle && (
            <h2 className="!text-black font-bold">Resume</h2>
          )}
          {hasFeedback ? (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Overall Score:</span>
                <span className="font-bold text-lg">
                  {resume.feedback.overallScore}/100
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">ATS Score:</span>
                <span className="font-semibold">
                  {resume.feedback.ATS.score}/100
                </span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">
              Analysis in progress...
            </div>
          )}
        </div>

        {hasFeedback && (
          <div className="shrink-0">
            <ScoreCircle score={resume.feedback.overallScore} />
          </div>
        )}
      </div>

      {resumeUrl && (
        <div className="gradient-border animate-in fade-in duration-1000">
          <div className="w-full h-full ">
            <img
              src={resumeUrl}
              alt="resume"
              className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
            />
          </div>
        </div>
      )}
    </Link>
  );
};

export default ResumeCard;

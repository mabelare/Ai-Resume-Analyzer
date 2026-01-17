import React from "react";
import atsGood from "../assets/icons/ats-good.svg";
import atsWarning from "../assets/icons/ats-warning.svg";
import atsBad from "../assets/icons/ats-bad.svg";
import checkIcon from "../assets/icons/check.svg";
import warningIcon from "../assets/icons/warning.svg";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  const getGradientColor = () => {
    if (score > 69) {
      return "from-green-100";
    } else if (score > 49) {
      return "from-yellow-100";
    } else {
      return "from-red-100";
    }
  };

  const getATSIcon = () => {
    if (score > 69) {
      return atsGood;
    } else if (score > 49) {
      return atsWarning;
    } else {
      return atsBad;
    }
  };

  const gradientColor = getGradientColor();
  const atsIcon = getATSIcon();

  return (
    <div
      className={`bg-gradient-to-br ${gradientColor} to-white rounded-2xl shadow-md p-6 w-full`}
    >
      <div className="flex flex-col gap-6">
        {/* Top Section */}
        <div className="flex flex-row items-center gap-4">
          <img src={atsIcon} alt="ATS Status" className="w-16 h-16" />
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold">ATS Score - {score}/100</h3>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex flex-col gap-4">
          <h4 className="text-lg font-semibold">Resume Analysis</h4>
          <p className="text-gray-600 text-sm">
            Your resume has been analyzed for Applicant Tracking System (ATS)
            compatibility. Below are specific recommendations to improve your
            resume's visibility to recruiters.
          </p>

          {/* Suggestions List */}
          <div className="flex flex-col gap-3 mt-2">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex flex-row gap-3 items-start">
                <img
                  src={suggestion.type === "good" ? checkIcon : warningIcon}
                  alt={suggestion.type}
                  className="w-5 h-5 mt-0.5"
                />
                <p className="text-sm">{suggestion.tip}</p>
              </div>
            ))}
          </div>

          {/* Closing Line */}
          <p className="text-sm text-gray-700 font-medium mt-2">
            Keep refining your resume to maximize your chances of landing
            interviews!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATS;

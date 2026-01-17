import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const getBadgeStyle = () => {
    if (score > 69) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        label: "Strong",
      };
    } else if (score > 49) {
      return {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        label: "Good Start",
      };
    } else {
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-700",
        label: "Needs Work",
      };
    }
  };

  const { bgColor, textColor, label } = getBadgeStyle();

  return (
    <span
      className={`${bgColor} ${textColor} px-3 py-1 rounded-full text-sm font-semibold`}
    >
      {label}
    </span>
  );
};

export default ScoreBadge;

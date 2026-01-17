import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "../Accordion";
import { Feedback } from "../types";
import { cn } from "../lib/utils";
import checkIcon from "../assets/icons/check.svg";
import crossIcon from "../assets/icons/cross.svg";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const getBadgeStyle = () => {
    if (score > 69) {
      return {
        bgColor: "bg-green-100",
        textColor: "text-green-700",
        icon: checkIcon,
      };
    } else if (score > 39) {
      return {
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-700",
        icon: checkIcon,
      };
    } else {
      return {
        bgColor: "bg-red-100",
        textColor: "text-red-700",
        icon: crossIcon,
      };
    }
  };

  const { bgColor, textColor, icon } = getBadgeStyle();

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1 rounded-full",
        bgColor,
        textColor
      )}
    >
      <img src={icon} alt="" className="w-4 h-4" />
      <span className="text-sm font-semibold">{score}/100</span>
    </div>
  );
};

// Helper Component: CategoryHeader
interface CategoryHeaderProps {
  title: string;
  categoryScore: number;
}

const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  title,
  categoryScore,
}) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h3 className="text-xl font-semibold">{title}</h3>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

// Helper Component: CategoryContent
interface Tip {
  type: "good" | "improve";
  tip: string;
  explanation: string;
}

interface CategoryContentProps {
  tips: Tip[];
}

const CategoryContent: React.FC<CategoryContentProps> = ({ tips }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Two-column grid for tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tips.map((tipItem, index) => (
          <div
            key={index}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border",
              tipItem.type === "good"
                ? "bg-green-50 border-green-200"
                : "bg-yellow-50 border-yellow-200"
            )}
          >
            <img
              src={tipItem.type === "good" ? checkIcon : crossIcon}
              alt=""
              className="w-5 h-5 mt-0.5"
            />
            <p className="text-sm font-medium">{tipItem.tip}</p>
          </div>
        ))}
      </div>

      {/* Explanation boxes */}
      <div className="flex flex-col gap-3">
        {tips.map((tipItem, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg",
              tipItem.type === "good"
                ? "bg-green-50 border-l-4 border-green-500"
                : "bg-yellow-50 border-l-4 border-yellow-500"
            )}
          >
            <p className="text-sm text-gray-700">{tipItem.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Component: Details
interface DetailsProps {
  feedback: Feedback;
}

const Details: React.FC<DetailsProps> = ({ feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 w-full">
      <h2 className="text-2xl font-bold mb-4">Detailed Feedback</h2>

      <Accordion allowMultiple>
        {/* Tone & Style Section */}
        <AccordionItem id="tone-style">
          <AccordionHeader itemId="tone-style">
            <CategoryHeader
              title="Tone & Style"
              categoryScore={feedback.toneAndStyle.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="tone-style">
            <CategoryContent tips={feedback.toneAndStyle.tips} />
          </AccordionContent>
        </AccordionItem>

        {/* Content Section */}
        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader
              title="Content"
              categoryScore={feedback.content.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips} />
          </AccordionContent>
        </AccordionItem>

        {/* Structure Section */}
        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader
              title="Structure"
              categoryScore={feedback.structure.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader
              title="Skills"
              categoryScore={feedback.skills.score}
            />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;

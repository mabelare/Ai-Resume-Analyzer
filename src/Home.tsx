import resumescan from "./assets/images/resume-scan.gif";
import bgMain from "./assets/images/bg-main.svg";
import FileUploader from "./Components/FileUploader";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { usePuterStore } from "./lib/puter";
import { convertPdfToImage } from "./lib/pdf2img";
import { generateUUID } from "./lib/utils";
import { prepareInstructions, AIResponseFormat } from "./Constants";

export default function Home() {
  const { auth, isLoading, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    try {
      setIsProcessing(true);
      setStatusText("Uploading your resume...");
      const uploadedFile = await fs.upload([file]);

      if (!uploadedFile) {
        setStatusText("Failed to upload file.");
        setIsProcessing(false);
        return;
      }

      setStatusText("Converting to image...");
      const imageFile = await convertPdfToImage(file);

      if (!imageFile.file) {
        setStatusText(imageFile.error || "Failed to convert PDF to image.");
        setIsProcessing(false);
        return;
      }

      setStatusText("Uploading the image...");
      const uploadedImage = await fs.upload([imageFile.file]);

      if (!uploadedImage) {
        setStatusText("Failed to upload image.");
        setIsProcessing(false);
        return;
      }

      setStatusText("Preparing data...");

      const uuid = generateUUID();
      const data = {
        id: uuid,
        resumePath: uploadedFile.path,
        imagePath: uploadedImage.path,
        companyName,
        jobTitle,
        jobDescription,
        feedback: "",
      };
      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Analyzing...");

      console.log("Starting AI feedback request...");
      const feedback = await ai.feedback(
        uploadedFile.path,
        prepareInstructions({ jobTitle, jobDescription, AIResponseFormat })
      );
      console.log("AI feedback received:", feedback);

      if (!feedback) {
        setStatusText("Failed to get feedback.");
        setIsProcessing(false);
        return;
      }

      console.log("Extracting feedback text...");
      const feedbackText =
        typeof feedback.message.content === "string"
          ? feedback.message.content
          : feedback.message.content[0].text;

      console.log("Feedback text:", feedbackText);
      console.log("Parsing feedback JSON...");
      data.feedback = JSON.parse(feedbackText);
      console.log("Parsed feedback:", data.feedback);

      await kv.set(`resume:${uuid}`, JSON.stringify(data));
      setStatusText("Analysis complete!");

      console.log("Analysis saved with ID:", uuid);

      setIsProcessing(false);
    } catch (error) {
      console.error("Analysis error:", error);
      console.error("Error details:", JSON.stringify(error, null, 2));
      setStatusText(
        `Error: ${
          error instanceof Error
            ? error.message
            : typeof error === "object" && error !== null
            ? JSON.stringify(error)
            : "An unexpected error occurred"
        }`
      );
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const companyName = formData.get("companyName");
    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");
    if (!file) return;

    handleAnalyze({
      companyName: companyName as string,
      jobTitle: jobTitle as string,
      jobDescription: jobDescription as string,
      file,
    });
  };
  return (
    <main
      className="min-h-screen bg-cover bg-center px-10 py-6"
      style={{ backgroundImage: `url(${bgMain})` }}
    >
      <div
        className="flex justify-between
       items-center mb-10 max-w-4x1 w-full bg-white/70 backdrop-blur-xl shadow-xl md:p-1 p-1 rounded-full"
      >
        <span className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
          RESUMIND
        </span>
        <button className="px-4 mr-4 py-1 bg-indigo-500 text-white rounded-full text-sm font-medium ">
          Upload Resume
        </button>
      </div>
      <div>
        <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight">
          <span className="bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
            Smart feedback
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
            for Your dream job
          </span>
        </h1>
        {isProcessing ? (
          <>
            <h2>{statusText}</h2>
            <img src={resumescan} className="w-full" />
          </>
        ) : (
          <p className="text-center text-gray-500 mt-4 mb-10 ">
            Drop your resume for an ATS score and improvement tips.
          </p>
        )}

        {!isProcessing && (
          <form
            id="upload-form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-1  ">Company Name</label>
                <input
                  defaultValue="Company Name"
                  name="CompanyName"
                  className="w-full  hover:border-indigo-500 transition-colors text-gray-600 px-4 p-2 rounded-sm border bg-white shadow-xl focus:outline-none focus:ring-0 "
                ></input>
              </div>

              <div>
                <label className="block text-sm mb-1  ">Job Title</label>
                <input
                  defaultValue="Job Title"
                  name="JobTitle"
                  className="w-full  hover:border-indigo-500 transition-colors text-gray-600 px-4 p-2 rounded-sm border bg-white shadow-xl focus:outline-none focus:ring-0 "
                ></input>
              </div>

              <div>
                <label className="block text-sm mb-1  ">Job Description</label>
                <textarea
                  name="JobDescription"
                  rows={5}
                  placeholder="write a clear & concise job description with responsibilities & expectations..."
                  className="w-full  hover:border-indigo-500 transition-colors px-4 p-2 rounded-sm border bg-white shadow-xl focus:outline-none focus:ring-0 "
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="uploader"
                className="  text-gray-500 mt-4 block text-sm mb-2 "
              >
                Upload Resume
              </label>
              <FileUploader onFileSelect={handleFileSelect} />
            </div>

            <button
              type="sumbit"
              className="w-full py-2 mt-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-lg shadow-lg"
            >
              Analyze Resume
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

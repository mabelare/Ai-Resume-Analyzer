import atsBadIcon from "./assets/icons/ats-bad.svg";
import bgMain from "./assets/images/bg-main.svg";

export default function Home() {
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

      <h1 className="text-4xl md:text-5xl font-bold text-center leading-tight">
        <span className="bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
          Smart feedback
        </span>
        <br />
        <span className="bg-gradient-to-r from-red-300 via-gray-950 to-indigo-300 bg-clip-text text-transparent">
          for Your dream job
        </span>
      </h1>

      <p className="text-center text-gray-500 mt-4 mb-10 ">
        Drop your resume for an ATS score and improvement tips.
      </p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-1  ">Company Name</label>
          <input
            defaultValue="JavaScript Mastery"
            className="w-full px-4 p-2 rounded-sm border bg-white shadow-xl focus:outline-none focus:ring-0 "
          ></input>
        </div>

        <div>
          <label className="block text-sm mb-1  ">Job Title</label>
          <input
            defaultValue="Frontend Developer"
            className="w-full px-4 p-2 rounded-sm border bg-white shadow-xl focus:outline-none focus:ring-0 "
          ></input>
        </div>

        <div>
          <label className="block text-sm mb-1  ">Job Description</label>
          <textarea
            rows="4"
            placeholder="write a clear & concise job description with responsibilities & expectations..."
            className="w-full px-4 p-2 rounded-sm border bg-white shadow-xl focus:outline-none focus:ring-0 "
          />
        </div>
      </div>

      <div>
        <label className=" text-gray-500 mt-4 block text-sm mb-2 ">
          Upload Resume
        </label>
        <div className="bg-white rounded-2xl p-6 border shadow-sm text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <img src={atsBadIcon} alt="Upload Icon" className="w-6 h-6" />
            </div>
            <p className="text-gray-500">
              <span className="font-bold">Click to upload </span>
              or drag and drop
            </p>
            <p>PDF, PNG or JPG (max.10MB)</p>
          </div>
        </div>
      </div>

      <button className="w-full py-2 mt-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium text-lg shadow-lg">
        Save & Analyze Resume{" "}
      </button>
    </main>
  );
}

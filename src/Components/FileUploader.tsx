import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import infosvg from "../assets/icons/info.svg";
import pdfpng from "../assets/images/pdf.png";
import crosssvg from "../assets/icons/cross.svg";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const formatSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selectedFile = acceptedFiles[0] || null;
      setFile(selectedFile);
      onFileSelect?.(selectedFile);
    },
    [onFileSelect]
  );
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: 20 * 1024 * 1024,
    });

  const files = acceptedFiles[0] || null;

  return (
    <div className="w-full  bg-gray-400 rounded-2xl p-6 border-2 border-dashed text-center border-gray-300 hover:border-indigo-500 transition-colors">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="space-y-4 cursor-pointer">
          {file ? (
            <div
              className="border border-white rounded-md bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={pdfpng} alt="pdf" className="size-10" />
                  <div className="text-left">
                    <p className="font-medium text-sm text-gray-700 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  className="p-2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    onFileSelect?.(null);
                  }}
                >
                  <img src={crosssvg} alt="remove" className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="items-center mx-auto w-16 h-16 flex justify-center mb-2">
                <img src={infosvg} alt="Upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
                <p className="text-lg text-gray-500">PDF (max 20 MB)</p>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;

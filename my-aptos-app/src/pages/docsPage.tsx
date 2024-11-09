import React, { useState, useContext } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { MyContext } from "../components/context";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-react";
import toast from "react-hot-toast";
import Loader from "../components/loader";
import NavBar from "../components/navbar";

const UploadPage = () => {
  const [aadhar, setAadhar] = useState(null);
  const [pan, setPan] = useState(null);
  const [studentId, setStudentId] = useState(null);
  const [previews, setPreviews] = useState({
    aadhar: null,
    pan: null,
    studentId: null
  });
  const { account } = useWallet();
  const { analyzeImage } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const handleChange = (e, setFile, documentType) => {
    const file = e.target.files[0];
    setFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({
          ...prev,
          [documentType]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!aadhar || !pan || !studentId) {
      toast.error("Please upload all documents first");
      return;
    }
    if (!account) {
      toast.error("Connect to wallet first");
    } else {
      const aadharDetails = await analyzeImage(aadhar, "aadhar");
      const panDetails = await analyzeImage(pan, "pan");
      const idDetails = await analyzeImage(studentId, "id");

      if (aadharDetails.name !== panDetails.name || aadharDetails.name !== idDetails.name) {
        toast.error("Name doesn't match in documents");
        return;
      } else if (panDetails.dob !== idDetails.dob) {
        toast.error("Date of birth doesn't match in documents");
        return;
      } else if (panDetails.fatherName !== idDetails.fatherName) {
        toast.error("Father's name doesn't match in documents");
        return;
      }
      setLoading(false);
      const blockUpload = await uploadToBlockchain({
        name: aadharDetails.name,
        fatherName: panDetails.fatherName,
        dob: panDetails.dob,
        aadharNumber: aadharDetails.aadharNumber,
        panNumber: panDetails.panNumber,
      });
      console.log(blockUpload);
      toast.success("Details successfully uploaded to Blockchain");
    }
  };

  const { signAndSubmitTransaction } = useWallet();

  const uploadToBlockchain = async ({ name, fatherName, dob, aadharNumber, panNumber }) => {
    const moduleAddress = "0xcd28a619586aff3cb9b14f15096875ee980f11135aba3f5bc7ab39c47dd7fd8f";
    const moduleName = "user_details";
    const payload = {
      data: {
        function: `${moduleAddress}::${moduleName}::set_user_details`,
        functionArguments: [name, fatherName, dob, aadharNumber, panNumber],
      },
    };
    const response = await signAndSubmitTransaction(payload);
    return response;
  };

  const FileUploadField = ({ label, onChange, preview, documentType }) => (
    <div className="mb-8">
      <label className="block text-lg font-medium mb-3 text-gray-200">{label}</label>
      <div className="relative">
        <input
          type="file"
          accept=".jpg, .jpeg, .png, .pdf"
          onChange={(e) => onChange(e)}
          className="hidden"
          id={label}
        />
        <label
          htmlFor={label}
          className="group flex items-center justify-center w-full p-6 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-800 transition-all duration-300"
        >
          {preview ? (
            <div className="relative w-full">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-48 object-contain rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <p className="text-white text-sm">Click to change file</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-2">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M24 14v14m7-7H17m21 1a10 10 0 11-20 0 10 10 0 0120 0z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-400 group-hover:text-gray-300">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, JPEG or PDF (max. 10MB)
              </p>
            </div>
          )}
        </label>
      </div>
      
      {preview && (
        <div className="mt-2 flex justify-end">
          <button
            onClick={() => {
              setPreviews(prev => ({ ...prev, [documentType]: null }));
              onChange({ target: { files: [] }});
            }}
            className="text-sm text-red-400 hover:text-red-300 transition-colors duration-300"
          >
            Remove file
          </button>
        </div>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex bg-gray-900 min-h-screen justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-[#212121] pt-4">
      <NavBar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 backdrop-blur-lg border border-gray-700">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Document Verification
              </h1>
              <p className="text-gray-400 text-lg">
                Please upload your documents for identity verification
              </p>
            </div>

            <div className="space-y-6">
              <FileUploadField
                label="Aadhar Card"
                onChange={(e) => handleChange(e, setAadhar, 'aadhar')}
                preview={previews.aadhar}
                documentType="aadhar"
              />
              <FileUploadField
                label="PAN Card"
                onChange={(e) => handleChange(e, setPan, 'pan')}
                preview={previews.pan}
                documentType="pan"
              />
              <FileUploadField
                label="College ID"
                onChange={(e) => handleChange(e, setStudentId, 'studentId')}
                preview={previews.studentId}
                documentType="studentId"
              />
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 transform hover:scale-105"
              >
                Verify Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
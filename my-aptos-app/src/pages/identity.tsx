import { Network } from "aptos";
import { Aptos, AptosConfig } from "@aptos-labs/ts-sdk";
import { InputViewFunctionData } from "@aptos-labs/ts-sdk";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import React, { useState } from 'react';
import NavBar from "../components/navbar";

const IdentityPage = () => {
  const [name, setName] = useState('');
  const [fathersName, setFathersName] = useState('');
  const [dob, setDob] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [loading, setLoading] = useState({
    name: false,
    fathersName: false,
    dob: false,
    aadhar: false,
    pan: false
  });
  const [error, setError] = useState({
    name: '',
    fathersName: '',
    dob: '',
    aadhar: '',
    pan: ''
  });

  const aptosConfig = new AptosConfig({ network: Network.TESTNET });
  const aptos = new Aptos(aptosConfig);
  const { account } = useWallet();
  const moduleAddress = "0xcd28a619586aff3cb9b14f15096875ee980f11135aba3f5bc7ab39c47dd7fd8f";
  const moduleName = "user_details";

  const handleFetchWithLoading = async (key, fetchFunction) => {
    if (!account?.address) {
      setError(prev => ({ ...prev, [key]: 'Please connect your wallet' }));
      return;
    }

    setLoading(prev => ({ ...prev, [key]: true }));
    setError(prev => ({ ...prev, [key]: '' }));

    try {
      await fetchFunction();
    } catch (err) {
      setError(prev => ({ ...prev, [key]: 'Failed to fetch data' }));
      console.error(err);
    } finally {
      setLoading(prev => ({ ...prev, [key]: false }));
    }
  };

  const getName = async () => {
    const payload: InputViewFunctionData = {
      function: `${moduleAddress}::${moduleName}::get_user_name`,
      functionArguments: [account?.address]
    };
    const user_name = (await aptos.view({ payload }))[0];
    if (user_name !== undefined && typeof user_name === "string") {
      setName(user_name);
    }
  };

  const getFatherName = async () => {
    const payload: InputViewFunctionData = {
      function: `${moduleAddress}::${moduleName}::get_father_name`,
      functionArguments: [account?.address]
    };
    const user_father = (await aptos.view({ payload }))[0];
    if (user_father !== undefined && typeof user_father === "string") {
      setFathersName(user_father);
    }
  };

  const getDOB = async () => {
    const payload: InputViewFunctionData = {
      function: `${moduleAddress}::${moduleName}::get_date_of_birth`,
      functionArguments: [account?.address]
    };
    const user_dob = (await aptos.view({ payload }))[0];
    if (user_dob !== undefined && typeof user_dob === "string") {
      setDob(user_dob);
    }
  };

  const getAadharNumber = async () => {
    const payload: InputViewFunctionData = {
      function: `${moduleAddress}::${moduleName}::get_aadhar_number`,
      functionArguments: [account?.address]
    };
    const aadhar = (await aptos.view({ payload }))[0];
    if (aadhar !== undefined && typeof aadhar === "string") {
      setAadharNumber(aadhar.substring(10, aadhar.length - 1));
    }
  };

  const getPanNumber = async () => {
    const payload: InputViewFunctionData = {
      function: `${moduleAddress}::${moduleName}::get_pan_number`,
      functionArguments: [account?.address]
    };
    const pan = (await aptos.view({ payload }))[0];
    if (pan !== undefined && typeof pan === "string") {
      setPanNumber(pan);
    }
  };

  return (
    <div className="min-h-screen bg-[#212121] pt-4">
      <NavBar />
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8 text-center">
            User Information Dashboard
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-500 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Personal Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Full Name</span>
                    <button
                      onClick={() => handleFetchWithLoading('name', getName)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                      disabled={loading.name}
                    >
                      {loading.name ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : 'Fetch'}
                    </button>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg text-gray-300">
                    {name || "Not available"}
                  </div>
                  {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Father's Name</span>
                    <button
                      onClick={() => handleFetchWithLoading('fathersName', getFatherName)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                      disabled={loading.fathersName}
                    >
                      {loading.fathersName ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : 'Fetch'}
                    </button>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg text-gray-300">
                    {fathersName || "Not available"}
                  </div>
                  {error.fathersName && <p className="text-red-500 text-sm mt-1">{error.fathersName}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Date of Birth</span>
                    <button
                      onClick={() => handleFetchWithLoading('dob', getDOB)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                      disabled={loading.dob}
                    >
                      {loading.dob ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : 'Fetch'}
                    </button>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg text-gray-300">
                    {dob || "Not available"}
                  </div>
                  {error.dob && <p className="text-red-500 text-sm mt-1">{error.dob}</p>}
                </div>
              </div>
            </div>

            {/* Identity Information Card */}
            <div className="bg-gray-800 rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-500 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-white">Identity Documents</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">Aadhar Number</span>
                    <button
                      onClick={() => handleFetchWithLoading('aadhar', getAadharNumber)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                      disabled={loading.aadhar}
                    >
                      {loading.aadhar ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : 'Fetch'}
                    </button>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg text-gray-300">
                    {aadharNumber || "Not available"}
                  </div>
                  {error.aadhar && <p className="text-red-500 text-sm mt-1">{error.aadhar}</p>}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400">PAN Number</span>
                    <button
                      onClick={() => handleFetchWithLoading('pan', getPanNumber)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50"
                      disabled={loading.pan}
                    >
                      {loading.pan ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : 'Fetch'}
                    </button>
                  </div>
                  <div className="bg-gray-900 p-3 rounded-lg text-gray-300">
                    {panNumber || "Not available"}
                  </div>
                  {error.pan && <p className="text-red-500 text-sm mt-1">{error.pan}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentityPage;
import { createContext, useState } from "react";
import React from "react";

export const MyContext = createContext<any>(null);
export const ContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [result, setResults] = useState(null);
  const endpoint = import.meta.env.VITE_RECOGNIZER_ENDPOINT;
  const apiKey = import.meta.env.VITE_RECOGNIZER_KEY;
  const analyzeImage = async (file, docName) => {
    try {
      setLoading(true);
      setError(null);

      const analyzeResponse = await fetch(
        `${endpoint}/formrecognizer/documentModels/prebuilt-document:analyze?api-version=2022-08-31`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': apiKey,
          },
          body: file
        }
      );

      if (!analyzeResponse.ok) {
        throw new Error('Failed to analyze document');
      }

      const operationLocation = analyzeResponse.headers.get('operation-location');

      let complete = false;
      while (!complete) {
        const resultResponse = await fetch(operationLocation, {
          headers: {
            'Ocp-Apim-Subscription-Key': apiKey,
          }
        });

        const result = await resultResponse.json();
        console.log(result)
        const keypairs = result?.analyzeResult?.keyValuePairs;
        console.log(keypairs)
        const wordList = result?.analyzeResult?.pages?.at(0)?.words;
        console.log(wordList)

        if (docName === "aadhar") {
          const hindiRegex = /[\u0900-\u097F]/;
          let dob = "";
          let name = "";
          let aadharNumber = "";
          if (wordList) {
            let arr: string[] = [];
            for (let i = 0; i < wordList.length; i++) {
              if (wordList[i].content.toLowerCase() === 'vid' || wordList[i].content.toLowerCase() === 'vid:' || wordList[i].content.toLowerCase() === 'vid :') {
                break;
              }
              if (!hindiRegex.test(wordList[i].content)) {
                if (!(wordList[i].content === '-' || wordList[i].content.toLowerCase() === 'government' || wordList[i].content.toLowerCase() === 'of' || wordList[i].content.toLowerCase() === 'of' || wordList[i].content.toLowerCase() === 'india' || wordList[i].content.toLowerCase() === 'issue' || wordList[i].content.toLowerCase() === 'dob' || wordList[i].content.toLowerCase() === 'india' || wordList[i].content.toLowerCase() === 'issue' || wordList[i].content.toLowerCase() === 'date:' || wordList[i].content.toLowerCase() === 'download' || wordList[i].content === '/' || wordList[i].content === ':')) {
                  arr.push(wordList[i].content)
                }
              }
            }

            const uniqueArray = [...new Set(arr)];

            aadharNumber = uniqueArray[uniqueArray.length - 3] + uniqueArray[uniqueArray.length - 2] + uniqueArray[uniqueArray.length - 1];

            const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

            let giveName: boolean = true;

            for (let i = 0; i < uniqueArray.length; i++) {
              if (datePattern.test(uniqueArray[i])) {
                dob = uniqueArray[i];
              }
              if (!datePattern.test(uniqueArray[i]) && giveName) {
                if (uniqueArray[i].toLowerCase() === 'male' || uniqueArray[i].toLowerCase() === 'female') {
                  giveName = false;
                  continue;
                }
                name += uniqueArray[i] + " ";
              }
            }
          }
          const details = {
            name: name.toLowerCase().trim(),
            dob: dob.split('-').join('/'),
            aadharNumber: aadharNumber.toLowerCase()
          }
          if (result.status === 'succeeded') {
            setResults(result);
            complete = true;
            console.log(details);
            return details;
          } else if (result.status === 'failed') {
            throw new Error('Analysis failed');
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
        }

        if (docName === 'pan') {

          const details = {
            name: "",
            dob: "",
            panNumber: "",
            fatherName: "",
          }
          if (keypairs) {

            // console.log("result is : " , result?.analyzeResult?.keyValuePairs)
            const values = result?.analyzeResult?.keyValuePairs;

            for (let i = 0; i < values.length; i++) {
              let fieldName = values[i].key.content.split('/').at(-1);

              if (fieldName.toLowerCase().trim() === "name") {
                let value = values[i].value.content.toLowerCase();
                details.name = (value.includes("\n") ? value.split("\n")[1] : value)
                details.panNumber = (value.includes("\n") ? value.split("\n")[0] : "")
              }
              else if (fieldName.toLowerCase().trim() === "father's name") {
                let value = values[i].value.content.toLowerCase();
                details.fatherName = value.includes("\n") ? value.split("\n")[1] : value;
              }
              else if (fieldName.toLowerCase().trim() === "date of birth") {
                let value = values[i].value.content.toLowerCase();
                details.dob = (value.includes("\n") ? value.split("\n")[1] : value).split('-').join('/');
              }
              let value = values[i].value.content;
              console.log(fieldName, " : ", value);
              console.log(details)
            }
          }

          if (result.status === 'succeeded') {
            setResults(result);
            complete = true;
            return details;
          } else if (result.status === 'failed') {
            throw new Error('Analysis failed');
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
        }

        if (docName === 'id') {
          const details = {
            name: "",
            fatherName: "",
            dob: "",
          }
          if (keypairs) {
            const values = result?.analyzeResult?.keyValuePairs;
            for (let i = 0; i < values.length; i++) {
              let fieldName = values[i].key.content.split('/').at(-1);

              if (fieldName.toLowerCase().trim() === "name:" || fieldName.toLowerCase().trim() === "name :") {
                let value = values[i].value.content.toLowerCase();
                details.name = value.includes("\n") ? value.split("\n")[1] : value;
              }
              else if (fieldName.toLowerCase().trim() === "parent name:" || fieldName.toLowerCase().trim() === "parent name :") {
                let value = values[i].value.content.toLowerCase();
                details.fatherName = value.includes("\n") ? value.split("\n")[1] : value;
              }
              else if (fieldName.toLowerCase().trim() === "d.0.b :" || fieldName.toLowerCase().trim() === "d.o.b :" || fieldName.toLowerCase().trim() === "d.o.b:" || fieldName.toLowerCase().trim() === "d.0.b:") {
                let value = values[i].value.content.toLowerCase();
                details.dob = (value.includes("\n") ? value.split("\n")[1] : value).split('-').join('/');
              }
              console.log(details)
            }
            complete = true;
            return details;
          }
          if (result.status === 'succeeded') {
            setResults(result);
            complete = true;
            console.log("details just before return : ", details)
            return details;
          } else if (result.status === 'failed') {
            throw new Error('Analysis failed');
          }
          await new Promise(resolve => setTimeout(resolve, 5000));
        }

      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <MyContext.Provider value={{ analyzeImage, loading , result }}>
      {children}
    </MyContext.Provider>
  )
}






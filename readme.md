DocBlock :- Decentralized Document Verification Dapp
========================================

Overview
--------

This project is a decentralized application (dapp) that securely verifies user documents by combining AI-powered text extraction with blockchain technology. Users can upload important documents (such as Aadhar, PAN, and student ID), and our AI model extracts and verifies key information from these documents. Once validated, the data is securely stored on the Aptos blockchain, ensuring immutability and transparency. Future updates will include support for Zero-Knowledge Proofs (ZKP) to enhance privacy and allow users to verify data without revealing sensitive details.

Features
--------

*   **Document Upload**: Users can upload documents like Aadhar, PAN, and student IDs.
    
*   **AI-Powered Text Extraction**: Extracts and verifies critical details (name, date of birth, ID numbers) from documents.
    
*   **Blockchain Storage**: Once verified, the details are securely uploaded to the Aptos blockchain.
    
*   **Future ZKP Integration**: Plans to implement Zero-Knowledge Proofs for enhanced privacy.
    

Tech Stack
----------

*   **Frontend**: React , TypeScript , Tailwind CSS 
    
*   **AI Model**: Custom text extraction model for document processing
    
*   **Blockchain**: Aptos blockchain for secure, decentralized data storage
    

Getting Started
---------------

### Prerequisites

*   Node.js (for React frontend)
  
*   Aptos account and wallet setup (for blockchain integration)

### Installation

1. Clone Github Repo.

```

git clone https://github.com/Ayushsingla1/dappathon-dapp

```
2.  Frontend Setup (React):

```

cd my-aptos-app
yarn  
yarn run dev

```
        
 The frontend should now be running on http://localhost:5173.
 

File Structure
---------------

```
dappathon-dapp/
├── my-aptos-app/            # React frontend code
│   ├── src/
│   └── public/
├── smart-contract/          # Move-Aptos Smart Contract
│   ├── sources/
│   └── Move.toml/           
└── README.md
```
        
3.  **Blockchain Integration**:
    
    *   Ensure your Aptos account is set up and integrated in the backend code for document verification uploads.
        

Usage
-----

1.  **Upload Documents**: Use the frontend interface to upload required documents (Aadhar, PAN, student ID).
    
2.  **Text Extraction & Verification**: The AI model processes uploaded documents, extracts text, and verifies details.
    
3.  **Blockchain Storage**: Once verified, details are securely stored on the Aptos blockchain.
    
4.  **Future ZKP Integration**: Coming soon, allowing users to prove their details without revealing actual data.
    

Future Enhancements
-------------------

*   **Zero-Knowledge Proofs (ZKP)**: To provide enhanced privacy by allowing verification without data exposure.
    
*   **Additional Document Types**: Expanding support for more document types.
    
*   **User Dashboard**: A dashboard for users to view and manage their verified documents.

Important Links
-------------------
*  [Demo Video](https://youtu.be/VezYbjqyaos)
  
*  [Live Deployed Link](https://dappathon-aptos.onrender.com/)
  
*  [Github Repo](https://github.com/Ayushsingla1/dappathon-dapp)
  
*  [SmartContract Deployment Link](https://explorer.aptoslabs.com/account/0xcd28a619586aff3cb9b14f15096875ee980f11135aba3f5bc7ab39c47dd7fd8f/modules/code/user_details?network=testnet)

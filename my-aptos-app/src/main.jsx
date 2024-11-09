import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PetraWallet } from "petra-plugin-wallet-adapter";
import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import {BrowserRouter} from "react-router-dom"
import { ContextProvider } from './components/context.tsx';
import { Toaster } from 'react-hot-toast';


const wallets = [new PetraWallet()];

createRoot(document.getElementById('root')).render(
  <AptosWalletAdapterProvider plugins={wallets} autoConnect={true}>
    <Toaster/>
    <BrowserRouter>
    <ContextProvider>
      <App/>
    </ContextProvider>
    </BrowserRouter>
  </AptosWalletAdapterProvider>
)

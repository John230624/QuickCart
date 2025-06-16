'use client';
import { ClerkProvider } from "@clerk/nextjs";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { frFR } from "@clerk/localizations";

const ClientProviders = ({ children }) => {
  return (
    <ClerkProvider localization={frFR}>
      <Toaster />
      <AppContextProvider>
        {children}
      </AppContextProvider>
    </ClerkProvider>
  );
};

export default ClientProviders;
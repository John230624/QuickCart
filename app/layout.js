import { Outfit } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";


const outfit = Outfit({ subsets: ['latin'], weight: ["300", "400", "500"] });

export const metadata = {
  title: "Plawimadd Group",
  description: "E-Commerce website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

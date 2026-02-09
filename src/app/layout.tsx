import type { Metadata } from "next";
import "./styles/globals.scss";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "DiveSea - NFT Marketplace",
  description: "Discover, collect, and sell extraordinary NFTs on DiveSea marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

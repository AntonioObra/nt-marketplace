import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useStateContext } from "../context";

import { DisplayNfts, Footer } from "../components";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);

  const { address, contract, getUserNFTs } = useStateContext();

  const fetchNFTs = async () => {
    setIsLoading(true);
    const data = await getUserNFTs();

    setNfts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchNFTs();
  }, [address, contract]);

  console.log(nfts);

  return (
    <main className="min-h-screen  ">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <section className="container mx-auto my-14">
        <div className="flex flex-col justify-between items-top md:flex-row max-w-7xl mx-auto">
          <DisplayNfts nfts={nfts} />
        </div>
      </section>

      <Footer />
    </main>
  );
}

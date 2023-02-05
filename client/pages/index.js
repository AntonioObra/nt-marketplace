import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { useStateContext } from "../context";
import { DisplayNfts, Footer } from "../components";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [nfts, setNfts] = useState([]);

  const { address, contract, getNFTs } = useStateContext();

  const fetchNFTs = async () => {
    setIsLoading(true);
    const data = await getNFTs();

    setNfts(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchNFTs();
  }, [address, contract]);

  return (
    <main className="min-h-screen relative ">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <section className="h-screen ">
        <div className="flex container   mx-auto relative">
          <div className="absolute top-0  left-0 w-1/2  mt-28 flex flex-col ">
            <h1 className="text-8xl  font-bold  tracking-wide text-white leading-none text-left">
              Discover, collect <br></br> & sell NFTs
            </h1>
            <p className="text-2xl text-left font-bold lowercase tracking-wide text-gray-500 leading-none mt-4 pr-10">
              Create, buy, sell and discover digital collectibles in cyberpunk
              style, powered by{" "}
              <span className="text-rose-600">Midjourney</span>
            </p>
            <div className="flex justify-start space-x-10">
              <Link href="/nfts">
                <button className="bg-violet-600 shadow-[0_20px_50px_rgba(109,_40,_217,_0.7)] text-white font-bold py-4 px-10 rounded-full mt-10 w-fit ">
                  Explore
                </button>
              </Link>
              <Link href="/create">
                <button className="border-2 border-rose-600 shadow-2xl shadow-rose-500/30 text-white font-bold py-4 px-10 rounded-full mt-10 w-fit ">
                  Create
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-1/2 h-screen z-0">
          <Image
            src="/images/ellie4.png"
            alt="Header Image"
            width={1500}
            height={1500}
            className="object-cover h-full w-full z-0"
          />
        </div>
      </section>

      <section className="container mx-auto my-10">
        <div className="flex flex-col justify-between items-top  ">
          <h1 className="text-8xl  font-bold  tracking-wide text-white leading-none text-right">
            Featured NFTs from our <br></br>{" "}
            <span className="text-violet-700 ">cyberpunk</span> collection
          </h1>
          <div className="mt-20">
            <DisplayNfts nfts={nfts} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

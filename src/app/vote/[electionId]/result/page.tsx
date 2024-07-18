"use client";
import Navbar from "@src/app/components/Navbar";
import ResultsChart from "@src/app/components/ResultsChart";
import Head from "next/head";
import Image from "next/image";
import process from "process";
import React, {
  useEffect,
  useState,
} from "react";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

interface Candidate {
  candidateId: number;
  name: string;
  picture?: string;
  votes: number;
}

interface ElectionResults {
  total: number;
  results: {
    title: string;
    candidates: Candidate[];
  };
}

const Result: React.FC<{
  params: { electionId: string };
}> = ({ params }) => {
  const id = params.electionId;
  const [data, setData] =
    useState<ElectionResults | null>(null); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    async function getResults() {
      try {
        const response = await fetch(
          `${API_HOST}/api/votes/${id}/result`
        );
        const result: ElectionResults =
          await response.json();
        setData(result.data);
        setLoading(false); // Data fetched, set loading to false
      } catch (error) {
        console.error(
          "Error fetching election results:",
          error
        );
        setLoading(false);
      }
    }
    getResults();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Election Results</title>
        <meta
          name="description"
          content="Election results page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <h1 className="text-sm font-semibold mb-4 px-6 py-4 bg-gray-200 border-b border-gray-300">
              Results
            </h1>
            <h2 className="p-6 font-serif font-bold from-stone-950 text-3xl"></h2>
            <div className="my-6">
              {data?.results.candidates.map(
                (candidate) => (
                  <label
                    key={candidate.id}
                    className="flex flex-row items-center space-x-2 cursor-pointer my-7"
                  >
                    <div className="flex space-x-4 items-center justify-center">
                      {candidate.picture && (
                        <Image
                          src={candidate.picture}
                          alt={`${candidate.name}'s picture`}
                          className="md:w-16 md:h-16  object-cover basis-1/4"
                          width={64}
                          height={64}
                        />
                      )}
                      <span className="md:text-3xl md:min-w-96 font-semibold">
                        {candidate.name}
                      </span>
                    </div>
                  </label>
                )
              )}
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              data && (
                <div className="m-10">
                  <ResultsChart data={data} />
                </div>
              )
              // Render the chart with fetched data
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Result;

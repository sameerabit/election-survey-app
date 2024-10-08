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
const NEXT_PUBLIC_IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL;

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
        const result: any = await response.json();
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
    const interval = setInterval(() => {
      getResults();
    }, 10000); // 10000ms = 10 seconds
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
          <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <h1 className="text-sm font-semibold text-gray-800 mb-4 px-6 py-4 bg-gray-200 border-b border-gray-300">
              Results - {data?.results.title}
            </h1>
            <h2 className="p-6 font-serif font-bold text-gray-800 text-3xl">
              {data?.results.title}
            </h2>
            <div className="m-10">
              <h6>
                <span className="font-semibold text-3xl">
                  Current Total Votes:
                </span>
                <span className="font-bold p-2 text-3xl">
                  {data?.total}
                </span>
              </h6>
            </div>
            <div className="m-10">
              <table className="table-auto w-full border-collapse">
                <thead className="bg-gray-100">
                  <tr className="text-left font-semibold text-gray-700">
                    <th className="border-b border-gray-300 py-2 px-4">
                      Candidates
                    </th>
                    <th className="border-b border-gray-300 py-2 px-4 text-right">
                      Vote Count
                    </th>
                    <th className="border-b border-gray-300 py-2 px-4 text-right">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-800">
                  {data?.results.candidates.map(
                    (candidate: any) => (
                      <tr
                        key={candidate.id}
                        className="border-b border-gray-200"
                      >
                        <td className="flex items-center py-2 px-4">
                          {candidate.picture && (
                            <Image
                              src={`${NEXT_PUBLIC_IMAGE_URL}${candidate.picture}`}
                              alt={`${candidate.name}'s picture`}
                              className="w-10 h-10 rounded-full object-cover mr-4"
                              width={40}
                              height={40}
                            />
                          )}
                          <span className="text-lg font-medium text-right">
                            {candidate.name}
                          </span>
                        </td>
                        <td className="py-2 px-4 text-righ text-right">
                          <span className="text-lg font-medium">
                            {
                              candidate._count
                                .Vote
                            }
                          </span>
                        </td>
                        <td className="py-2 px-4 text-right">
                          <span className="text-lg font-medium">
                            {(
                              (candidate._count
                                .Vote /
                                data?.total) *
                              100
                            ).toFixed(2)}
                            %
                          </span>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
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

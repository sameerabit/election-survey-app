"use client";
import Head from "next/head";
import React, {
  useEffect,
  useState,
} from "react";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

const API_HOST = serverRuntimeConfig.apiHost;
const NEXT_PUBLIC_IMAGE_URL =
  serverRuntimeConfig.imageUrl;

interface ElectionWithDetails {
  country: any;
  candidates: [];
}

const Survey: React.FC = () => {
  const [elections, setElections] = useState<
    ElectionWithDetails[]
  >([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchElections = async () => {
      try {
        const response = await fetch(
          `${API_HOST}/api/elections`
        );
        const data = await response.json();
        setElections(data);
      } catch (error) {
        console.error(
          "Error fetching elections:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchElections();
  }, []);

  const handleVoteClick = (
    electionId: number
  ) => {
    // Navigate to the detailed voting page
    router.push(`/vote/${electionId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Select Referendum</title>
        <meta
          name="description"
          content="Survey"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex items-center justify-center py-20">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <h1 className="p-6 font-serif font-bold from-stone-950 text-3xl">
              {" "}
              Ongoing Elections
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {elections.map((election: any) => (
                <div
                  key={election.id}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h2 className="text-xl font-bold mb-2">
                    {election.title}
                  </h2>
                  <p className="mb-2">
                    <strong>Country:</strong>{" "}
                    {election.country.name}
                  </p>
                  <p className="mb-4">
                    {election.description}
                  </p>
                  <div>
                    <h3 className="font-semibold mb-2">
                      Candidates:
                    </h3>
                    <ul className="flex flex-wrap">
                      {election.candidates.map(
                        (candidate: any) => (
                          <li
                            key={candidate.id}
                            className="mb-2 flex items-center mx-2"
                          >
                            {candidate.picture && (
                              <Image
                                src={`${NEXT_PUBLIC_IMAGE_URL}/${candidate.picture}`}
                                width={100}
                                height={100}
                                alt={
                                  candidate.name
                                }
                                className="w-10 h-10 rounded-full mr-2"
                              />
                            )}
                            <span>
                              {candidate.name}
                            </span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                  <div className="flex mt-4 text-sm text-gray-600 justify-between">
                    <span>
                      <strong>
                        Last Voting Date:
                      </strong>{" "}
                      {new Date(
                        election.endDate
                      ).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() =>
                        handleVoteClick(
                          election.id
                        )
                      }
                      className="mt-4 mx-2 bg-blue-500 text-white px-4 py-2 rounded text-right"
                    >
                      Vote
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Survey;

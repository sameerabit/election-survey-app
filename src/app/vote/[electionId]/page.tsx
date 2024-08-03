// pages/vote.tsx

"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import { useAuth } from "@src/app/context/AuthContext";
import { useRouter } from "next/navigation";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const NEXT_PUBLIC_IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL;

interface Vote {
  params: { electionId: string };
}

const Vote: React.FC<Vote> = ({
  params,
}: {
  params: { electionId: string };
}) => {
  const id = params.electionId;

  const [candidates, setCandidates] = useState(
    []
  );
  const [election, setElection] = useState(
    {} as any
  );
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  console.log(user);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

  const [
    selectedCandidate,
    setSelectedCandidate,
  ] = useState(0);

  const [showConfirmation, setShowConfirmation] =
    useState(false);

  const [showMessageBox, setShowMessageBox] =
    useState(false);

  const [afterVoteMessage, setAfterVoteMessage] =
    useState(
      "You have voted successfully. Thanks for Voting!"
    );

  const handleCandidateChange = (
    candidateId: number
  ) => {
    setSelectedCandidate(candidateId);
    setShowConfirmation(true); // Show confirmation popup
  };

  useEffect(() => {
    if (id !== null) {
      const fetchCandidates = async () => {
        try {
          const response = await fetch(
            `${API_HOST}/api/elections/${id}`
          );
          if (!response.ok) {
            throw new Error(
              "Failed to fetch candidates"
            );
          }
          const data = await response.json();
          setElection(data);
          data.candidates.forEach(
            (candidate: any) => {
              candidate["picturePreview"] =
                candidate.picture
                  ? NEXT_PUBLIC_IMAGE_URL +
                    candidate.picture
                  : null;
              candidate["symbolPreview"] =
                candidate.symbol
                  ? NEXT_PUBLIC_IMAGE_URL +
                    candidate.symbol
                  : null;
            }
          );
          setCandidates(data.candidates);
        } catch (error) {
          console.error(
            "Error fetching candidates:",
            error
          );
        }
      };

      fetchCandidates();
    }
  }, [id]);

  const handleConfirmVote = async () => {
    if (
      id === null ||
      selectedCandidate === null
    ) {
      console.error(
        "Election or candidate not selected"
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_HOST}/api/votes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            electionId: id,
            candidateId: selectedCandidate,
            userId: user?.id, // Replace with actual user ID from authentication context
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "You have voted before. Thanks for voting!"
        );
      }

      const data = await response.json();
      console.log(
        "Vote cast successfully:",
        data
      );
      handleCancelVote();
      setShowMessageBox(true);
      setAfterVoteMessage(
        "Vote cast successfully!"
      );
    } catch (error: any) {
      handleCancelVote();
      setShowMessageBox(true);
      setAfterVoteMessage(error.message);
    }
  };

  const handleSeeReults = () => {
    setShowMessageBox(false);
    router.push(`/vote/${id}/result`);
  };

  const handleCancelVote = () => {
    setShowConfirmation(false);
    setSelectedCandidate(0);
  };

  const handleCancelMessageBox = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Cast Vote</title>
        <meta
          name="description"
          content="Cast your vote in the election."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <h1 className="text-sm font-semibold mb-4 px-6 py-4 bg-gray-200 border-b border-gray-300">
              Cast Your Vote
            </h1>
            <h2 className="p-6 font-serif font-bold from-stone-950 text-3xl">
              {election.title}
            </h2>

            <form className="p-6">
              {id !== null && (
                <div className="mb-4">
                  <label className="block text-sm text-gray-700 font-semibold mb-1">
                    Select Candidate:
                  </label>
                  <div className="my-6 text-gray-700">
                    {candidates.map(
                      (candidate: any) => (
                        <label
                          key={candidate.id}
                          className="flex flex-row items-center space-x-2 cursor-pointer my-7 text-gray-700"
                        >
                          <div className="flex space-x-4 items-center justify-center text-gray-700">
                            {candidate.picture && (
                              <Image
                                src={
                                  candidate.picturePreview
                                }
                                alt={`${candidate.name}'s picture`}
                                className="md:w-32 md:h-32 basis-1/4"
                                width={64}
                                height={64}
                              />
                            )}
                            <span className="md:text-3xl md:min-w-96 md:max-w-96 font-semibold text-gray-700">
                              {candidate.name}
                            </span>
                            {/* {candidate.symbol && (
                              <Image
                                src={
                                  candidate.symbolPreview
                                }
                                alt={`${candidate.name}'s symbol`}
                                className="w-16 h-16 object-cover"
                                width={64}
                                height={64}
                              />
                            )} */}
                            <input
                              type="checkbox"
                              checked={
                                selectedCandidate ===
                                candidate.id
                              }
                              onChange={() =>
                                handleCandidateChange(
                                  candidate.id
                                )
                              }
                              className="form-checkbox w-12 h-12 text-gray-700"
                            />
                          </div>
                        </label>
                      )
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </main>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Confirm Your Vote
            </h2>
            <p className="text-gray-500">
              Are you sure you want to vote for
              this candidate?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleConfirmVote}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={handleCancelVote}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showMessageBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">
              Done!
            </h2>
            <p>{afterVoteMessage}</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={handleSeeReults}
                className="bg-gray-300 text-black px-4 py-2 rounded"
              >
                Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vote;

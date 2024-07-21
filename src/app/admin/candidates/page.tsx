// pages/admin/candidates.tsx

"use client";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useState } from "react";

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Candidate 1",
      party: "Party 1",
      age: 35,
    },
    {
      id: 2,
      name: "Candidate 2",
      party: "Party 2",
      age: 40,
    },
    {
      id: 3,
      name: "Candidate 3",
      party: "Party 3",
      age: 45,
    },
    {
      id: 4,
      name: "Candidate 4",
      party: "Party 4",
      age: 50,
    },
    // Add more dummy data as needed
  ]);

  // Pagination
  const [currentPage, setCurrentPage] =
    useState(1);
  const [candidatesPerPage] = useState(5);

  // Search and filter state
  const [searchTerm, setSearchTerm] =
    useState("");
  const [filterParty, setFilterParty] =
    useState("");

  // Pagination logic
  const indexOfLastCandidate =
    currentPage * candidatesPerPage;
  const indexOfFirstCandidate =
    indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = candidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );

  const paginate = (pageNumber: number) =>
    setCurrentPage(pageNumber);

  // Filter logic
  const filteredCandidates =
    currentCandidates.filter((candidate) => {
      return (
        candidate.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (filterParty === "" ||
          candidate.party === filterParty)
      );
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>
          Candidates - Admin Dashboard
        </title>
        <meta
          name="description"
          content="View and manage candidates."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-indigo-600">
            Candidates
          </h1>
          <div className="container mx-auto">
            <h1 className="text-3xl font-semibold mb-4">
              Candidates
            </h1>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                className="mr-4 px-2 py-1 border border-gray-300 rounded"
              />
              <select
                value={filterParty}
                onChange={(e) =>
                  setFilterParty(e.target.value)
                }
                className="mr-4 px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">
                  Filter by party
                </option>
                <option value="Party 1">
                  Party 1
                </option>
                <option value="Party 2">
                  Party 2
                </option>
                <option value="Party 3">
                  Party 3
                </option>
                <option value="Party 4">
                  Party 4
                </option>
              </select>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Candidate
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">
                    Name
                  </th>
                  <th className="px-4 py-2">
                    Party
                  </th>
                  <th className="px-4 py-2">
                    Age
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map(
                  (candidate, index) => (
                    <tr key={candidate.id}>
                      <td className="border px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border px-4 py-2">
                        {candidate.name}
                      </td>
                      <td className="border px-4 py-2">
                        {candidate.party}
                      </td>
                      <td className="border px-4 py-2">
                        {candidate.age}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="mt-4"></div>
          </div>
          {/* Candidate management components go here */}
        </div>
      </main>
    </div>
  );
};

export default Candidates;

// pages/admin/elections.tsx

"use client";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useState } from "react";

const Elections: React.FC = () => {
  // Dummy data for elections
  const [elections, setElections] = useState([
    {
      id: 1,
      name: "Election 1",
      date: "2024-06-01",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Election 2",
      date: "2024-06-15",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Election 3",
      date: "2024-07-01",
      status: "Upcoming",
    },
    {
      id: 4,
      name: "Election 4",
      date: "2024-07-15",
      status: "Upcoming",
    },
    // Add more dummy data as needed
  ]);

  // Pagination
  const [currentPage, setCurrentPage] =
    useState(1);
  const [electionsPerPage] = useState(5);

  // Search and filter state
  const [searchTerm, setSearchTerm] =
    useState("");
  const [filterStatus, setFilterStatus] =
    useState("");

  // Pagination logic
  const indexOfLastElection =
    currentPage * electionsPerPage;
  const indexOfFirstElection =
    indexOfLastElection - electionsPerPage;
  const currentElections = elections.slice(
    indexOfFirstElection,
    indexOfLastElection
  );

  const paginate = (pageNumber: number) =>
    setCurrentPage(pageNumber);

  // Filter logic
  const filteredElections =
    currentElections.filter((election) => {
      return (
        election.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        (filterStatus === "" ||
          election.status === filterStatus)
      );
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Elections - Admin Dashboard</title>
        <meta
          name="description"
          content="View and manage elections."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-indigo-600">
            Elections
          </h1>
          <div>
            <h1 className="text-3xl font-semibold mb-4">
              Elections
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
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value)
                }
                className="mr-4 px-2 py-1 border border-gray-300 rounded"
              >
                <option value="">
                  Filter by status
                </option>
                <option value="Upcoming">
                  Upcoming
                </option>
                <option value="Ongoing">
                  Ongoing
                </option>
                <option value="Completed">
                  Completed
                </option>
              </select>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Add Election
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
                    Date
                  </th>
                  <th className="px-4 py-2">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredElections.map(
                  (election, index) => (
                    <tr key={election.id}>
                      <td className="border px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border px-4 py-2">
                        {election.name}
                      </td>
                      <td className="border px-4 py-2">
                        {election.date}
                      </td>
                      <td className="border px-4 py-2">
                        {election.status}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
            <div className="mt-4"></div>
          </div>
          {/* Election management components go here */}
        </div>
      </main>
    </div>
  );
};

export default Elections;

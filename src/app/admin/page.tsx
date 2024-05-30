// pages/admin.tsx
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Admin: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Admin Dashboard</title>
        <meta
          name="description"
          content="Admin dashboard to manage elections, candidates, and voters."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-indigo-600">
            Admin Dashboard
          </h1>
          <p className="text-lg text-center text-gray-700">
            Welcome to the admin dashboard. From
            here, you can manage elections,
            candidates, and voters.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/admin/elections"
              className="px-8 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              View Elections
            </Link>
            <Link
              href="/admin/candidates"
              className="px-8 py-3 text-lg font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              View Candidates
            </Link>
            <Link
              href="/admin/voters"
              className="px-8 py-3 text-lg font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              View Voters
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;

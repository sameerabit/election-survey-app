// pages/admin/voters.tsx
import Head from "next/head";
import Navbar from "../../components/Navbar";

const Voters: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Voters - Admin Dashboard</title>
        <meta
          name="description"
          content="View and manage voters."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-indigo-600">
            Voters
          </h1>
          <p className="text-lg text-center text-gray-700">
            Manage and view all voters here.
          </p>
          {/* Voter management components go here */}
        </div>
      </main>
    </div>
  );
};

export default Voters;

// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>
          Pre-Election Survey - Sri Lanka
        </title>
        <meta
          name="description"
          content="Participate in the pre-election survey for Sri Lanka."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="w-full max-w-4xl p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h1 className="text-4xl font-bold text-center text-indigo-600">
            Pre-Election Survey - Sri Lanka
          </h1>
          <p className="text-lg text-center text-gray-700">
            Welcome to the pre-election survey for
            Sri Lanka. Your opinion matters. Help
            us understand the pulse of the nation
            by participating in our survey.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/survey"
              className="px-8 py-3 text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Take the Survey
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 text-lg font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Login
            </Link>
          </div>
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              Why Participate?
            </h2>
            <ul className="mt-4 space-y-2 text-center text-gray-700 list-disc list-inside">
              <li>
                Make your voice heard on important
                national issues.
              </li>
              <li>
                Contribute to a comprehensive
                understanding of public opinion.
              </li>
              <li>
                Help shape the future of Sri
                Lanka.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

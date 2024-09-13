// pages/index.tsx
import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Image from "next/image";

const Home: React.FC = () => {
  return (
    <div
      className="min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: "url('/bg/bg.png')",
      }}
    >
      <Head>
        <title>Referendum - Sri Lanka</title>
        <meta
          name="description"
          content="Participate in the referendums for Sri Lanka."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-center font-bold text-indigo-600">
            Referendum - Sri Lanka
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-center text-indigo-600">
            ජනමත විචාරණය - கருத்துக் கேட்பு
          </h2>
          <p className="text-center text-gray-700 my-4 sm:my-6">
            Voice Your Choice: Secure, Simple, and
            Reliable Referendum Voting
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 my-6">
            <Link
              href="/survey"
              className="px-6 py-3 text-sm sm:text-base md:text-lg font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-center"
            >
              Cast Your Vote
            </Link>
            {/* <Link
              href="/register"
              className="px-6 py-3 text-sm sm:text-base md:text-lg font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 text-center"
            >
              Register
            </Link> */}
          </div>
          <div className="pt-6 border-t border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-900">
              Why Participate?
            </h2>
            <ul className="mt-4 space-y-2 text-center text-gray-700 list-disc list-inside">
              <li>
                Make Your Voice Heard: Your vote
                is your voice in shaping the
                future. Participating in the
                referendum gives you the power to
                influence important decisions that
                impact your community and country.
              </li>
              <li>
                Strengthen Democracy: Voting in a
                referendum is a fundamental
                democratic right. By
                participating, you contribute to a
                transparent and fair
                decision-making process, ensuring
                that the outcome represents the
                will of the people.
              </li>
              <li>
                Drive Positive Change: Your
                participation can lead to
                meaningful changes and
                improvements in policies, laws,
                and governance. Every vote counts,
                and your involvement can help
                bring about the change you wish to
                see.
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

// pages/admin/elections.tsx

"use client";
import { useState } from "react";
import Head from "next/head";
import Navbar from "../../../components/Navbar";

const CreateElection: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    country: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(formData);
    // Add your form submission logic here
  };

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
        <div className="container mx-auto">
          <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
            <h1 className="text-3xl font-semibold mb-4 px-6 py-4 bg-gray-200 border-b border-gray-300">
              Add Election
            </h1>
            <form
              onSubmit={handleFormSubmit}
              className="p-6"
            >
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Title:
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={4}
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Start Date:
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  End Date:
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Country:
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Election
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateElection;

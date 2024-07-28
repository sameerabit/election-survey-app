"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../../../../components/Navbar";
import AutocompleteCountry, {
  Country,
} from "../../../../components/AutocompleteCountry";
import { format } from "date-fns";
import Candidates from "@src/app/admin/candidates/page";
import Image from "next/image";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const NEXT_PUBLIC_IMAGE_URL =
  process.env.NEXT_PUBLIC_IMAGE_URL;

interface EditElectionProps {
  params: {
    id: string;
  };
}

const EditElection: React.FC<
  EditElectionProps
> = ({ params }: { params: { id: string } }) => {
  const id = params.id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    country: {} as Country,
    countryId: 0,
    candidates: [] as {
      id: string;
      name: string;
      picture: File | null;
      symbol: File | null;
      picturePreview: string | null; // Add preview URLs for images
      symbolPreview: string | null;
    }[],
  });

  useEffect(() => {
    if (id) {
      fetch(`${API_HOST}/api/elections/${id}`)
        .then((response) => response.json())
        .then((data) => {
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
          data.startDate = format(
            new Date(data.startDate),
            "yyyy-MM-dd"
          );
          data.endDate = format(
            new Date(data.endDate),
            "yyyy-MM-dd"
          );
          setFormData(data);
        })
        .catch((error) => {
          console.error(
            "Error fetching election data:",
            error
          );
        });
    }
  }, [id]);

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

    try {
      const formDataToSend = new FormData();

      console.log(formData.country);

      formDataToSend.append(
        "title",
        formData.title
      );
      formDataToSend.append(
        "description",
        formData.description
      );
      formDataToSend.append(
        "startDate",
        formData.startDate
      );
      formDataToSend.append(
        "endDate",
        formData.endDate
      );
      formDataToSend.append(
        "country",
        formData.country.id.toString()
      );

      formData.candidates.forEach(
        (candidate, index) => {
          formDataToSend.append(
            `candidates[${index}][id]`,
            candidate.id
          );
          formDataToSend.append(
            `candidates[${index}][name]`,
            candidate.name
          );
          if (candidate.picture) {
            formDataToSend.append(
              `candidates[${index}][picture]`,
              candidate.picture
            );
          }
          if (candidate.symbol) {
            formDataToSend.append(
              `candidates[${index}][symbol]`,
              candidate.symbol
            );
          }
        }
      );

      const response = await fetch(
        `${API_HOST}/api/elections/${id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      console.log(
        "Form submitted successfully:",
        data
      );
      // Optionally reset form fields or show success message
    } catch (error) {
      console.error(
        "Error submitting form:",
        error
      );
      // Handle error state, show error message, etc.
    }
  };

  const handleCandidateNameChange =
    (index: number) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setFormData((prevData) => {
        const candidates = [
          ...prevData.candidates,
        ];
        candidates[index].name = value;
        return { ...prevData, candidates };
      });
    };

  const handleCandidatePictureChange =
    (index: number) => (file: File | null) => {
      setFormData((prevData) => {
        const candidates = [
          ...prevData.candidates,
        ];
        candidates[index].picture = file;
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            candidates[index].picturePreview =
              reader.result as string;
            setFormData({
              ...prevData,
              candidates,
            });
          };
          reader.readAsDataURL(file);
        } else {
          candidates[index].picturePreview = null;
        }
        return { ...prevData, candidates };
      });
    };

  const handleCandidateSymbolChange =
    (index: number) => (file: File | null) => {
      setFormData((prevData) => {
        const candidates = [
          ...prevData.candidates,
        ];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            candidates[index].symbolPreview =
              reader.result as string;
            setFormData({
              ...prevData,
              candidates,
            });
          };
          reader.readAsDataURL(file);
        } else {
          candidates[index].symbolPreview = null;
        }
        candidates[index].symbol = file;
        return { ...prevData, candidates };
      });
    };

  const handleAddCandidate = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      candidates: [
        ...prevData.candidates,
        {
          name: "",
          picture: null,
          symbol: null,
          picturePreview: null,
          symbolPreview: null,
        },
      ],
    }));
  };

  const handleRemoveCandidate = (
    index: number
  ) => {
    setFormData((prevData) => {
      const candidates = [...prevData.candidates];
      candidates.splice(index, 1);
      return { ...prevData, candidates };
    });
  };

  const handleCountrySelect = (
    country: number
  ) => {
    setFormData((prevData: any) => {
      return { ...prevData, country };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>
          Edit Election - Admin Dashboard
        </title>
        <meta
          name="description"
          content="Edit election details."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg ">
            <h1 className="text-sm font-semibold mb-4 px-6 py-4 bg-gray-200 border-b border-gray-300">
              Edit Election
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
              <div className="grid sm:grid-cols-6 grid-cols-1 gap-x-6 gap-y-8">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-semibold mb-1">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div className="sm:col-span-3 mb-4">
                  <label className="block text-sm font-semibold mb-1">
                    End Date:
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-1">
                  Country:
                </label>
                <AutocompleteCountry
                  onCountrySelect={
                    handleCountrySelect
                  }
                  initialCountry={
                    formData.country
                  }
                />
              </div>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold mb-1">
                    Candidates:
                  </label>
                  {formData.candidates.map(
                    (candidate, index) => (
                      <div
                        key={index}
                        className="mb-4"
                      >
                        <label className="text-sm font-semibold mb-1">
                          Candidate {index + 1}{" "}
                          Name:
                        </label>
                        <input
                          type="text"
                          value={candidate.name}
                          onChange={handleCandidateNameChange(
                            index
                          )}
                          className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {candidate.picturePreview && (
                          <div className="mt-2">
                            <Image
                              src={
                                candidate.picturePreview
                              }
                              alt={`Preview of ${candidate.name}'s picture`}
                              className="max-w-xs"
                              width={100}
                              height={100}
                            />
                          </div>
                        )}
                        {/* Input for picture */}
                        <label className="text-sm font-semibold mb-1">
                          Picture:
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleCandidatePictureChange(
                              index
                            )(
                              e.target
                                .files?.[0] ||
                                null
                            )
                          }
                          className="mt-2"
                        />
                        {/* Display preview for symbol */}
                        {candidate.symbolPreview && (
                          <div className="mt-2">
                            <Image
                              src={
                                candidate.symbolPreview
                              }
                              alt={`Preview of ${candidate.name}'s symbol`}
                              className="max-w-xs"
                              width={100}
                              height={100}
                            />
                          </div>
                        )}
                        {/* Input for symbol */}
                        <label className="text-sm font-semibold mb-1">
                          Symbol:
                        </label>
                        <input
                          type="file"
                          onChange={(e) =>
                            handleCandidateSymbolChange(
                              index
                            )(
                              e.target
                                .files?.[0] ||
                                null
                            )
                          }
                          className="mt-2"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleRemoveCandidate(
                              index
                            )
                          }
                          className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
                        >
                          -
                        </button>
                      </div>
                    )
                  )}
                  <button
                    type="button"
                    onClick={handleAddCandidate}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update Election
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditElection;

// components/AutocompleteCountry.tsx

import { useState, useEffect } from "react";

export interface Country {
  id: number;
  name: string;
}

const AutocompleteCountry: React.FC<{
  onCountrySelect: (country: number) => void;
  initialCountry: Country;
}> = ({ onCountrySelect, initialCountry }) => {
  const API_HOST =
    process.env.NEXT_PUBLIC_API_HOST;

  const [options, setOptions] = useState<
    Country[]
  >([]);

  const [inputValue, setInputValue] = useState(
    initialCountry.name ? initialCountry.name : ""
  );

  useEffect(() => {
    initialCountry.name &&
      setInputValue(initialCountry.name);
  }, [initialCountry]);

  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] =
    useState(false);

  useEffect(() => {
    if (inputValue === "") {
      setOptions([]);
      return;
    }

    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_HOST}/api/countries?searchText=${inputValue}`
        );
        const countries = await response.json();
        setOptions(countries);
        setShowOptions(true);
      } catch (error) {
        console.error(
          "Error fetching countries:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, [inputValue]);

  return (
    <div className="relative w-72">
      <input
        type="text"
        value={inputValue}
        onChange={(e) =>
          setInputValue(e.target.value)
        }
        onFocus={() => setShowOptions(true)}
        onBlur={() =>
          setTimeout(
            () => setShowOptions(false),
            100
          )
        }
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search Countries"
      />
      {loading && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          <svg
            className="w-5 h-5 text-gray-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      )}
      {showOptions && options.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto mt-1">
          {options.map((option) => (
            <li
              key={option.id}
              onClick={() => {
                onCountrySelect(option.id);
                setInputValue(option.name);
                setShowOptions(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutocompleteCountry;

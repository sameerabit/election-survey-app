"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import RegisterRecaptcha from "../components/RegisterRecaptcha";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    agree_terms: false,
  });
  const [token, setToken] = useState<
    string | null
  >(null);
  const [disableSubmit, setDisableSubmit] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const childRef = useRef(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } =
      e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    // Enable submit button only if form is valid
    const isFormValid =
      formData.username &&
      formData.password &&
      formData.password ===
        formData.confirm_password &&
      formData.agree_terms;

    setDisableSubmit(!isFormValid);
  }, [formData]);

  const handleSubmit = async (formData: any) => {
    console.log(formData);

    try {
      const response = await fetch(
        `${API_HOST}/api/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        setErrorMessage(
          JSON.parse(await response.text())
            .message
        );
      } else {
        router.push("/login");
      }

      // Handle successful registration
    } catch (error) {
      console.error(
        "Error registering user:",
        error
      );
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Register</title>
        <meta
          name="description"
          content="Registration page"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className="flex items-center justify-center py-20">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">
            Create an account
          </h2>
          <form
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            {disableSubmit ? (
              <div
                className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
                role="alert"
              >
                <svg
                  className="fill-current w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
                </svg>
                <p>
                  Register by filling any username
                  password you like to have.
                </p>
              </div>
            ) : (
              ""
            )}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={
                    formData.confirm_password
                  }
                  onChange={handleChange}
                  className="block w-full px-3 py-2 text-gray-900 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree_terms"
                name="agree_terms"
                type="checkbox"
                checked={formData.agree_terms}
                onChange={handleChange}
                className="w-4 h-4 text-custom-purple border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="agree_terms"
                className="block ml-2 text-sm text-gray-900"
              >
                I agree to the{" "}
                <Link href="/terms" passHref>
                  Terms and Conditions
                </Link>
              </label>
            </div>

            <div className="py-0 text-center">
              <label className="text-red-700 my-4">
                {errorMessage}
              </label>
              <GoogleReCaptchaProvider reCaptchaKey="6LeW7i0qAAAAAGTRxgu4rVQx_effh6ErwvU4-04j">
                <RegisterRecaptcha
                  handleSubmit={handleSubmit}
                  disableSubmit={disableSubmit}
                  formData={formData}
                />
              </GoogleReCaptchaProvider>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Register;

"use client";
import React, {
  useState,
  useEffect,
  useCallback,
} from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface RegisterRecaptchaType {
  handleSubmit: (token: string) => void;
  disableSubmit: boolean;
  formData: any;
}

const RegisterRecaptcha: React.FC<
  RegisterRecaptchaType
> = ({
  handleSubmit,
  disableSubmit,
  formData,
}) => {
  const { executeRecaptcha } =
    useGoogleReCaptcha();

  // Create an event handler so you can call the verification on button click event or form submit
  const handleReCaptchaVerify =
    useCallback(async () => {
      if (!executeRecaptcha) {
        console.log(
          "Execute recaptcha not yet available"
        );
        return;
      }
      console.log("Hiii");
      const token = await executeRecaptcha(
        "voteglobe"
      );
      console.log(formData);
      handleSubmit({ ...formData, token });
      // Do whatever you want with the token
    }, [executeRecaptcha, formData]);

  const handleButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault(); // Prevents the default button action (e.g., form submission)
    handleReCaptchaVerify(); // Run reCAPTCHA verification on button click
  };

  return (
    <button
      type="submit"
      disabled={disableSubmit}
      onClick={handleButtonClick}
      className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Register
    </button>
  );
};

export default RegisterRecaptcha;

// components/Navbar.tsx
"use client";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <nav className="bg-custom-purple mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-white text-xs sm:text-sm md:text-base lg:text-2xl font-bold"
            ></Link>
          </div>
        </div>
        <div className="flex opacity-80 justify-center flex-row items-start">
          <p className="w-full max-w-4xl py-6 font-serif text-white">
            We are committed to protecting your
            privacy and ensuring compliance with
            the General Data Protection Regulation
            (GDPR). We want to assure you that our
            organization does not store any
            personal data in our databases. We
            only collect and use data in
            accordance with applicable laws and
            regulations, and we are dedicated to
            safeguarding your information. If you
            have any questions or concerns about
            your data, please feel free to contact
            me via email ceysocdis@gmail.com
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Footer;

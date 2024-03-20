import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-light text-xl">
      <div className="md:py-44 py-16 max-w-4xl mx-auto px-3 text-left">
        <h1 className="mx-auto md:text-7xl text-4xl font-bold text-gray-900 pb-4">
          Privacy Policy
        </h1>

        <p className="text-xl font-medium mb-10">
          Last updated: 18 December, 2023
        </p>
        <p>
          JobPortal is responsible for the personal information about you that
          is processed on our website ( ). The following policy applies when you
          use our website. We are constantly working on improving our services
          therefore this policy can be changed in the future. The purpose of
          this policy is to let our users know how we handle their personal
          information, what we use it for, who gets access to it and what rights
          our users have in regards to personal data.
        </p>

        <h2 className="text-3xl mb-4 mt-10">
          When and why do we process personal data
        </h2>

        <h3 className="text-2xl mb-2 mt-3">From you:</h3>
        <p>
          When you refer someone you tell us about yourself to make your
          referral more credible. We collect your name, current job title, email
          and link to your LinkedIn profile. You also have the option to add a
          motivation to your referral in free-form text boxes. If you do, we
          collect this motivation as well. We also collect info when you email
          or contact us. When you send information we will store your IP address
          and information about the device you use. We also collect data when
          you use our services through Cookies. See our cookies policy for more
          information ().
        </p>

        <h3 className="text-2xl mb-2 mt-3">From third parties</h3>
        <p>
          When someone refers you to a job we collect this information. We also
          collect information from social media. For example when you link to
          your or your friends LinkedIn profile to add credibility to your
          referral.{" "}
        </p>

        <h3 className="text-2xl mb-2 mt-3">
          Retention period for users who refer their friends
        </h3>
        <p>
          If you have not used the service for more than two (2) years, your
          data will be deleted.
        </p>

        <h3 className="text-2xl mb-2 mt-3">
          Retention period for users who got referred by someone
        </h3>
        <p>
          If you get referred by someone, we will contact you and ask for your
          approval. If you do not approve or answer to this message, the
          personal data that someone submitted when they referred you will be
          deleted.
        </p>

        <h2 className="text-3xl mb-4 mt-10">
          With whom do we share personal data?
        </h2>
        <p>
          The company that someone got referred to will get access to the data
          if the person who referred someone and the one who got referred if
          both accept it. In other words, if the person who got referred accepts
          the referral.
          <br /> <br />
          We host our website through Netlify, handle email submissions through
          EmailJS and store data on Firebase. Read more about their policies on{" "}
          <a
            rel="noreferrer"
            className="text-blue-400"
            href="https://vercel.com/"
            target="_blank"
          >
            https://vercel.com/
          </a>{" "}
          and{" "}
          <a
            rel="noreferrer"
            className="text-blue-400"
            href="https://www.mongodb.com/"
            target="_blank"
          >
            https://www.mongodb.com/
          </a>
          <br /> <br />
        </p>

        <h2 className="text-3xl mb-4 mt-10">Your rights</h2>
        <p>
          When we process your personal data you have the right to at any time
          contact us regarding any of the rights mentioned below. See contact
          information below.
        </p>
        <ul className="list-disc ml-5">
          <li>Access to your personal data</li>
          <li>Rectification of incorrect or inadequate personal data</li>
          <li>Object to certain processing</li>
          <li>Erasure of your personal data</li>
          <li>Restriction of the processing of your personal data</li>
          <li>Data portability</li>
        </ul>

        <h2 className="text-3xl mb-4 mt-10">Information security</h2>
        <p>
          We will ensure that the access to your data is secured by applying
          appropriate safeguards.
        </p>

        <h2 className="text-3xl mb-4 mt-10">Contact information</h2>
        <p>
          If you have any questions, please contact{" "}
          <span className="font-bold">Ricky(Kha)</span> by email at{" "}
          <span className="font-bold">nhatkha06299@gmail.com</span>
        </p>
      </div>
    </div>
  );
}

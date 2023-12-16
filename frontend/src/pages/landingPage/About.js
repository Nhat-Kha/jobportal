import { useEffect } from "react";

function About() {
  return (
    <div className="bg-primary">
      <div className="md:py-44 py-16 max-w-4xl mx-auto px-3 text-center">
        <h1 className="mx-auto md:text-7xl text-4xl font-bold text-gray-900 pb-4">
          About Greet
        </h1>

        <p className="text-xl font-medium">
          Greetings, we are Greet. We reward people to refer their friends to
          their dream job. Greet was founded in 2021 to help tech companies find
          the talent they need and to help people find a job that they love.
          Win-win 🥂
          <br />
          <br />
        </p>
      </div>
    </div>
  );
}

export default About;

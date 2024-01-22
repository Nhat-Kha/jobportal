import one from "assets/images/2.png";
import two from "assets/images/3.png";
import three from "assets/images/4.png";
import four from "assets/images/5.png";
import five from "assets/images/6.png";

export default function SocialMedia() {
  return (
    <div className="bg-lightYellow py-20">
      <h1 className="md:text-6xl text-4xl font-bold text-gray-900 text-center pb-3">
        Follow us
      </h1>
      <p className="text-lg text-center mb-12 px-3 font-normal">
        Follow us on{" "}
        <a
          className="font-bold border-black hover:text-secondary"
          href="https://www.instagram.com/kha_martin/"
          target="_blank"
          rel="noreferrer"
        >
          Instagram{" "}
        </a>{" "}
        and{" "}
        <a
          className="font-bold  border-black hover:text-secondary"
          href="https://www.facebook.com/profile.php?id=100011056752898"
          target="_blank"
          rel="noreferrer"
        >
          Facebook{" "}
        </a>
        to get updates on new jobs, companies and other fun stuff.
      </p>
      <div className="w-10/12 mx-auto grid md:grid-cols-5 grid-cols-2 gap-5 ">
        <a
          className="transform ease-in duration-100 hover:-translate-y-2 "
          href="https://www.facebook.com/profile.php?id=100011056752898"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={four}
            className="rounded-lg hover:shadow-lg "
            alt="instagram post"
          />
        </a>

        <a
          className="md:block hidden transform ease-in duration-100 hover:-translate-y-2"
          href="https://www.instagram.com/kha_martin/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="rounded-lg hover:shadow-lg "
            src={one}
            alt="instagram post"
          />
        </a>

        <a
          className="transform ease-in duration-100 hover:-translate-y-2"
          href="https://www.instagram.com/kha_martin/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="rounded-lg hover:shadow-lg "
            src={five}
            alt="instagram post"
          />
        </a>
        <a
          className="transform ease-in duration-100 hover:-translate-y-2"
          href="https://www.instagram.com/kha_martin/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="rounded-lg hover:shadow-lg "
            src={two}
            alt="instagram post"
          />
        </a>

        <a
          className="transform ease-in duration-100 hover:-translate-y-2 "
          href="https://www.instagram.com/kha_martin/"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="rounded-lg hover:shadow-lg "
            src={three}
            alt="instagram post"
          />
        </a>
      </div>
    </div>
  );
}

import curb from "assets/images/curb_bw.png";
import depict from "assets/images/depict_bw.png";
import volta from "assets/images/volta_bw.png";
import valtech from "assets/images/valtech.png";

export default function Trusted() {
  return (
    <div className="hidden md:grid grid-cols-12 w-11/12 mx-auto mt-12 gap-4 md:text-left text-center ">
      <div className="md:col-span-4 col-span-12">
        <h1 className="text-2xl text-black pb-3 font-semibold  mt-3">
          Trusted by
        </h1>
      </div>

      <div className=" md:col-span-2 col-span-6 h-16 opacity-30">
        <img src={valtech} className="h-full w-auto mx-auto" alt="curb food" />
      </div>

      <div className=" md:col-span-2 col-span-6 h-16">
        <img src={curb} className="h-full w-auto mx-auto" alt="curb food" />
      </div>

      <div className=" md:col-span-2 col-span-6 h-16">
        <img src={depict} className="h-full w-auto  mx-auto" alt="depict" />
      </div>

      <div className="md:col-span-2 col-span-8  h-16">
        <img
          src={volta}
          className="h-full w-auto  mx-auto"
          alt="volta greentech"
        />
      </div>
    </div>
  );
}

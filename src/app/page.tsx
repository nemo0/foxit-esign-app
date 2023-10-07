import { Great_Vibes } from "next/font/google";
import Link from "next/link";

const greatVibes = Great_Vibes({
  subsets: ["latin-ext"],
  weight: ["400"],
});

const Homepage = () => {
  return (
    <div>
      <div className="relative h-screen">
        <video
          src="/bg.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          loop
          muted
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-0"></div>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center z-10">
          <h2
            className={`mb-6 text-4xl text-center text-white z-10 shadow-text max-w-4xl ${greatVibes.className}`}
          >
            Find your dream home with us! Explore our properties, understand the
            benefits, and join our community.
          </h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 z-10">
            <Link href="/properties/create">
              <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                Lease a Property
              </button>
            </Link>
            <Link href="/properties">
              <button className="px-6 py-3 bg-teal-500 text-white rounded-lg transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl">
                Rent a Property
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;

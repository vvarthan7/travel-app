import Image from "next/image";

const Banner = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-0">
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[680px]">
        <Image
          src="/assets/images/hero-img.png"
          alt="Travel Banner"
          fill
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-white/80 via-white/40 to-transparent w-full h-full md:w-1/2"></div>
      </div>
      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-left text-white px-4 sm:px-6 md:max-w-176 md:px-8 lg:max-w-236 lg:px-0 xl:max-w-292.5 w-full">
        <div className="max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg">
          <h1 className="font-bold text-2xl sm:text-5xl md:text-6xl lg:text-7xl text-dark-100 mb-2 md:mb-3.5">
            Plan Your Trip with Ease
          </h1>
          <p className="font-normal text-base sm:text-lg text-dark-400 mb-2 md:mb-6">
            Customize your travel itinerary in minutes—pick your destination,
            set your preferences, and explore with confidence.
          </p>
          <button className="bg-primary-100 text-semibold text-sm md:text-lg rounded-md px-4 py-2 md:px-12 md:py-4 lg:px-14 cursor-pointer">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
export default Banner;

"use client";

import Image from "next/image";

const TripImages = ({ images }) => {
  const imageSources =
    images && images.length >= 3
      ? images.slice(0, 3)
      : [
          "/assets/images/sample.jpeg",
          "/assets/images/sample1.jpg",
          "/assets/images/sample2.jpg",
        ];

  const fallbacks = [
    "/assets/images/sample1.jpg",
    "/assets/images/sample2.jpg",
    "/assets/images/sample3.jpg",
  ];

  return (
    <div className="flex gap-4 mb-6">
      <div className="w-3/4 relative">
        <Image
          src={imageSources[0]}
          alt="Trip Image 1"
          fill
          className="rounded-lg object-cover"
          onError={(e) => {
            e.target.src = fallbacks[0];
          }}
        />
      </div>
      <div className="w-1/4 flex flex-col gap-4 h-100">
        <div className="flex-1 relative">
          <Image
            src={imageSources[1]}
            alt="Trip Image 2"
            fill
            className="rounded-lg object-cover"
            onError={(e) => {
              e.target.src = fallbacks[1];
            }}
          />
        </div>
        <div className="flex-1 relative">
          <Image
            src={imageSources[2]}
            alt="Trip Image 3"
            fill
            className="rounded-lg object-cover"
            onError={(e) => {
              e.target.src = fallbacks[2];
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TripImages;

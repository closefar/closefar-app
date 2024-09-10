import React, { useEffect, useRef, useState } from "react";

interface ImageOfVideo {
  src: string;
  width: number;
  height: number;
  alt: string;
  hoverHeader?: string;
}

const ImageOfVideo: React.FC<ImageOfVideo> = (data) => {
  const [isLoad, setIsLoad] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    video.current?.load();
  }, []);

  return (
    <div className="relative">
      <div
        className={`absolute -z-10 w-full grid place-items-center bg-gray-300  animate-pulse aspect-square`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-1/2 w-1/2 text-gray-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      <div
        className={`relative transition-all duration-1000 ${
          isLoad ? "opacity-100" : "opacity-0"
        }`}
      >
        <video
          className="w-full aspect-square object-cover"
          ref={video}
          src={data.src}
          onLoadedData={() => {
            setIsLoad(true);
          }}
        ></video>

        {data.hoverHeader && (
          <div className="w-full h-full text-white flex justify-center items-center sm:text-2xl text-lg bg-black absolute top-0 right-0 hover:opacity-90 opacity-0 z-10">
            {data.hoverHeader}
          </div>
        )}
        <div className="w-[94%] h-[94%] border absolute top-[3%] left-[3%]"></div>
      </div>
    </div>
  );
};

export default ImageOfVideo;

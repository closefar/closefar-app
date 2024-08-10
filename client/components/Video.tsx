import React, { useEffect, useRef, useState } from "react";

interface Video {
  src: string;
}

const Video: React.FC<Video> = (data) => {
  // const [isLoad, setIsLoad] = useState(false);
  const video = useRef<HTMLVideoElement>();

  // useEffect(() => {
  //   video.current.load();
  // });

  return (
    <div>
      {/* <div
        className={`absolute -z-10 w-full grid place-items-center bg-gray-300  animate-pulse`}
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
      </div> */}
      <video
        className="w-full"
        ref={video}
        src={data.src}
        controls
        controlsList="nodownload"
        // onLoadedData={() => {
        //   setIsLoad(true);
        // }}
      ></video>
    </div>
  );
};

export default Video;

import React, { useRef } from "react";

interface Video {
  src: string;
}

const Video: React.FC<Video> = (data) => {
  const video = useRef<HTMLVideoElement>(null);

  return (
    <div>
      <video
        className="w-full"
        ref={video}
        src={data.src}
        controls
        controlsList="nodownload"
      ></video>
    </div>
  );
};

export default Video;

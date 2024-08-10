import Video from "components/ImageOfVideo";
import React from "react";

const Test = () => {
  return (
    <div className="h-[600px] w-[600px]">
      <Video
        src="http://localhost/api/images/272f5bd3-1f4b-46a2-aea6-8aaad56d97ba-1723286897078.mp4"
        height={300}
        width={300}
        alt=""
      />
    </div>
  );
};

export default Test;

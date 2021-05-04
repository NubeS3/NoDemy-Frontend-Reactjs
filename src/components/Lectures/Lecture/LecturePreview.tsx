import Lecture from "../../../types/Lecture.type";

import '../../../styles/components/Lectures/Lecture/LecturePreview.scss';
import { useState } from "react";
import VideoPreviewModal from "./VideoPreviewModal";

type LecturePreviewProps = {
  lecture: Lecture;
};

const LecturePreview = ({ lecture }: LecturePreviewProps) => {
  const [openPreviewVideo, setOpenPreviewVideo] = useState(false);
  return (
    <>
      <div
        className={`LecturePreview${lecture.canPreview ? ' LecturePreview--can-preview' : ''}`}
        style={{
          cursor: lecture.canPreview ? 'pointer' : 'default',
        }}
        onClick={() =>{
          if (lecture.canPreview) {
            setOpenPreviewVideo(true);
          }
        }}
      >
        <div>
          <i className="fas fa-video" /> &nbsp; {lecture.lectureName}
        </div>
        <div>
          { lecture.canPreview && <p className="LecturePreview__preview">Preview</p> }
        </div>
      </div>

      <VideoPreviewModal
        lecture={lecture}
        open={openPreviewVideo}
        onClose={() => setOpenPreviewVideo(false)}
      />
    </>
  );
};

export default LecturePreview;

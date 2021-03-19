import { AppBar, Modal, Toolbar, Typography } from "@material-ui/core";
import ReactPlayer from "react-player";
import { connect, ConnectedProps } from "react-redux";

import Lecture from "../../../types/Lecture.type";

import '../../../styles/components/Lectures/Lecture/VideoPreviewModal.scss';
import useWindowDimensions from "../../../utils/useWindowDimensions.util";
import { RootState } from "../../../reducers/root.reducer";

const mapStateToProps = (state: RootState) => ({
  accessToken: state.authenticationReducer.accessToken,
});

const connector = connect(mapStateToProps);

type VideoPreviewModalProps = ConnectedProps<typeof connector> & {
  open: boolean;
  onClose: () => void;
  lecture: Lecture;
};

const VideoPreviewModal = ({ open, onClose, lecture, accessToken }: VideoPreviewModalProps) => {
  const { width } = useWindowDimensions();

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="VideoPreviewModal">
        <AppBar position="static" className="VideoPreviewModal__app-bar">
          <Toolbar>
            <Typography variant="h6">{lecture.lectureName}</Typography>
          </Toolbar>
        </AppBar>
        <div className="VideoPreviewModal__body">
          <ReactPlayer
            url={accessToken ? `${lecture.video}?token=${accessToken}` : lecture.video}
            height={width >= 800 ? 450 : (width * 9) / 16}
            width={width >= 800 ? 800 : width}
            controls
          />
        </div>
      </div>
    </Modal>
  );
};

export default connector(VideoPreviewModal);
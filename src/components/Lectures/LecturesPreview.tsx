import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../../reducers/root.reducer";
import LecturePreview from "./Lecture/LecturePreview";

const mapStateToProps = (state: RootState) => ({
  lectures: state.courseReducer.lectures,
});

const connector = connect(mapStateToProps);

type LecturesPreviewProps = ConnectedProps<typeof connector> & {
  index: number;
};

const LecturesPreview = ({ lectures, index }: LecturesPreviewProps) => {
  return (
    <div>
      {
        Array.isArray(lectures[index]) && lectures[index].map((lecture) => (
          <LecturePreview key={lecture._id} lecture={lecture} />
        ))
      }
    </div>
  );
};

export default connector(LecturesPreview);

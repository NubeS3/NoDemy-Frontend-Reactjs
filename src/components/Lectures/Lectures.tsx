import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../reducers/root.reducer";

import Lecture from "./Lecture/Lecture";

const mapStateToProps = (state: RootState) => ({
  lectures: state.courseReducer.lectures,
});

const connector = connect(mapStateToProps);

type LecturesProps = ConnectedProps<typeof connector> & {
  index: number;
};

const Lectures = ({ index, lectures }: LecturesProps) => {
  return (
    <div>
    {
      Array.isArray(lectures[index]) && lectures[index].map((lecture) => (
        <Lecture key={lecture._id} lecture={lecture} />
      ))
    }
    </div>
  );
};

export default connector(Lectures);
import {connect, ConnectedProps} from 'react-redux';

import '../../../styles/components/Lectures/Lecture/Lecture.scss';

import LectureType from '../../../types/Lecture.type';
import {RootState} from '../../../reducers/root.reducer';
import { setCurrentLearningLecture} from '../../../reducers/course.reducer';

const mapStateToProps = (state: RootState) => ({
    currentSelectedLecture: state.courseReducer.currentSelectedLecture,
});

const mapDispatchToProps = {
    setCurrentLearningLecture,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type LectureProps = ConnectedProps<typeof connector> & {
    lecture: LectureType;
};

const Lecture = ({lecture, currentSelectedLecture, setCurrentLearningLecture}: LectureProps) => {
    return (
        <div
            className={`Lecture${currentSelectedLecture === lecture._id ? ' Lecture--active' : ''}`}
            onClick={() => setCurrentLearningLecture(lecture._id)}
        >
            <i className="fas fa-video"/> &nbsp; {lecture.lectureName}
        </div>
    );
};

export default connector(Lecture);
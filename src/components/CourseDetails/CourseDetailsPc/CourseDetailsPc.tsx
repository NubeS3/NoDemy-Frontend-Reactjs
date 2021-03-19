import '../../../styles/components/CourseDetails/CourseDetailsPc/CourseDetailsPc.scss';
import HistoryProps from "../../../types/HistoryProps.type";
import CourseDetailsBodyPc from "./CourseDetailsBodyPc";
import CourseDetailsFooterPc from './CourseDetailsFooterPc';

import CourseDetailsHeaderPc from "./CourseDetailsHeaderPc";

type CourseDetailsPcProps = HistoryProps;

const CourseDetailsPc = ({ history }: CourseDetailsPcProps) => {
  return (
    <div>
      <CourseDetailsHeaderPc history={history} />

      <CourseDetailsBodyPc />

      <CourseDetailsFooterPc />
    </div>
  );
};

export default CourseDetailsPc;
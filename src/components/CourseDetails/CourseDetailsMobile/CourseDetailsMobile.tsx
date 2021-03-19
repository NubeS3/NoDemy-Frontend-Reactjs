import HistoryProps from "../../../types/HistoryProps.type";
import CourseDetailsBodyMobile from "./CourseDetailsBodyMobile";
import CourseDetailsFooterMobile from "./CourseDetailsFooterMobile";
import CourseDetailsHeaderMobile from "./CourseDetailsHeaderMobile";

type CourseDetailsMobileProps = HistoryProps;

const CourseDetailsMobile = ({ history }: CourseDetailsMobileProps) => {
  return (
    <div>
      <CourseDetailsHeaderMobile history={history} />

      <CourseDetailsBodyMobile />

      <CourseDetailsFooterMobile />
    </div>
  )
};

export default CourseDetailsMobile;
import CourseBasicInfoProps from "../../types/CourseBasicInfoProps.type";
import CourseBasicLandscape from "./CourseBasicLandscape";
import CourseBasicPortrait from "./CourseBasicPortrait";

type CourseBasicProps = {
  type: 'portrait' | 'landscape';
  course: CourseBasicInfoProps;
};

const CourseBasic = ({ type, course }: CourseBasicProps) => {
  if (type === 'portrait') {
    return <CourseBasicPortrait course={course} />
  }

  return <CourseBasicLandscape course={course} />
};

export default CourseBasic;

import marked from 'marked';
import { useEffect, useState } from "react";

import '../../../styles/components/CourseDetails/CourseDetailsMobile/CourseDetailsDescriptionMobile.scss';

type CourseDetailsDescriptionMobileProps = {
  description: string;
};

const CourseDetailsDescriptionMobile = ({ description }: CourseDetailsDescriptionMobileProps) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    setMarkdown(marked(description));
  }, [description]);

  return (
    <div className="CourseDetailsDescriptionMobile" dangerouslySetInnerHTML={{ __html: markdown }} />
  );
};

export default CourseDetailsDescriptionMobile;
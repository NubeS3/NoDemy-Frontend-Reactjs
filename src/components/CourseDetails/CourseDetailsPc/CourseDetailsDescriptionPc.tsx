import marked from 'marked';
import { useEffect, useState } from 'react';

import '../../../styles/components/CourseDetails/CourseDetailsPc/CourseDetailsDescriptionPc.scss';

type CourseDetailsDescriptionPcProps = {
  description: string;
};

const CourseDetailsDescriptionPc = ({ description }: CourseDetailsDescriptionPcProps) => {
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    setMarkdown(marked(description));
  }, [description]);

  return (
    <div className="CourseDetailsDescriptionPc__content" dangerouslySetInnerHTML={{ __html: markdown }} />
  );
};

export default CourseDetailsDescriptionPc;
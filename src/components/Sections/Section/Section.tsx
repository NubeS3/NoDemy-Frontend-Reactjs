import SectionType from '../../../types/Section.type';

import '../../../styles/components/Sections/Section/Section.scss';
import { useState } from 'react';
import Lectures from '../../Lectures/Lectures';

type SectionProps = {
  section: SectionType;
  index: number;
  last?: boolean;
}

const Section = ({ section, index, last }: SectionProps) => {
  const [openLectures, setOpenLectures] = useState(false);

  return (
    <div className="SectionWrapper">
      <div
        className={`Section${last ? ' Section--last' : ''}`}
        onClick={() => setOpenLectures(prev => !prev)}
        style={{ borderBottom: openLectures || last ? '1px solid #dcdacb' : 'inherit' }}
      >
        <div>
          <i className={`fas fa-caret-${openLectures ? 'up' : 'down'}`} /> &nbsp; {section.sectionName}
        </div>
        <div>
          <p className="Section__info">{section.lectures.length} lectures</p>
        </div>
      </div>
      {
        openLectures &&
        <Lectures index={index} />
      }
    </div>
  );
};

export default Section;

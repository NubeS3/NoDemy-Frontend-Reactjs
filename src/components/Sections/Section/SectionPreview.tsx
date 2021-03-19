import { useState } from 'react';
import '../../../styles/components/Sections/Section/SectionPreview.scss';

import SectionType from "../../../types/Section.type";
import LecturesPreview from '../../Lectures/LecturesPreview';

type SectionProps = {
  section: SectionType;
  last?: boolean;
  index: number
}

const SectionPreview = ({ section, last, index }: SectionProps) => {
  const [openLectures, setOpenLectures] = useState(false);

  return (
    <div className="SectionPreviewWrapper">
      <div
        className={`SectionPreview${last ? ' SectionPreview--last' : ''} no-select`}
        onClick={() => setOpenLectures(prev => !prev)}
        style={{ borderBottom: openLectures || last ? '1px solid #dcdacb' : 'inherit' }}
      >
        <div>
          <i className={`fas fa-caret-${openLectures ? 'up' : 'down'}`} /> &nbsp; {section.sectionName}
        </div>
        <div>
          <p className="SectionPreview__info">{section.lectures.length} lectures</p>
        </div>
      </div>
      {
        openLectures &&
        <LecturesPreview index={index} />
      }
    </div>
  );
};

export default SectionPreview;

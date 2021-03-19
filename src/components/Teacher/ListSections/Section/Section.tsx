import { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core"
import { connect, ConnectedProps } from "react-redux";

import SectionType from '../../../../types/Section.type';

import { deleteSection } from '../../../../reducers/teacherCourseContents.reducer';

import '../../../../styles/components/Teacher/ListSections/Section/Section.scss';
import AddEditSectionModal from "../../AddEditSectionModal/AddEditSectionModal";
import useWindowDimensions from "../../../../utils/useWindowDimensions.util";
import HistoryProps from "../../../../types/HistoryProps.type";

const mapDispatchToProps = {
  deleteSection,
};

const connector = connect(undefined, mapDispatchToProps);

type SectionProps = ConnectedProps<typeof connector> & HistoryProps & {
  section: SectionType;
  courseId: string;
};

const Section = ({ section, courseId, deleteSection, history }: SectionProps) => {
  const { width } = useWindowDimensions();

  const [openEditSection, setOpenEditSection] = useState(false);

  useEffect(() => {
    setOpenEditSection(false);
  }, [section.sectionName]);

  const handleRemoveSection = () => {
    if (window.confirm(`Are you sure you want to remove section ${section.sectionName}? This action can not be undone!`)) {
      deleteSection(section._id);
    }
  };

  return (
    <div className="TeacherSection">
      <Grid container justify="space-between">
        <Grid item xs={12} md={8}>
          <Typography variant="h6">{section.sectionName}</Typography>
        </Grid>
        <Grid item xs={12} md={4} style={{ textAlign: width >= 960 ? 'right' : 'center' }}>
          <Button
            title="Add lecture"
            className="TeacherSection__actions__buttons"
            style={{ color: 'green' }}
            onClick={() => history.push(`/edit-lectures/${section._id}`)}
          >
            <i className="fas fa-video" />
          </Button>
          <Button
            title="Edit section"
            className="TeacherSection__actions__buttons"
            style={{ color: 'green' }}
            onClick={() => setOpenEditSection(true)}
          >
            <i className="fas fa-edit" />
          </Button>
          <Button
            title="Remove course"
            className="TeacherSection__actions__buttons"
            style={{ color: 'red' }}
            onClick={handleRemoveSection}
          >
            <i className="fas fa-trash" />
          </Button>
        </Grid>
      </Grid>

    {
      openEditSection &&
      <AddEditSectionModal
        open={openEditSection}
        onClose={() => setOpenEditSection(false)}
        sectionId={section._id}
        courseId={courseId}
      />
    }
    </div>
  );
};

export default connector(Section);
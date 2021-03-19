import { AppBar, Button, Divider, Modal, TextField, Toolbar, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { RootState } from '../../../reducers/root.reducer';
import { addSection, updateSection } from '../../../reducers/teacherCourseContents.reducer';

import '../../../styles/components/Teacher/AddEditSectionModal/AddEditSectionModal.scss';
import loading from '../../../assets/loadings/small-secondary.loading.gif';

const mapStateToProps = (state: RootState) => ({
  listSections: state.teacherCourseContentsReducer.listSections,
  isModifying: state.teacherCourseContentsReducer.isModifying,
});

const mapDispatchToProps = {
  addSection,
  updateSection,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AddEditSectionModalProps = ConnectedProps<typeof connector> & {
  open: boolean;
  onClose: () => void;
  sectionId: string;
  courseId: string;
};

const AddEditSectionModal = ({
  open,
  onClose,
  sectionId,
  listSections,
  addSection,
  isModifying,
  updateSection,
  courseId,
}: AddEditSectionModalProps) => {
  const [sectionName, changeSectionName] = useState('');

  const handleAddSection = () => {
    addSection(sectionName, courseId);
  };

  const handleUpdateSection = () => {
    updateSection(sectionId, sectionName);
  };

  useEffect(() => {
    if (sectionId) {
      for (let i = 0; i < listSections.length; ++i) {
        if (listSections[i]._id === sectionId) {
          changeSectionName(listSections[i].sectionName);
          break;
        }
      }
    }
  }, [sectionId, listSections]);

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="AddEditSectionModal">
        <AppBar position="static" className="AddEditSectionModal__app-bar">
          <Toolbar>
            <Typography variant="h6">{ !sectionId ? 'Add section' : 'Edit section' }</Typography>
          </Toolbar>
        </AppBar>
        <div className="AddEditSectionModal__body">
          <TextField
            variant="outlined"
            label="Section's name"
            style={{ width: '100%' }}
            value={sectionName}
            onChange={(e) => changeSectionName(e.target.value)}
            required={true}
          />
        </div>
        <Divider />
        <div className="AddEditSectionModal__footer">
          <Button
            variant="contained"
            className="AddEditSectionModal__buttons AddEditSectionModal__buttons--secondary"
            onClick={onClose}
            disabled={isModifying}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            className="AddEditSectionModal__buttons"
            onClick={!sectionId ? handleAddSection : handleUpdateSection}
            disabled={isModifying}
          >
            { isModifying && <><img src={loading} height={23} alt="" /> &nbsp;</> } { !sectionId ? 'Add section' : 'Update section' }
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default connector(AddEditSectionModal);
/* eslint-disable react-hooks/exhaustive-deps */
import {
    AppBar,
    Box,
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    LinearProgress,
    Modal,
    TextField,
    Toolbar,
    Typography
} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';

import '../../../styles/components/Teacher/AddLectureModal/AddLectureModal.scss';
import loading from '../../../assets/loadings/small-secondary.loading.gif';

import {addLecture, updateLecture} from '../../../reducers/teacherLectures.reducer';
import {RootState} from '../../../reducers/root.reducer';

const mapStateToProps = (state: RootState) => ({
    isUploading: state.teacherLectures.isUploading,
    uploadingProgress: state.teacherLectures.uploadingProgress,
    isModifying: state.teacherLectures.isModifying,
    listLectures: state.teacherLectures.listLectures,
});

const mapDispatchToProps = {
    addLecture,
    updateLecture,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AddLectureModalProps = ConnectedProps<typeof connector> & {
    open: boolean;
    onClose: () => void;
    sectionId: string;
    lectureId: string;
};

const AddLectureModal = ({
                             open,
                             onClose,
                             addLecture,
                             sectionId,
                             isUploading,
                             uploadingProgress,
                             isModifying,
                             lectureId,
                             listLectures,
                             updateLecture
                         }: AddLectureModalProps) => {
    const [canPreview, setCanPreview] = useState('No');
    const [lectureName, changeLectureName] = useState('');
    const [video, setVideo] = useState<File>(null);

    useEffect(() => {
        if (lectureId) {
            for (let i = 0; i < listLectures.length; ++i) {
                if (listLectures[i]._id === lectureId) {
                    changeLectureName(listLectures[i].lectureName);
                    setCanPreview(listLectures[i].canPreview ? 'Yes' : 'No');
                    break;
                }
            }
        }
    }, [lectureId]);

    const onHandleUploadVideo = (e: any) => {
        setVideo(e.target.files[0]);
    };

    const handleCreateLecture = () => {
        addLecture(sectionId, canPreview, lectureName, video);
    };

    const handleUpdateLecture = () => {
        updateLecture(lectureId, lectureName, canPreview === 'Yes', video);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
        >
            <div className="AddLectureModal">
                <AppBar position="static" className="AddLectureModal__app-bar">
                    <Toolbar>
                        <Typography variant="h6">{lectureId ? 'Edit lecture' : 'Add lecture'}</Typography>
                    </Toolbar>
                </AppBar>
                <div className="AddLectureModal__body">
                    <TextField
                        variant="outlined"
                        label="Lecture's name"
                        style={{width: '100%'}}
                        required={true}
                        value={lectureName}
                        onChange={(e) => changeLectureName(e.target.value)}
                    />

                    <FormControlLabel
                        aria-required="true"
                        control={
                            <Checkbox
                                color="primary"
                                required
                                checked={canPreview === 'Yes'}
                                onChange={(e) => setCanPreview(e.target.checked ? 'Yes' : 'No')}
                            />
                        }
                        label="Is public?"
                    />

                    <br/>

                    <Button
                        className="AddLectureModal__upload"
                        onClick={() => document.getElementById('create-lecture-upload-video').click()}
                        disabled={isUploading}
                    >
                        {
                            !video &&
                            <>
                                <i className="fas fa-upload"/> &nbsp; Upload video
                            </>
                        }
                        {
                            video &&
                            <>{video.name}</>
                        }
                    </Button>

                    <input
                        type="file"
                        id="create-lecture-upload-video"
                        style={{display: 'none'}}
                        onChange={onHandleUploadVideo}
                        accept=".mp4"
                        multiple={false}
                        disabled={isUploading}
                    />

                    {
                        isUploading &&
                        <Box display="flex" alignItems="center" style={{marginTop: '20px'}}>
                            <Box width="100%" mr={1}>
                                <LinearProgress variant="determinate" value={(uploadingProgress / video.size) * 100}/>
                            </Box>
                            <Box minWidth={35}>
                                <Typography variant="body2">{`${Math.round(
                                    (uploadingProgress / video.size) * 100,
                                )}%`}</Typography>
                            </Box>
                        </Box>
                    }
                </div>
                <Divider/>
                <div className="AddLectureModal__footer">
                    <Button
                        variant="contained"
                        className="AddLectureModal__buttons AddLectureModal__buttons--secondary"
                        onClick={onClose}
                        disabled={isModifying}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        className="AddLectureModal__buttons"
                        onClick={lectureId ? handleUpdateLecture : handleCreateLecture}
                        disabled={isModifying}
                    >
                        {isModifying && <><img src={loading} height={23} alt=""/>&nbsp;</>}
                        {lectureId ? 'Update lecture' : 'Add lecture'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default connector(AddLectureModal);
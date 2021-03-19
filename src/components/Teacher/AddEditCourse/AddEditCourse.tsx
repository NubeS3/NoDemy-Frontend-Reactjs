/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Checkbox, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { withRouter } from "react-router-dom";
import ReactQuill from 'react-quill';

import { RootState } from "../../../reducers/root.reducer";
import RouterProps from "../../../types/RouterProps.type";
import { NavBarLink } from "../../common/NavBar";

import PageWrapper from "../../common/PageWrapper";

import '../../../styles/components/Teacher/AddEditCourse/AddEditCourse.scss';
import loading from '../../../assets/loadings/medium.loading.gif';
import loadingSmall from '../../../assets/loadings/small-secondary.loading.gif';

import paths from "../../../configs/paths.config";
import uploadImageToImgurApi from "../../../apis/uploadImageToImgur.api";
import { isResponseError } from "../../../types/ResponseError.type";
import { fetchTeacherCourse, resetTeacherCourseState, updateTeacherCourse, addTeacherCourse } from '../../../reducers/teacherCourse.reducer';

const mapStateToProps = (state: RootState) => ({
  categories: state.categoriesReducer.categories,
  accessToken: state.authenticationReducer.accessToken,
  user: state.accountReducer.user,
  course: state.teacherCourseReducer.course,
  isFetchingCourse: state.teacherCourseReducer.isFetchingCourse,
  isModifying: state.teacherCourseReducer.isModifying,
  error: state.teacherCourseReducer.error,
});

const mapDispatchToProps = {
  fetchTeacherCourse,
  resetTeacherCourseState,
  updateTeacherCourse,
  addTeacherCourse
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type AddEditCourseProps = ConnectedProps<typeof connector> & RouterProps;

const AddEditCourse = ({
  history,
  categories,
  accessToken,
  user,
  fetchTeacherCourse,
  resetTeacherCourseState,
  course,
  isFetchingCourse,
  updateTeacherCourse,
  isModifying,
  addTeacherCourse,
  error,
}: AddEditCourseProps) => {
  const [links, setLinks] = useState<Array<NavBarLink>>([]);

  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [title, changeTitle] = useState('');
  const [category, setCategory] = useState('');
  const [summary, changeSummary] = useState('');
  const [description, changeDescription] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [price, setPrice] = useState(0);
  const [saleRatio, setSaleRatio] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    if (history.location.pathname.includes('add')) {
      setLinks([{
        name: 'Home',
        url: paths.base,
      }, {
        name: 'Teacher',
        url: paths.teacher,
      }, {
        name: 'Create new course',
        url: paths.addCourse,
      }]);
    }
    else {
      const courseId = history.location.pathname.split('/')[2];
      fetchTeacherCourse(courseId);
    }

    return () => {
      resetTeacherCourseState();
    }
  }, [history.location.pathname]);

  useEffect(() => {
    if (!accessToken || !user || user.accountType === 'Student') {
      history.push(paths.base);
    }
  }, [accessToken, user]);

  useEffect(() => {
    if (course) {
      setLinks([{
        name: 'Home',
        url: paths.base,
      }, {
        name: 'Teacher',
        url: paths.teacher,
      }, {
        name: `${course.title}`,
        url: `/edit-course/${course._id}`,
      }]);

      setCoverImage(course.coverImage);
      changeTitle(course.title);
      setCategory(course.category);
      changeSummary(course.summary);
      changeDescription(course.description);
      setPrice(course.price);
      setSaleRatio(course.saleRatio);
      setIsFinish(course.isFinish);
      setIsPublic(course.isPublic);
    }

    if (course && history.location.pathname.includes('add-course')) {
      history.push(paths.teacher);
    }
  }, [course]);

  useEffect(() => {
    setIsUploadingImage(false);
  }, [coverImage]);

  const handleUploadImageToImgur = async (e: any) => {
    try {
      setIsUploadingImage(true);
      const data = new FormData();
      data.append('image', e.target.files[0]);
      const response = await uploadImageToImgurApi(data);
      if (!isResponseError(response)) {
        setCoverImage(response.data);
      }
    }
    catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdateCourse = () => {
    updateTeacherCourse({
      title,
      coverImage,
      summary,
      description,
      category,
      price,
      saleRatio,
      isFinish,
      isPublic,
    });
  };

  const handleAddCourse = () => {
    addTeacherCourse({
      title,
      coverImage,
      summary,
      description,
      category,
      price,
      saleRatio,
      isFinish,
      isPublic,
    });
  };

  return (
    <PageWrapper history={history} links={links}>
    {
      isFetchingCourse && history.location.pathname.includes('edit') &&
      <div style={{ width: '150px', margin: 'auto' }}>
        <img src={loading} height={150} alt="Loading..." />
      </div>
    }
    {
      (!isFetchingCourse || history.location.pathname.includes('add')) &&
      <div className="AddEditCourse">
        <Grid container>
          <Grid item xs={11} md={8} lg={5} className="AddEditCourse__wrapper">
            <Paper className="AddEditCourse__paper">
              { error && <Typography className="error" variant="body1">{error}</Typography> }
              
              <Typography
                variant="h4"
                className="AddEditCourse__title"
              >
                {history.location.pathname.includes('add') ? 'Add new course' : 'Edit course'}
              </Typography>
            
              <div
                className="AddEditCourse__cover-wrapper no-select"
                onClick={() => {
                  if (!isUploadingImage) {
                    document.getElementById('uploadImage').click();
                  }
                }}
              >
                {
                  !coverImage && !isUploadingImage &&
                  <>
                    <p><i className="fas fa-image" /></p>
                    <p style={{ fontSize: '14px' }}>480 x 270 (px)</p>
                  </>
                }
                {
                  !isUploadingImage && coverImage &&
                  <img src={coverImage} alt="" />
                }
                {
                  !isUploadingImage &&
                  <input
                    accept=".jpg,.png,.jpeg"
                    multiple={false}
                    type="file"
                    id="uploadImage"
                    onChange={handleUploadImageToImgur}
                    disabled={isUploadingImage}
                  />
                }
                {
                  isUploadingImage &&
                  <div>
                    <img className="AddEditCourse__cover-wrapper__loading" src={loading} height={100} width={100} alt="Uploading..." />
                  </div>
                }
              </div>

              <TextField
                variant="outlined"
                label="Title"
                required
                className="AddEditCourse__text-field"
                value={title}
                onChange={(e) => changeTitle(e.target.value)}
              />

              <FormControl variant="outlined" className="AddEditCourse__text-field" required>
                <InputLabel id="add-edit-course-category">Choose category</InputLabel>
                <Select
                  labelId="add-edit-course-category"
                  label="Choose category"
                  value={category}
                  onChange={(e: React.ChangeEvent<{ value: unknown }>) => setCategory(e.target.value as string)}
                >
                  <MenuItem value=""><em>None</em></MenuItem>
                  {
                    Array.isArray(categories) && categories.map((_category) => (
                      <MenuItem key={_category._id} value={_category._id}>{_category.name}</MenuItem>
                    ))
                  }
                </Select>
              </FormControl>

              <TextField
                variant="outlined"
                multiline
                required
                rows={3}
                label="Short summary"
                className="AddEditCourse__text-field"
                value={summary}
                onChange={(e) => changeSummary(e.target.value)}
              />

              <ReactQuill
                placeholder="Full description"
                value={description}
                onChange={(e) => changeDescription(e)}
              />

              <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Price ($)"
                    className="AddEditCourse__text-field"
                    required
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    type="number"
                    label="Sale (%)"
                    className="AddEditCourse__text-field"
                    required
                    value={saleRatio}
                    onChange={(e) => setSaleRatio(parseInt(e.target.value))}
                  />
                </Grid>
              </Grid>

              <FormControlLabel
                aria-required="true"
                control={
                  <Checkbox
                    color="primary"
                    checked={isFinish}
                    required
                    onChange={(e) => setIsFinish(e.target.checked)}
                  />
                }
                label="Is finish?"
              />

              <br />

              <FormControlLabel
                aria-required="true"
                control={
                  <Checkbox
                    color="primary"
                    required
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                }
                label="Is public?"
              />

              <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    className="AddEditCourse__buttons AddEditCourse__buttons--secondary"
                    onClick={() => history.push(paths.teacher)}
                    disabled={isModifying}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    variant="contained"
                    className="AddEditCourse__buttons"
                    disabled={isModifying}
                    onClick={history.location.pathname.includes('edit') ? handleUpdateCourse : handleAddCourse}
                  >
                    { isModifying && <><img src={loadingSmall} alt="" height={23} /> &nbsp; </> } {history.location.pathname.includes('add') ? 'Add course' : 'Update course'}
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    }
    </PageWrapper>
  );
};

export default withRouter(connector(AddEditCourse));

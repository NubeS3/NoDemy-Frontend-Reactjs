const paths = {
  base: '/',
  register: '/register',
  login: '/login',
  profile: '/account-profile',
  courseDetails: (courseId: string) => `/courses/${courseId}`,
  listCourses: () => `/courses`,
  userProfile: '/account-profile',
  cart: `/cart`,
  wishlist: `/wishlist`,
  myCourses: `/my-courses`,
  admin: `/admin`,
  adminLogin:`/admin/login`,
  teacher: `/teacher`,
  becomeTeacher: `/become-teacher`,
  addCourse: `/add-course`,
  editCourse: `/edit-course/:id`,
  editSections: `/edit-sections/:courseId`,
  editLectures: `/edit-lectures/:sectionId`,
};

export default paths;

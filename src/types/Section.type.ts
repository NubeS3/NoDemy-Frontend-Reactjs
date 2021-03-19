type Section = {
  _id: string;
  courseId: string;
  sectionName: string;
  lectures: Array<{
    lecture: string;
  }>,
};

export default Section;
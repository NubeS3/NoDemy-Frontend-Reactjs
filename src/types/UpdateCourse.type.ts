type UpdateCourse = {
  title?: string;
  summary?: string;
  description?: string;
  coverImage?: string;
  price?: number;
  saleRatio?: number;
  category?: string;
  isFinish?: boolean;
  isPublic?: boolean;
};

export default UpdateCourse;
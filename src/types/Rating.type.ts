type Rating = {
  _id: string;
  userId: string;
  fullname: string;
  avatar: string;
  courseId: string;
  description: string;
  rating: 1 | 2 | 3 | 4 | 5;
  updatedAt: string | number;
};

export default Rating;
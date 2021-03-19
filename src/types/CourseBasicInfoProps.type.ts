type CourseBasicInfoProps = {
  _id: string,
  summary: string,
  coverImage: string,
  title: string,
  tutor: {
    _id: string;
    fullname: string,
    email: string,
  },
  categoryName: string,
  averageRatings: number,
  totalRatings: number,
  price: number,
  sale: number,
  isBestseller: boolean,
  createdAt: string | number,
  totalRegistered: number,
  isNew: boolean;
  isHot: boolean;
  isBought: boolean;
  isWishlist: boolean;
  updatedAt: string | number,
};

export default CourseBasicInfoProps;

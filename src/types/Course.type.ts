type CourseDetails = {
  sale: number;
  saleRatio: number;
  isFinish: boolean;
  isPublic: boolean;
  averageRatings: number;
  totalRegistered: number;
  totalRatings: number;
  totalViewed: number;
  _id: string;
  title: string;
  summary: string;
  description: string;
  price: number;
  category: string;
  createdAt: number | string;
  updatedAt: number | string;
  coverImage: string;
  categoryName: string;
  tutor: {
    _id: string;
    fullname: string;
    email: string;
  },
  isNew: boolean;
  isBought: boolean;
  isHot: boolean;
  isBestseller: boolean;
  isInCart: boolean;
  isInWishlist: boolean;
};

export default CourseDetails;
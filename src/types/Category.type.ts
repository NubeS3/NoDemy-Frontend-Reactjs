type Category = {
  _id: string;
  description: string;
  name: string;
  subCategories: Array<{ category: string }>;
  parentCategory: string | null | undefined;
};

export default Category;
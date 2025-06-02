export interface users {
  username: string;
  email: string;
  password: string;
}

export interface userState {
  userList: users[];
  isAuthenticate: boolean;
}

export interface categories {
  slug: string;
  name: string;
  url: string;
}
export interface categoryState {
  list: categories[];
  loading: boolean;
  error: string | null;
}
export interface productReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}
export interface product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  reviews: productReview[];
  stock: number;
  tags: string[];
  brand: string;
  thumbnail: string;
  images: string[];
}
export interface prdoductListState {
  list: product[] | undefined;
  loading: boolean;
  error: string | unknown;
}
export interface productDetail {
  item: product | null;
  loading: boolean;
  error: string | unknown;
}

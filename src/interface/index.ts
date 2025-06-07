export interface user {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  orders: order[];
}

export interface userState {
  userList: user[];
  isAuthenticate: boolean;
  loggedUser: user | undefined;
  loading: boolean;
  error: string | null;
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
  searchProducts: product[] | undefined;
  loading: boolean;
  error: string | unknown;
}

export interface cart {
  id: number | string;
  productId: number | undefined;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}
export interface cartList {
  list: cart[] | undefined;
  cartProduct: product | null;
  loading: boolean;
  error: string | unknown;
}

export interface wishlist {
  id: number | string;
  productId: number;
  title: string;
  price: number;
  thumbnail: string;
}
export interface wishlistState {
  list: wishlist[] | undefined;
  favProduct: wishlist | null;
  loading: boolean;
  error: string | unknown;
}

export interface order {
  id: number | string;
  date: string;
  total: number;
  status: string;
  cart: cart[] | undefined;
}

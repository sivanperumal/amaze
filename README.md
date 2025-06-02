# Pages

Signin page
Header section Humberger button cliks to show sidebar to list all category
Home page
Product List page by category id
Wishlist page
Cart Page
Check out page

# Features

Header Section

- Menu shows 10category with link
- Header section Humberger button cliks to show sidebar to list all category
- search box with button click to filter

Home page

- Category wise product items shows
- Click explore more prouct list show by category id

Product list

- Product shown by category id
- Pagination

# Extenstions

- react router
  npm install react-router react-router-dom
- mui
  npm install @mui/material @emotion/react @emotion/styled
- Redux Js Toolkit
  npm install redux react-redux redux-thunk @reduxjs/toolkit --save-dev
- axios
  npm install --save-dev axios
- jest
  npm install --save-dev jest ts-jest @types/jest babel-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event

# API

Category Object: https://dummyjson.com/products/categories
Get products by a category: https://dummyjson.com/products/category/smartphones

1. User Interface ((User Reducer State))
   {
   username: string
   email: string
   pasword: string
   }[]

2. UserState Interface
   {
   userLists: User[]
   isAuthenticate: boolean
   }

3. Product categorylists
   {
   slug: string,
   name:string,
   url:string
   }[]

4. Product State (Product Reducer State)
   {
   categoryLists:categorylists[]
   }
5. Cart

import { render } from "@testing-library/react";
import ReviewSection from "./ReviewSection";
import { productReview } from "../interface";

const mockReview = [
  {
    rating: 4.5,
    comment: "Very good review",
    date: "2025-04-30T09:41:02.053",
    reviewerName: "Hazel Evans",
    reviewerEmail: "hazel-evans@mail.com",
  },
  {
    rating: 4,
    comment: "Good review",
    date: "2025-04-30T09:41:02.053",
    reviewerName: "Aubrey Garcia",
    reviewerEmail: "aubrey-garcia@mail.com",
  },
];

describe("Review component", () => {
  test("Render correctly", () => {
    render(<ReviewSection data={mockReview} />);
  });
  test("Empty review", () => {
    const mockReview: productReview[] = [];
    render(<ReviewSection data={mockReview} />);
  });
});

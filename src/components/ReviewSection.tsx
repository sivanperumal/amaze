import React from "react";
import { Box, Typography, Divider, Stack, Rating } from "@mui/material";
import { productReview } from "../interface";
interface ReviewProps {
  data: productReview[];
}
const ReviewSection: React.FC<ReviewProps> = (props) => {
  const { data } = props;
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        Customer Reviews
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {data.length === 0 ? (
        <Typography variant="body2">No reviews yet.</Typography>
      ) : (
        data.map((review, index) => {
          return (
            <Box key={index} mb={3}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2">
                  {review.reviewerName}
                </Typography>
                <Rating value={review.rating} readOnly size="small" />
                <Typography variant="caption" color="text.secondary">
                  ({review.date})
                </Typography>
              </Stack>
              <Typography variant="body2" mt={0.5}>
                {review.comment}
              </Typography>
            </Box>
          );
        })
      )}
    </Box>
  );
};
export default ReviewSection;

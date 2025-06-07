import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useUser } from "../../redux/slices/user.slice";
import { Link } from "react-router";

const Profile: React.FC = () => {
  const { loggedUser } = useUser();
  return (
    <Box p={4}>
      {/* Profile Title */}
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Profile
      </Typography>

      {/* Profile Details */}
      <Grid container spacing={2} maxWidth="500px">
        <Grid size={{ xs: 6 }}>
          <Typography fontWeight="bold">First Name</Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>{loggedUser?.firstname}</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography fontWeight="bold">Last Name</Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>{loggedUser?.lastname}</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography fontWeight="bold">Gender</Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>-</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography fontWeight="bold">Date Of Birth</Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>-</Typography>
        </Grid>

        <Grid size={{ xs: 6 }}>
          <Typography fontWeight="bold">Email</Typography>
        </Grid>
        <Grid size={{ xs: 6 }}>
          <Typography>{loggedUser?.email}</Typography>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Stack direction="row" spacing={2} mt={4}>
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ px: 4 }}
          component={Link}
          to="/"
        >
          CONTINUE SHOPPING
        </Button>
      </Stack>
    </Box>
  );
};
export default Profile;

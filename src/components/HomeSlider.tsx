import React from "react";
import { Box, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const sliderData = [
  {
    title: "Slide 1",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/sthaneka/SVM/ncq/2X_buasdhuif._CB795788272_.jpg",
  },
  {
    title: "Slide 2",
    image:
      "https://images-eu.ssl-images-amazon.com/images/G/31/img23/Softlines_JWL_SH_GW_Assets/2024/BAU_BTF/Nov/Unrec/Shoes/1/30001._CB542120021_.jpg",
  },
];
const HomeSlider: React.FC = () => {
  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Swiper
        navigation
        modules={[Navigation]}
        loop={true}
        style={{ width: "100%" }}
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                component="img"
                src={item.image}
                alt={item.title}
                sx={{ width: "100%", height: "auto", borderRadius: 2 }}
              />
            </Stack>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HomeSlider;

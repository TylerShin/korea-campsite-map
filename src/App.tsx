import React, { useEffect } from "react";
import { ThemeProvider, CSSReset, Heading, Box } from "@chakra-ui/core";
import campingSiteData from "./data/camping.json";

declare var kakao: any;

function App() {
  useEffect(() => {
    const container = document.getElementById("camp-map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);

    campingSiteData.map((camp) => {
      const markerPosition = new kakao.maps.LatLng(camp["위도"], camp["경도"]);
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      marker.setMap(map);
      return marker;
    });
  }, []);

  return (
    <ThemeProvider>
      <CSSReset />
      <Heading as="h1">전국 캠프사이트 현황</Heading>
      <Box>
        <Box id="camp-map" w="100%" h="80vh" />
      </Box>
    </ThemeProvider>
  );
}

export default App;

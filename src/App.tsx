import React, { useEffect } from "react";
import { ThemeProvider, CSSReset, Heading, Box } from "@chakra-ui/core";
import campingSiteData from "./data/camping.json";

declare var kakao: any;

console.log(campingSiteData);

function App() {
  useEffect(() => {
    const container = document.getElementById("camp-map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    const map = new kakao.maps.Map(container, options);
    console.log(map);
  }, []);

  return (
    <ThemeProvider>
      <CSSReset />
      <Heading as="h1">전국 캠프사이트 현황</Heading>
      <Box>
        <Box id="camp-map" w="640px" h="480px" />
      </Box>
    </ThemeProvider>
  );
}

export default App;

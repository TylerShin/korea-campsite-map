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
      const position = new kakao.maps.LatLng(camp["위도"], camp["경도"]);
      const marker = new kakao.maps.Marker({ position });

      marker.setMap(map);
      // 인포윈도우를 생성합니다
      var iwContent = `
        <div style="padding:4px;">
          <div><b>${camp["캠핑(야영)장명"]}</b></div>
          <div>${camp["캠핑(야영)장구분"]}</div>
        </div>
      `; // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
      });

      // 마커에 마우스오버 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseover", function () {
        // 마커에 마우스오버 이벤트가 발생하면 인포윈도우를 마커위에 표시합니다
        infowindow.open(map, marker);
      });

      // 마커에 마우스아웃 이벤트를 등록합니다
      kakao.maps.event.addListener(marker, "mouseout", function () {
        // 마커에 마우스아웃 이벤트가 발생하면 인포윈도우를 제거합니다
        infowindow.close();
      });

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

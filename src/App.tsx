import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider, CSSReset, Heading, Box } from "@chakra-ui/core";
import campingSiteData from "./data/camping.json";

declare var kakao: any;

type CampType = "일반야영장" | "자동차야영장" | "글램핑" | "카라반";

function App() {
  const [typeFilter, setTypeFilter] = useState<CampType[]>([
    "일반야영장",
    "자동차야영장",
    "글램핑",
    "카라반",
  ]);
  const kakaoMap = useRef<any>(null);

  useEffect(() => {
    const container = document.getElementById("camp-map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    kakaoMap.current = new kakao.maps.Map(container, options);
  }, []);

  useEffect(() => {
    const markers = campingSiteData
      .filter((camp) =>
        typeFilter.some((campType) =>
          camp["캠핑(야영)장구분"].includes(campType)
        )
      )
      .map((camp) => {
        const position = new kakao.maps.LatLng(camp["위도"], camp["경도"]);
        const marker = new kakao.maps.Marker({ position });

        marker.setMap(kakaoMap.current);

        const iwContent = `
        <div style="padding:4px;">
          <div><b>${camp["캠핑(야영)장명"]}</b></div>
          <div>${camp["캠핑(야영)장구분"]}</div>
        </div>
      `;
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
        });

        kakao.maps.event.addListener(marker, "mouseover", function () {
          infowindow.open(kakaoMap.current, marker);
        });

        kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close();
        });

        return marker;
      });

    return () => {
      markers.forEach((marker) => marker.setMap(null));
    };
  }, [typeFilter]);

  return (
    <ThemeProvider>
      <CSSReset />
      <button
        onClick={() => {
          setTypeFilter(["일반야영장"]);
        }}
      >
        일반야영장만 보기
      </button>
      <Heading as="h1">2020 전국 캠프사이트</Heading>
      <Box>
        <Box id="camp-map" w="100%" h="80vh" />
      </Box>
    </ThemeProvider>
  );
}

export default App;

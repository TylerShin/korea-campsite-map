import React, { useEffect, useState, useRef } from "react";
import {
  ThemeProvider,
  CSSReset,
  Heading,
  Box,
  Stack,
  Checkbox,
} from "@chakra-ui/core";
import campingSiteData from "./data/camping.json";

declare const kakao: any;

type CAMPSITE_TYPE = "일반야영장" | "자동차야영장" | "글램핑" | "카라반";

function App() {
  const [campsiteList, setCampsiteList] = useState(campingSiteData);
  const [selectedCampsiteType, setSelectedCampsiteType] = useState<
    CAMPSITE_TYPE[]
  >(["일반야영장", "자동차야영장", "글램핑", "카라반"]);
  const map = useRef<any>();
  const markers = useRef<{ marker: any; camp: any; infoWindow: any }[]>();

  useEffect(() => {
    const container = document.getElementById("camp-map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };

    map.current = new kakao.maps.Map(container, options);
  }, [campsiteList]);

  useEffect(() => {
    const markerList = !markers.current
      ? campsiteList.map((camp) => {
          const position = new kakao.maps.LatLng(camp["위도"], camp["경도"]);
          const marker = new kakao.maps.Marker({ position });
          const iwContent = `
          <div style="padding:4px;">
            <div><b>${camp["캠핑(야영)장명"]}</b></div>
            <div>${camp["캠핑(야영)장구분"]}</div>
          </div>
        `;
          const infoWindow = new kakao.maps.InfoWindow({ content: iwContent });

          kakao.maps.event.addListener(marker, "mouseover", () => {
            console.log("fire mouseover");
            infoWindow.open(map.current, marker);
          });

          kakao.maps.event.addListener(marker, "mouseout", () => {
            infoWindow.close();
          });

          return { marker, camp, infoWindow };
        })
      : markers.current;

    markerList.forEach(({ marker, camp }) => {
      if (
        selectedCampsiteType.includes(camp["캠핑(야영)장구분"] as CAMPSITE_TYPE)
      ) {
        marker.setMap(map.current);
      } else {
        marker.setMap(null);
      }
    });

    markers.current = markerList;
  }, [selectedCampsiteType, campsiteList]);

  function handleClickCheckbox(type: CAMPSITE_TYPE) {
    if (selectedCampsiteType.includes(type)) {
      const i = selectedCampsiteType.indexOf(type);
      setSelectedCampsiteType([
        ...selectedCampsiteType.slice(0, i),
        ...selectedCampsiteType.slice(i + 1),
      ]);
    } else {
      setSelectedCampsiteType([type, ...selectedCampsiteType]);
    }
  }

  return (
    <ThemeProvider>
      <CSSReset />
      <Heading as="h1">전국 캠프사이트 현황</Heading>
      <Box my={4}>
        <Stack spacing={10} isInline>
          <Checkbox
            size="lg"
            onChange={() => handleClickCheckbox("일반야영장")}
            isChecked={selectedCampsiteType.includes("일반야영장")}
          >
            일반야영장
          </Checkbox>
          <Checkbox
            size="lg"
            onChange={() => handleClickCheckbox("자동차야영장")}
            isChecked={selectedCampsiteType.includes("자동차야영장")}
          >
            자동차야영장
          </Checkbox>
          <Checkbox
            size="lg"
            onChange={() => handleClickCheckbox("글램핑")}
            isChecked={selectedCampsiteType.includes("글램핑")}
          >
            글램핑
          </Checkbox>
          <Checkbox
            size="lg"
            onChange={() => handleClickCheckbox("카라반")}
            isChecked={selectedCampsiteType.includes("카라반")}
          >
            카라반
          </Checkbox>
        </Stack>
      </Box>
      <Box>
        <Box id="camp-map" w="100%" h="80vh" />
      </Box>
    </ThemeProvider>
  );
}

export default App;

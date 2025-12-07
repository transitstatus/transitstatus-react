// PieroSnowfall is a wrapper around react snowfall that automatically adjusts canvas width and height

import Snowfall from "react-snowfall";
import { useState, useEffect, useMemo } from "react";


const PieroSnowfall = ({ color = '#ffffff', style = {}, snowflakeCount = 150, images = null }) => {
  const settings = useMemo(() => {
    let settings =
      JSON.parse(localStorage.getItem("transitstatus_v1_settings") ?? '{}');

    //fallback for oneko type if not defined
    if (!settings.snowMultiplier) settings.snowMultiplier = 1;

    return settings;
  }, []);

  if (settings.snowMultiplier == 0) return null; // dont need to render anything

  const [windowSize, setWindowSize] = useState([
    document.body.clientWidth,
    document.body.clientHeight,
  ]);

  // this magic number ensures we dont get a value above 12,500 for calculatedSnowflakeCount while settings.snowMultiplier is 1
  const calculatedSuperSpecialNumber = Math.min(windowSize[0] * windowSize[1], 156_250_000);
  const calculatedSnowflakeCount = Math.ceil((calculatedSuperSpecialNumber * settings.snowMultiplier) / 2500);
  console.log('calculatedSuperSpecialNumber', calculatedSuperSpecialNumber);
  console.log('calculatedSnowflakeCount', calculatedSnowflakeCount);

  useEffect(() => {
    console.log('Starting width:', windowSize[0], windowSize[1], `${windowSize[0] * windowSize[1]}px`);

    const resizeObserver = new ResizeObserver(entries => {
      setWindowSize([document.documentElement.scrollWidth, document.documentElement.scrollHeight])
    })

    resizeObserver.observe(document.documentElement);
    resizeObserver.observe(document.body);
  }, []);

  return <Snowfall
    color={color}
    style={{
      ...style,
      position: 'absolute',
      top: 0,
      left: 0,
      width: windowSize[0] + 'px',
      height: windowSize[1] + 'px',
    }}
    snowflakeCount={calculatedSnowflakeCount}
    images={images}
  />

};

export default PieroSnowfall;
// ./src/WeatherCard.js

import React from 'react';
import styled from '@emotion/styled';
//import styled from "styled-components";
import WeatherIcon from "./WeatherIcon.js";
import { ReactComponent as AirFlowIcon } from "./images/airFlow.svg";
import { ReactComponent as RainIcon } from "./images/rain.svg";
import { ReactComponent as RefreshIcon } from "./images/refresh.svg";
import { ReactComponent as LoadingIcon } from './images/loading.svg';

// STEP 1：載入 cog 圖片
import { ReactComponent as CogIcon } from './images/cog.svg';

// STEP 2：為 CogIcon 添加樣式
const Cog = styled(CogIcon)`
  position: absolute;
  top: 30px;
  right: 15px;
  width: 15px;
  height: 15px;
  cursor: pointer;
`;

const WeatherCardWrapper = styled.div`
  position: relative;
  min-width: 360px;
  box-shadow: ${({ theme }) => theme.boxShadow};
  background-color: ${({ theme }) => theme.foregroundColor};
  box-sizing: border-box;
  padding: 30px 15px;
`;


const Location = styled.div`
  /*${(props) => console.log(props)}*/
  font-size: 28px;
  color: ${({ theme }) => theme.titleColor};
  margin-bottom: 20px;
`;

const Description = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 30px;
`;

const CurrentWeather = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

const Temperature = styled.div`
  color: ${({ theme }) => theme.temperatureColor};
  font-size: 96px;
  font-weight: 300;
  display: flex;
`;

const Celsius = styled.div`
  font-weight: normal;
  font-size: 42px;
`;

const AirFlow = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};
  margin-bottom: 20px;

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Rain = styled.div`
  display: flex;
  align-items: center;
  font-size: 16x;
  font-weight: 300;
  color: ${({ theme }) => theme.textColor};

  svg {
    width: 25px;
    height: auto;
    margin-right: 30px;
  }
`;

const Refresh = styled.div`
  position: absolute;
  right: 15px;
  bottom: 15px;
  font-size: 12px;
  display: inline-flex;
  align-items: flex-end;
  color: ${({ theme }) => theme.textColor};

  svg {
    margin-left: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
    /* STEP 2：使用 rotate 動畫效果在 svg 圖示上 */
    animation: rotate infinite 1.5s linear;

    /* STEP 2：取得傳入的 props 並根據它來決定動畫要不要執行 */
    animation-duration: ${({ isLoading }) => (isLoading ? '1.5s' : '0s')};
  }

  /* STEP 1：定義旋轉的動畫效果，並取名為 rotate */
  @keyframes rotate {
    from {
      transform: rotate(360deg);
    }
    to {
      transform: rotate(0deg);
    }
  }
`;
// STEP 1：在參數中帶入 props 即可取得外層組件傳入的資料
const WeatherCard = (props) => {
  // STEP 2：透過物件的解構賦值從 props 中取出傳入的資料
  // STEP 1：從 props 中取出 cityName
  const { weatherElement, moment, fetchData, setCurrentPage, cityName } = props;

  // STEP 3：將 weatherElement 中的資料透過解構賦值取出後，放置到 JSX 中使用
  const {
    observationTime,
    //locationName,     // STEP 3：將多餘的變數移除
    temperature,
    windSpeed,
    description,
    weatherCode,
    rainPossibility,
    comfortability,
    isLoading,
  } = weatherElement;

  

  return (
    <WeatherCardWrapper>
        {/* STEP 3：使用 Cog 圖示 */}
      {/* STEP 2：當齒輪被點擊的時候，將 currentPage 改成 WeatherSetting */}
      <Cog onClick={() => setCurrentPage('WeatherSetting')} />
        {/* STEP 2：將 cityName 帶入 */}
        <Location>{cityName}</Location>
        {/* STEP 1：優化時間呈現 */}
        <Description>
          {description} {comfortability}
        </Description>
        <CurrentWeather>
          <Temperature>
            {/* STEP 2：優化溫度呈現 */}
            {Math.round(temperature)} <Celsius>°C</Celsius>
          </Temperature>
          {/* STEP 2：使用 WeatherIcon */}
          <WeatherIcon
            currentWeatherCode={weatherCode}
            moment={moment || "day"}
          />
        </CurrentWeather>
        <AirFlow>
          <AirFlowIcon />
          {windSpeed} m/h
        </AirFlow>
        <Rain>
          <RainIcon />
          {/* 針對濕度進行四捨五入 */}
          {Math.round(rainPossibility)} %
        </Rain>
        {/* STEP 2：綁定 onClick 時會呼叫 handleClick 方法 */}
        {/* 將最後觀測時間移到畫面右下角呈現 */}
        {/* STEP 1：把 isLoading 的資料狀態透過 props 傳入 Styled Component */}
        <Refresh onClick={fetchData} isLoading={isLoading}>
          最後觀測時間：
          {new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric"
          }).format(new Date(observationTime))}{" "}

          {/* STEP 2：當 isLoading 的時候顯示 LoadingIcon 否則顯示 RedoIcon */}
          {isLoading ? <LoadingIcon /> : <RefreshIcon />}
        </Refresh>
      </WeatherCardWrapper>
  )
}

export default WeatherCard;